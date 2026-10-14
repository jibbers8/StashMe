// kit.js — reusable line-art drawings. Each function adds shapes to an SVG
// layer (from S.overlay) in absolute coordinates and returns the shapes so a
// video can animate them with S.draw / S.pop / S.fadeIn.

import { rng } from './stage.js';

export function arrow(S, svg, x1, y1, x2, y2, cls = 'ink', head = 18) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const line = S.path(svg, `M${x1},${y1} L${x2},${y2}`, cls);
  const h = S.path(svg,
    `M${x2 - head * Math.cos(a - 0.45)},${y2 - head * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - head * Math.cos(a + 0.45)},${y2 - head * Math.sin(a + 0.45)}`, cls);
  return [line, h];
}

export function curveArrow(S, svg, x1, y1, cx, cy, x2, y2, cls = 'ink', head = 18) {
  const a = Math.atan2(y2 - cy, x2 - cx);
  const line = S.path(svg, `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, cls);
  const h = S.path(svg,
    `M${x2 - head * Math.cos(a - 0.45)},${y2 - head * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - head * Math.cos(a + 0.45)},${y2 - head * Math.sin(a + 0.45)}`, cls);
  return [line, h];
}

export const check = (S, svg, x, y, s = 60, cls = 'ink good') =>
  S.path(svg, `M${x - s * 0.5},${y} L${x - s * 0.12},${y + s * 0.38} L${x + s * 0.55},${y - s * 0.42}`, cls, { 'stroke-width': s / 7 });

export const cross = (S, svg, x, y, s = 60, cls = 'ink bad') => [
  S.path(svg, `M${x - s / 2},${y - s / 2} L${x + s / 2},${y + s / 2}`, cls, { 'stroke-width': s / 7 }),
  S.path(svg, `M${x + s / 2},${y - s / 2} L${x - s / 2},${y + s / 2}`, cls, { 'stroke-width': s / 7 }),
];

export function gearD(cx, cy, r, teeth = 10, depth = 0.18) {
  const pts = [];
  const n = teeth * 4;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * (1 - depth);
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z M${cx + r * 0.32},${cy} A${r * 0.32},${r * 0.32} 0 1 0 ${cx - r * 0.32},${cy} A${r * 0.32},${r * 0.32} 0 1 0 ${cx + r * 0.32},${cy}`;
}

// A branching tree of descent. Returns {branches: [[...depth0], [...depth1], ...], tips: [{x,y}]}.
export function tree(S, svg, x, y, len, depth = 4, seed = 3, cls = 'ink') {
  const r = rng(seed);
  const levels = Array.from({ length: depth }, () => []);
  const tips = [];
  const grow = (x0, y0, ang, l, d) => {
    const x1 = x0 + l * Math.cos(ang), y1 = y0 + l * Math.sin(ang);
    const bend = (r() - 0.5) * l * 0.25;
    const mx = (x0 + x1) / 2 + bend * Math.sin(ang), my = (y0 + y1) / 2 - bend * Math.cos(ang);
    levels[d].push(S.path(svg, `M${x0},${y0} Q${mx},${my} ${x1},${y1}`, cls, { 'stroke-width': Math.max(2.5, 7 - d * 1.3) }));
    if (d + 1 < depth) {
      const spread = 0.5 + r() * 0.25;
      grow(x1, y1, ang - spread, l * (0.72 + r() * 0.1), d + 1);
      grow(x1, y1, ang + spread, l * (0.72 + r() * 0.1), d + 1);
    } else tips.push({ x: x1, y: y1 });
  };
  grow(x, y, -Math.PI / 2, len, 0);
  return { levels, tips };
}

// A right-angled cladogram (tree of descent) from a nested array, e.g. [[a,b],[c,[d,e]]].
// Returns {levels: shapes grouped by depth (root first), tips: [{x,y}], stem}.
export function cladogram(S, svg, x0, x1, yTop, yBottom, shapeTree, cls = 'ink') {
  const leaves = [];
  const walk = (n) => (Array.isArray(n) ? n.forEach(walk) : leaves.push(n));
  walk(shapeTree);
  const dx = (x1 - x0) / (leaves.length - 1);
  let li = 0;
  const height = (n) => (Array.isArray(n) ? 1 + Math.max(...n.map(height)) : 0);
  const H = height(shapeTree);
  const step = (yBottom - 60 - yTop) / H;
  const levels = Array.from({ length: H + 1 }, () => []);
  const tips = [];
  const place = (n, depth) => {
    if (!Array.isArray(n)) { const p = { x: x0 + dx * li++, y: yTop }; tips.push(p); return p; }
    const kids = n.map((c) => place(c, depth + 1));
    const x = kids.reduce((s, k) => s + k.x, 0) / kids.length;
    const p = { x, y: yTop + height(n) * step };
    kids.forEach((k) => levels[depth].push(S.path(svg, `M${x},${p.y} H${k.x} V${k.y}`, cls)));
    return p;
  };
  const root = place(shapeTree, 1);
  const stem = S.path(svg, `M${root.x},${yBottom} V${root.y}`, cls);
  levels[0].push(stem);
  return { levels: levels.filter((l) => l.length), tips, root };
}

export function funnelD(cx, top, w, h) {
  const neck = w * 0.16, mid = top + h * 0.55;
  return `M${cx - w / 2},${top} L${cx - neck / 2},${mid} L${cx - neck / 2},${top + h} M${cx + w / 2},${top} L${cx + neck / 2},${mid} L${cx + neck / 2},${top + h} M${cx - w / 2},${top} L${cx + w / 2},${top}`;
}

// Bars as divs so they can be scaled smoothly. Returns the bar elements.
export function histogram(S, parent, x, y, w, h, values, color = 'var(--ink)') {
  const n = values.length, gap = 8, bw = (w - gap * (n - 1)) / n;
  const base = S.el(parent, { x: x - 10, y: y + h, w: w + 20, h: 4, style: { background: 'var(--ink)', borderRadius: '2px' } });
  const bars = values.map((v, i) => {
    const b = S.el(parent, { x: x + i * (bw + gap), y, w: bw, h, style: { background: color, borderRadius: '6px 6px 0 0', transformOrigin: '50% 100%' } });
    b.style.scale = `1 ${v}`;
    b.dataset.v = v;
    return b;
  });
  bars.base = base;
  return bars;
}

export const gauss = (n, mu, sd, peak = 1) =>
  Array.from({ length: n }, (_, i) => Math.max(0.04, peak * Math.exp(-((i - mu) ** 2) / (2 * sd * sd))));

// Simple line-art finch facing right, centred on (cx, cy), roughly 2*s wide.
export function bird(S, svg, cx, cy, s = 100, cls = 'ink') {
  const k = s / 100;
  const P = (d) => S.path(svg, d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${(cx + a * k).toFixed(1)},${(cy + b * k).toFixed(1)}`), cls);
  return [
    P('M-70,10 C-40,-50 40,-60 60,-20 C75,10 50,45 0,45 C-30,45 -55,35 -70,10 Z'),
    P('M55,-30 C60,-60 95,-60 100,-35 C102,-20 85,-5 65,-8'),
    P('M100,-38 L125,-30 L100,-24'),
    P('M-70,10 L-115,-15 L-108,15 L-72,18'),
    P('M-20,0 C0,-25 30,-25 40,0'),
    P('M-5,45 L-10,80 M15,45 L15,80 M-20,80 L0,80 M5,80 L25,80'),
    S.shape(svg, 'circle', { cx: cx + 85 * k, cy: cy - 40 * k, r: 4 * k, class: 'fill-ink' }),
  ];
}

// Line-art rat, facing right.
export function rat(S, svg, cx, cy, s = 100, cls = 'ink') {
  const k = s / 100;
  const P = (d) => S.path(svg, d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${(cx + a * k).toFixed(1)},${(cy + b * k).toFixed(1)}`), cls);
  return [
    P('M-60,20 C-60,-30 20,-40 50,-10 L80,5 C85,10 80,18 70,20 Z'),
    P('M30,-25 C25,-50 50,-50 48,-22'),
    P('M-60,20 C-90,25 -110,0 -130,-20'),
    P('M-30,20 L-35,32 M30,20 L35,32'),
    S.shape(svg, 'circle', { cx: cx + 58 * k, cy: cy - 6 * k, r: 4 * k, class: 'fill-ink' }),
  ];
}

