// stage.js — a tiny deterministic animation runtime.
//
// Every animated value is a pure function of time, so the renderer can seek to
// any millisecond, screenshot the page, and get the same frame every time.
// Videos call the helpers below from their build(S) function.

const EASE = {
  linear: (p) => p,
  in: (p) => p * p * p,
  out: (p) => 1 - Math.pow(1 - p, 3),
  inOut: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  back: (p) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  },
  step: (p) => (p >= 1 ? 1 : 0),
};

const DEFAULTS = {
  opacity: 1,
  translate: '0px 0px',
  scale: '1',
  rotate: '0deg',
  'clip-path': 'inset(0% 0% 0% 0%)',
  'stroke-dashoffset': '0',
  filter: 'blur(0px)',
  visibility: 'visible',
};

const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

function hexToRgb(s) {
  return s.replace(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi, (_, h) => {
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
  });
}

// Interpolates numbers embedded in two strings with the same shape,
// e.g. "inset(0% 100% 0% 0%)" -> "inset(0% 0% 0% 0%)".
function interp(a, b, p) {
  if (typeof a === 'number' && typeof b === 'number') return a + (b - a) * p;
  if (p <= 0) return a;
  if (p >= 1) return b;
  const as = hexToRgb(String(a)), bs = hexToRgb(String(b));
  const an = as.match(NUM);
  if (!an) return p < 1 ? a : b;
  let i = 0;
  return bs.replace(NUM, (m) => {
    const x = parseFloat(an[i++] ?? m), y = parseFloat(m);
    return String(Math.round((x + (y - x) * p) * 1000) / 1000);
  });
}

// Splits caption text into display-sized chunks at sentence/clause boundaries.
function chunkCaption(text, max = 96) {
  const sentences = text.match(/[^.!?:;]+[.!?:;]*["”’')]*\s*/g) || [text];
  const out = [];
  let cur = '';
  for (const s of sentences) {
    if ((cur + s).trim().length > max && cur) { out.push(cur.trim()); cur = ''; }
    if (s.trim().length > max) {
      // break an overlong sentence at commas/dashes
      const parts = s.match(/[^,—]+[,—]?\s*/g) || [s];
      for (const p of parts) {
        if ((cur + p).trim().length > max && cur) { out.push(cur.trim()); cur = ''; }
        cur += p;
      }
    } else cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

const md = (s) => s.replace(/\*([^*]+)\*/g, '<em>$1</em>');

export function createStage(root, timings, meta = {}) {
  const tracks = new Map(); // el -> Map(prop -> segments[])
  const everies = [];
  const beats = new Map(timings.beats.map((b) => [b.id, b]));
  const duration = timings.total;

  const B = (id) => {
    const b = beats.get(id);
    if (!b) throw new Error(`unknown beat "${id}"`);
    return b;
  };
  const at = (id, frac = 0) => { const b = B(id); return b.start + (b.end - b.start) * frac; };

  // ---------- core tween ----------
  function tw(el, prop, t0, dur, to, opts = {}) {
    if (!el) throw new Error(`tw: missing element for ${prop}`);
    let m = tracks.get(el);
    if (!m) tracks.set(el, (m = new Map()));
    let segs = m.get(prop);
    if (!segs) m.set(prop, (segs = []));
    segs.push({ t0, dur: Math.max(0, dur), from: opts.from, to, ease: EASE[opts.ease || 'inOut'] || opts.ease });
    return el;
  }
  const set = (el, prop, t, value) => tw(el, prop, t, 0, value, { ease: 'step' });

  function finalize() {
    for (const [el, m] of tracks) {
      for (const [prop, segs] of m) {
        segs.sort((a, b) => a.t0 - b.t0);
        let prev = DEFAULTS[prop] ?? (el.style.getPropertyValue(prop) || '0');
        for (const s of segs) {
          if (s.from === undefined) s.from = prev;
          prev = s.to;
        }
      }
    }
  }

  const cache = new Map();
  function apply(el, prop, v) {
    let c = cache.get(el);
    if (!c) cache.set(el, (c = {}));
    if (c[prop] === v) return;
    c[prop] = v;
    if (prop.startsWith('attr:')) el.setAttribute(prop.slice(5), v);
    else if (prop === 'text') el.textContent = v;
    else el.style.setProperty(prop, String(v));
  }

  function seek(t) {
    for (const [el, m] of tracks) {
      for (const [prop, segs] of m) {
        let s = null;
        for (const g of segs) { if (g.t0 <= t) s = g; else break; }
        let v;
        if (!s) v = segs[0].from;
        else {
          const p = s.dur ? Math.min(1, (t - s.t0) / s.dur) : 1;
          v = interp(s.from, s.to, s.ease(p));
        }
        apply(el, prop, v);
      }
    }
    for (const f of everies) f(t);
  }

  // ---------- element helpers ----------
  function el(parent, opts = {}) {
    const { tag = 'div', cls = '', html, text, x, y, w, h, anchor = 'tl', style = {} } = opts;
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    e.classList.add('abs');
    if (html !== undefined) e.innerHTML = md(html);
    if (text !== undefined) e.textContent = text;
    if (x !== undefined) e.style.left = x + 'px';
    if (y !== undefined) e.style.top = y + 'px';
    if (w !== undefined) e.style.width = w + 'px';
    if (h !== undefined) e.style.height = h + 'px';
    const tx = { tl: '0,0', tc: '-50%,0', tr: '-100%,0', c: '-50%,-50%', l: '0,-50%', r: '-100%,-50%', bc: '-50%,-100%', bl: '0,-100%' }[anchor];
    if (tx !== '0,0') e.style.transform = `translate(${tx})`;
    // Without an explicit width, anchored text would shrink-wrap against the frame edge.
    if (w === undefined && anchor !== 'tl') e.style.width = 'max-content';
    Object.assign(e.style, style);
    (parent || root).appendChild(e);
    return e;
  }

  function svg(parent, opts = {}) {
    const { x = 0, y = 0, w = 200, h = 200, vb, html = '', anchor = 'tl', cls = '', style = {} } = opts;
    const wrap = el(parent, { x, y, w, h, anchor, cls, style });
    wrap.innerHTML = `<svg width="${w}" height="${h}" viewBox="${vb || `0 0 ${w} ${h}`}" overflow="visible">${html}</svg>`;
    return wrap;
  }

  const q = (root2, sel) => (typeof sel === 'string' ? [...root2.querySelectorAll(sel)] : Array.isArray(sel) ? sel : [sel]);

  // Full-frame SVG layer for drawing in absolute 1920x1080 coordinates.
  function overlay(parent) {
    const w = el(parent, { x: 0, y: 0, w: 1920, h: 1080 });
    w.innerHTML = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" overflow="visible"></svg>';
    return w.firstChild;
  }
  function shape(svgEl, tag, attrs = {}) {
    const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    svgEl.appendChild(n);
    return n;
  }
  const path = (svgEl, d, cls = 'ink', attrs = {}) => shape(svgEl, 'path', { d, class: cls, ...attrs });
  // Groups let several shapes fade/scale together; transform-origin is set to (cx, cy).
  function group(svgEl, cx = 0, cy = 0) {
    const g = shape(svgEl, 'g');
    g.style.transformOrigin = `${cx}px ${cy}px`;
    g.style.transformBox = 'view-box';
    return g;
  }

  // ---------- animation vocabulary ----------
  const A = {
    fadeIn: (e, t, dur = 500) => tw(e, 'opacity', t, dur, 1, { from: 0 }),
    fadeOut: (e, t, dur = 400) => tw(e, 'opacity', t, dur, 0),
    fadeUp(e, t, dur = 650, dy = 28) {
      tw(e, 'opacity', t, dur, 1, { from: 0, ease: 'out' });
      tw(e, 'translate', t, dur, '0px 0px', { from: `0px ${dy}px`, ease: 'out' });
      return e;
    },
    fadeLeft(e, t, dur = 650, dx = 40) {
      tw(e, 'opacity', t, dur, 1, { from: 0, ease: 'out' });
      tw(e, 'translate', t, dur, '0px 0px', { from: `${dx}px 0px`, ease: 'out' });
      return e;
    },
    pop(e, t, dur = 550, from = 0.6) {
      tw(e, 'opacity', t, Math.min(dur, 250), 1, { from: 0, ease: 'out' });
      tw(e, 'scale', t, dur, '1', { from: String(from), ease: 'back' });
      return e;
    },
    stamp(e, t, dur = 380) {
      tw(e, 'opacity', t, 120, 1, { from: 0, ease: 'linear' });
      tw(e, 'scale', t, dur, '1', { from: '2.2', ease: 'out' });
      return e;
    },
    wipe(e, t, dur = 700, ease = 'inOut') {
      return tw(e, 'clip-path', t, dur, 'inset(0% 0% 0% 0%)', { from: 'inset(0% 100% 0% 0%)', ease });
    },
    wipeDown(e, t, dur = 700) {
      return tw(e, 'clip-path', t, dur, 'inset(0% 0% 0% 0%)', { from: 'inset(0% 0% 100% 0%)' });
    },
    // Draws SVG strokes (pass the svg wrapper + selector, or elements).
    draw(wrapOrEls, t, dur = 900, opts = {}) {
      const { sel = '.ink, .draw', stagger = 0, ease = 'inOut' } = opts;
      let els;
      if (typeof wrapOrEls === 'string') els = [...root.querySelectorAll(wrapOrEls)];
      else if (wrapOrEls instanceof SVGGeometryElement) els = [wrapOrEls];
      else if (wrapOrEls instanceof Element) els = [...wrapOrEls.querySelectorAll(sel)];
      else els = [...wrapOrEls];
      els.forEach((p, i) => {
        p.setAttribute('pathLength', '1');
        p.style.strokeDasharray = '1 1';
        const t0 = t + i * stagger;
        tw(p, 'stroke-dashoffset', t0, dur, '0', { from: '1', ease });
        tw(p, 'visibility', t0, 0, 'visible', { from: 'hidden', ease: 'step' });
      });
      return wrapOrEls;
    },
    move(e, t, dur, x, y, ease = 'inOut') { return tw(e, 'translate', t, dur, `${x}px ${y}px`, { ease }); },
    scaleTo(e, t, dur, s, ease = 'inOut') { return tw(e, 'scale', t, dur, String(s), { ease }); },
    color(e, t, dur, c, prop = 'color') { return tw(e, prop, t, dur, c); },
    // Highlighter sweep on an element with class "mark" (see stage.css).
    mark(e, t, dur = 600) { return tw(e, 'background-size', t, dur, '100% 42%', { from: '0% 42%', ease: 'out' }); },
    strike(e, t, dur = 450) { return tw(e, 'background-size', t, dur, '100% 5px', { from: '0% 5px', ease: 'out' }); },
    dim(e, t, to = 0.25, dur = 400) { return tw(e, 'opacity', t, dur, to); },
    // Word-by-word reveal of an element's text.
    words(e, t, per = 90, dur = 450) {
      const html = e.innerHTML;
      const parts = html.split(/(\s+|<[^>]+>)/).filter((s) => s !== '');
      e.innerHTML = '';
      let i = 0;
      let open = null;
      for (const part of parts) {
        if (/^\s+$/.test(part)) { (open || e).appendChild(document.createTextNode(' ')); continue; }
        if (/^<\//.test(part)) { open = null; continue; }
        if (/^</.test(part)) { const tmp = document.createElement('div'); tmp.innerHTML = part + '</' + part.match(/^<(\w+)/)[1] + '>'; open = tmp.firstChild; e.appendChild(open); continue; }
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = part;
        (open || e).appendChild(w);
        A.fadeUp(w, t + i * per, dur, 14);
        i++;
      }
      return e;
    },
  };

  // ---------- scenes, header, captions, progress ----------
  let sceneCount = 0;
  function scene(t0, t1, opts = {}) {
    const s = el(root, { cls: 'scene' });
    s.style.zIndex = String(++sceneCount);
    tw(s, 'opacity', t0, 450, 1, { from: 0, ease: 'out' });
    if (t1 !== undefined && t1 !== null) tw(s, 'opacity', t1 - 450, 450, 0, { ease: 'in' });
    if (opts.title) el(s, { cls: 'section', text: opts.title, x: 1800, y: 46, anchor: 'tr' });
    return s;
  }
  // Scene spanning beats [first..last], with padding into the surrounding gaps.
  const sceneFor = (first, last, opts = {}) =>
    scene(B(first).start - (opts.pre ?? 400), B(last).end + (opts.post ?? 420), opts);

  function every(fn) { everies.push(fn); }

  function chrome() {
    if (meta.label) el(root, { cls: 'hdr', text: meta.label, x: 120, y: 50 }).style.zIndex = 900;
    const bar = el(root, { cls: 'progress' });
    bar.style.zIndex = 900;
    tw(bar, 'scale', 0, duration, '1 1', { from: '0 1', ease: 'linear' });
    if (meta.captions !== false) {
      for (const b of timings.beats) {
        if (!b.text || b.nocap) continue;
        const chunks = chunkCaption(b.text.replace(/\*/g, ''));
        const total = chunks.reduce((n, c) => n + c.length, 0);
        let t = b.start;
        chunks.forEach((c, i) => {
          const d = ((b.end - b.start) * c.length) / total;
          const cap = el(root, { cls: 'caption', text: c });
          cap.style.zIndex = 950;
          tw(cap, 'opacity', t - 60, 120, 1, { from: 0, ease: 'linear' });
          const end = i === chunks.length - 1 ? b.end + Math.min(400, b.gap ?? 300) : t + d;
          tw(cap, 'opacity', end - 60, 120, 0, { ease: 'linear' });
          t += d;
        });
      }
    }
  }

  return { root, B, at, tw, set, el, svg, q, overlay, shape, path, group, scene, sceneFor, every, seek, finalize, chrome, duration, ...A };
}

// Seeded PRNG so "random" particles are identical on every render.
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