export function frog(S, svg, cx, cy, s = 100, cls = 'ink') {
  const k = s / 100;
  const P = (d) => S.path(svg, d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${(cx + a * k).toFixed(1)},${(cy + b * k).toFixed(1)}`), cls);
  return [
    P('M-80,40 C-90,-20 -40,-45 0,-45 C40,-45 90,-20 80,40 C60,60 -60,60 -80,40 Z'),
    P('M-50,-35 C-60,-75 -15,-80 -15,-42'),
    P('M15,-42 C15,-80 60,-75 50,-35'),
    P('M-45,10 C-15,30 15,30 45,10'),
    P('M-80,40 C-110,40 -115,60 -95,65 M80,40 C110,40 115,60 95,65'),
    S.shape(svg, 'circle', { cx: cx - 33 * k, cy: cy - 52 * k, r: 6 * k, class: 'fill-ink' }),
    S.shape(svg, 'circle', { cx: cx + 33 * k, cy: cy - 52 * k, r: 6 * k, class: 'fill-ink' }),
  ];
}

export function thoughtBubble(S, svg, x, y, w, h, tailX, tailY, cls = 'ink') {
  const r = 26;
  const main = S.path(svg,
    `M${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} L${x + r},${y + h} Q${x},${y + h} ${x},${y + h - r} L${x},${y + r} Q${x},${y} ${x + r},${y} Z`,
    cls);
  const c1 = S.shape(svg, 'circle', { cx: tailX, cy: tailY, r: 8, class: cls });
  const mx = (tailX + x + w / 2) / 2, my = (tailY + y + h) / 2;
  const c2 = S.shape(svg, 'circle', { cx: mx, cy: my + 6, r: 13, class: cls });
  return [main, c2, c1];
}
