// Bever & Townsend (2001), "Some Sentences on Our Consciousness of Sentences",
// in E. Dupoux (ed.), Language, Brain, and Cognitive Development. MIT Press.

import { arrow, curveArrow, check, cross } from '../../engine/kit.js';

export const meta = { label: 'Bever & Townsend (2001) · Consciousness of sentences', speed: 1.05 };

export const beats = [
  { id: 'title', text: 'Some Sentences on Our Consciousness of Sentences, by Thomas Bever and David Townsend: how we understand sentences, and what that might say about consciousness.', gap: 900 },

  { id: 'g1', text: 'It opens with lost eyeglasses. When the authors finally find them each morning, they seem to see them twice.' },
  { id: 'g2', text: 'First, a fleeting pre-percept: a foggy skeleton with one clear part, like an earpiece. Glasses as a concept, more than a picture.' },
  { id: 'g3', text: 'A split second later comes the real percept: sharp and complete. The first survives mostly as a memory.' },
  { id: 'g4', text: 'Their hunch: maybe we perceive everything twice. Once as a schematic sketch, and once as a clear image.', gap: 900 },

  { id: 't1a', text: 'Theme one: sentences sound clearer.' },
  { id: 't1b', text: 'Words heard in noise are recognized better in sentences than in random lists, and they actually sound clearer. You can even read this with the vowels swapped out.' },
  { id: 't1c', text: "Meaning can't be the whole explanation, because nonsense and bizarre sentences get the boost too." },
  { id: 't1d', text: 'And syntax is a puzzle too: computing structure takes work, which should leave fewer resources for hearing the words.', gap: 900 },

  { id: 't2a', text: "Theme two: syntax is real. 'The electrolytic mailman bite the religious dog' is ungrammatical, whatever it means." },
  { id: 't2b', text: "A key idea is movement. In 'the big city was attacked', 'city' starts out as the object of 'attacked', then moves to the front, leaving a silent trace behind." },
  { id: 't2c', text: "So 'city' is represented twice, and it's more salient: people recognize 'big' faster after 'the big city was attacked' than after 'the big city was rich'." },
  { id: 't2d', text: 'But that advantage appears only after the sentence ends, not at the trace itself.', gap: 900 },

  { id: 'as1', text: 'A variation: associations are real, too. Habits still run most of everyday life.' },
  { id: 'as2', text: "Connectionist networks show that language statistics can be learned. But mimicking structure isn't having it. That's like claiming a church spire shows we can reach the heavens." },
  { id: 'as3', text: 'A good model needs both: fast habits, and real rules.', gap: 900 },

  { id: 's0', text: 'Their answer is analysis by synthesis: comprehension in two passes.' },
  { id: 's1', text: 'Pass one is fast and associative: find the words and major phrases, and fit them to a familiar template, noun phrase, be, predicate, for a likely meaning.' },
  { id: 's2', text: 'Pass two is slower. Take those words and that meaning as a starting point, and rebuild the sentence with the grammar, step by step.' },
  { id: 's3', text: "Then compare. If the rebuilt form matches what was heard, the analysis is confirmed. If not, reanalyze and try again." },
  { id: 's4', text: 'Why rebuild? Grammar, like an airplane, only runs forward. To retrace a journey, go back to a likely start and fly the route again.', gap: 900 },

  { id: 'e1', text: "Compare look-alike sentences. 'The city was rich' and 'the city was ruined' fit the template, because rich and ruined act as adjectives." },
  { id: 'e2', text: "'The city was attacked' gets roughly the right meaning, but the wrong structure: 'the attacked city lay before us' sounds odd. Pass two fixes it: city is the patient, moved up front.", gap: 900 },

  { id: 'v1', text: 'This fits the evidence. First, complete syntax arrives late: trace effects and some grammar violations register only after a few hundred milliseconds.' },
  { id: 'v2', text: 'Second, the first meaning comes from incomplete syntax. Children, for example, first understand passives as noun, be, adjective.' },
  { id: 'v3', text: "Third, we understand everything twice. Try: 'More people have gone to Russia than I have.' It seems fine at first, until the second pass fails to compute it." },
  { id: 'v4', text: "And pass two earns its keep. It's how you understood 'Delhi copra pricing techniques are quite ununderstandable', odd syntax and all.", gap: 900 },

  { id: 'rc', text: 'Back to the opening puzzle. Sentences sound clear because comprehension builds two surface representations of the same sentence, one from each pass, and checks that they match.', gap: 900 },

  { id: 'k1', text: "The coda turns to consciousness. The model chases its tail, from meaning to derivation and back to the same surface form: an instance of Dennett's multiple drafts." },
  { id: 'k2', text: 'So why does the final draft feel real, like the sharp glasses? Is it the latest draft, the most complete, or the one most dependent on internal computation?' },
  { id: 'k3', text: 'They favor the last: the appearance of reality depends most on internally generated representations.' },
  { id: 'k4', text: 'And that is testable. Their bold prediction: the more complex a sentence is, as long as it can be understood, the clearer its words should sound.' },
  { id: 'k5', text: 'Their end is their beginning: perhaps we perceive everything twice.', gap: 600 },
];

// Line-art eyeglasses centred on (cx, cy). Returns {frame:[...], left:[...], right:[...]}.
function glasses(S, g, cx, cy, k = 1, cls = 'ink') {
  const P = (d) => S.path(g, d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${(cx + a * k).toFixed(1)},${(cy + b * k).toFixed(1)}`), cls, { 'stroke-width': 6 });
  const lensL = P('M-250,-40 C-250,-75 -60,-75 -50,-40 C-40,10 -60,70 -150,70 C-240,70 -250,10 -250,-40 Z');
  const lensR = P('M250,-40 C250,-75 60,-75 50,-40 C40,10 60,70 150,70 C240,70 250,10 250,-40 Z');
  const bridge = P('M-50,-30 C-25,-55 25,-55 50,-30');
  const templeL = P('M-250,-40 L-330,-60 L-370,-20');
  const templeR = P('M250,-40 L330,-60 L370,-20');
  return { all: [lensL, lensR, bridge, templeL, templeR], templeL, lenses: [lensL, lensR, bridge, templeR] };
}

export function build(S) {
  const { B, at } = S;

  // ── Title ────────────────────────────────────────────────────────────
  {
    const sc = S.scene(0, B('title').end + 450);
    S.fadeUp(S.el(sc, { cls: 'kicker', text: 'Reading guide', x: 160, y: 250, style: { color: 'var(--a4)' } }), 300);
    S.fadeUp(S.el(sc, { cls: 'h1', html: 'Some Sentences on<br>Our Consciousness<br>of Sentences', x: 160, y: 295 }), 450, 800);
    S.fadeUp(S.el(sc, { cls: 'body', text: 'Thomas G. Bever & David J. Townsend · 2001', x: 162, y: 625 }), 1100);
    S.fadeUp(S.el(sc, { cls: 'small', html: 'in <em>Language, Brain, and Cognitive Development</em>, ed. E. Dupoux (MIT Press)', x: 162, y: 680 }), 1400);
    const epis = [
      ['“My end is my beginning.”', 'Luciano Berio'],
      ['“…multiple channels… creating Multiple Drafts as they go…”', 'Daniel Dennett'],
      ['“I see everything twice! I see everything twice.”', 'Joseph Heller'],
    ];
    epis.forEach(([q, who], i) => {
      const e = S.el(sc, { x: 1180, y: 300 + i * 170, w: 600, html: `<div class="quote" style="font-size:31px">${q}</div><div class="cite" style="margin-top:6px">— ${who}</div>` });
      S.fadeLeft(e, 1800 + i * 1500);
    });
  }

  // ── Overture: the eyeglasses ─────────────────────────────────────────
  {
    const sc = S.sceneFor('g1', 'g4', { title: 'Overture: how many times do we perceive a thing?' });
    const g = S.overlay(sc);
    // the morning search
    const route = S.path(g, 'M180,820 C320,620 520,860 660,700 S900,520 1040,640 S1240,760 1300,560', 'ink mutedk thin', { 'stroke-dasharray': '2 14' });
    S.fadeIn(route, B('g1').start, 300);
    S.tw(route, 'stroke-dashoffset', B('g1').start, 2400, '-400', { from: '0', ease: 'linear' });
    S.fadeOut(route, at('g1', 0.75), 500);
    // pre-percept: foggy, with one clear earpiece
    const fog = S.group(g, 960, 470);
    const gf = glasses(S, fog, 960, 470, 1.1, 'ink mutedk');
    void gf;
    const clear = glasses(S, g, 960, 470, 1.1, 'ink');
    clear.lenses.forEach((p) => p.remove());
    const earpiece = clear.templeL;
    earpiece.setAttribute('class', 'ink a3');
    earpiece.setAttribute('stroke-width', '9');
    S.tw(fog, 'filter', B('g2').start, 600, 'blur(7px)', { from: 'blur(7px)' });
    S.tw(fog, 'opacity', B('g2').start, 700, 0.55, { from: 0 });
    S.draw(earpiece, B('g2').start + 500, 600);
    const l1 = S.el(sc, { x: 960, y: 690, anchor: 'tc', style: { textAlign: 'center' }, html: '<div class="tag" style="color:var(--a3)">1st · pre-percept</div><div class="body-s" style="margin-top:8px">foggy skeleton + one clear part · “glasses” as a concept</div>' });
    S.fadeUp(l1, at('g2', 0.3));
    // the real percept
    const sharp = S.group(g, 960, 470);
    glasses(S, sharp, 960, 470, 1.1, 'ink');
    S.tw(sharp, 'opacity', B('g3').start, 120, 1, { from: 0, ease: 'linear' });
    S.tw(sharp, 'scale', B('g3').start, 450, '1', { from: '1.06', ease: 'out' });
    S.fadeOut(fog, B('g3').start, 200);
    S.fadeOut(earpiece, B('g3').start + 100, 200);
    S.fadeOut(l1, B('g3').start, 200);
    const l2 = S.el(sc, { x: 960, y: 690, anchor: 'tc', style: { textAlign: 'center' }, html: '<div class="tag" style="color:var(--a4)">2nd · the percept</div><div class="body-s" style="margin-top:8px">explosive, sharp, complete · the first survives as a memory</div>' });
    S.fadeUp(l2, at('g3', 0.15));
    // hunch
    S.tw(sharp, 'translate', B('g4').start, 700, '0px -90px', { from: '0px 0px' });
    S.tw(sharp, 'scale', B('g4').start, 700, '0.7');
    S.fadeOut(l2, B('g4').start, 300);
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Perhaps we perceive <span class="mark" id="tw">everything twice</span>.', x: 960, y: 640, anchor: 'tc' }), B('g4').start + 400);
    S.mark(sc.querySelector('#tw'), at('g4', 0.4));
    S.fadeUp(S.el(sc, { cls: 'body-s', text: 'once as a schematic sketch · once as a clear image', x: 960, y: 740, anchor: 'tc' }), at('g4', 0.55));
  }

  // ── Theme 1: sentences sound clearer ─────────────────────────────────
  {
    const sc = S.sceneFor('t1a', 't1d', { title: 'Theme 1' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Theme 1: sentences sound clearer', x: 160, y: 150 }), B('t1a').start - 200);
    // list vs sentence
    S.fadeIn(S.el(sc, { cls: 'tag', text: 'random list', x: 160, y: 285, style: { color: 'var(--muted)' } }), B('t1b').start);
    const list = S.el(sc, { cls: 'h3', text: 'dog · bit · the · mailman · the', x: 160, y: 320, style: { color: 'var(--muted)' } });
    S.fadeIn(list, B('t1b').start, 400);
    S.tw(list, 'filter', B('t1b').start, 10, 'blur(3.5px)', { from: 'blur(3.5px)' });
    S.fadeIn(S.el(sc, { cls: 'tag', text: 'sentence', x: 160, y: 420, style: { color: 'var(--a4)' } }), B('t1b').start + 800);
    const sent = S.el(sc, { cls: 'h3', text: 'The mailman bit the dog.', x: 160, y: 455 });
    S.fadeIn(sent, B('t1b').start + 800, 400);
    S.tw(sent, 'filter', B('t1b').start + 1300, 900, 'blur(0px)', { from: 'blur(3.5px)' });
    S.fadeUp(S.el(sc, { cls: 'hand', text: '← heard more clearly', x: 760, y: 455 }), B('t1b').start + 2200);
    const vow = S.el(sc, { cls: 'card soft mono', x: 1060, y: 285, w: 700, style: { fontSize: '30px', lineHeight: '1.5' }, html: 'Cl#ss#c#l s#m# th#n n r#nd#m: w#rds #n s#nt#nc#s s##nd cl##r#r.' });
    S.fadeUp(vow, at('t1b', 0.62));
    // meaning isn't enough
    const n1 = S.el(sc, { cls: 'card soft', x: 160, y: 610, w: 770, html: '<div class="tag" style="color:var(--muted)">Nonsense</div><div class="quote" style="font-size:32px;margin-top:8px">“The slithey toves did gyre and gymbal”</div>' });
    const n2 = S.el(sc, { cls: 'card soft', x: 990, y: 610, w: 770, html: '<div class="tag" style="color:var(--muted)">Counterintuitive</div><div class="quote" style="font-size:32px;margin-top:8px">“The electrolytic mailman bit the religious dog”</div>' });
    S.fadeUp(n1, B('t1c').start + 300);
    S.fadeUp(n2, B('t1c').start + 700);
    S.fadeUp(S.el(sc, { cls: 'hand-s', text: 'still sound clearer → not just meaning', x: 960, y: 800, anchor: 'tc' }), at('t1c', 0.65));
    // syntax puzzle
    S.fadeOut(n1, B('t1d').start, 300); S.fadeOut(n2, B('t1d').start, 300);
    const pz = S.el(sc, { cls: 'card', x: 960, y: 640, w: 1200, anchor: 'tc', style: { textAlign: 'center', borderColor: 'var(--a4)', boxShadow: '7px 7px 0 var(--a4)' } });
    pz.innerHTML = '<div class="body">Computing syntax = <b>extra work</b>… which should leave <b>fewer</b> resources for hearing the words.</div><div class="hand" style="margin-top:10px;color:var(--a4)">so why do they sound clearer?</div>';
    S.fadeUp(pz, B('t1d').start + 300);
  }

  // ── Theme 2: syntax is real ──────────────────────────────────────────
  {
    const sc = S.sceneFor('t2a', 't2d', { title: 'Theme 2' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Theme 2: syntax is real', x: 160, y: 150 }), B('t2a').start - 200);
    const bad = S.el(sc, { cls: 'h3', html: '*The electrolytic mailman <span style="color:var(--bad);text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:8px">bite</span> the religious dog.', x: 160, y: 270 });
    S.fadeUp(bad, at('t2a', 0.4));
    S.fadeIn(S.el(sc, { cls: 'small', text: 'ungrammatical, whatever it means', x: 162, y: 335 }), at('t2a', 0.75));
    S.dim(bad, B('t2b').start, 0.3);
    // movement: "the big city was attacked [t]"
    const y = 470, fs = '58px';
    const words = [['The', 160], ['big', 290], ['was', 600], ['attacked', 730]];
    const wEls = words.map(([w, x]) => S.el(sc, { cls: 'serif', text: w, x, y, style: { fontSize: fs, fontWeight: 600 } }));
    wEls.forEach((e, i) => S.fadeUp(e, B('t2b').start + 200 + i * 120, 400));
    const city = S.el(sc, { cls: 'serif', html: 'city<sub style="font-size:28px">i</sub>', x: 1010, y, style: { fontSize: fs, fontWeight: 700, color: 'var(--a4)' } });
    S.fadeUp(city, B('t2b').start + 700, 400);
    S.move(city, at('t2b', 0.55), 1100, -600, 0);
    const trace = S.el(sc, { cls: 'serif', html: '[t<sub style="font-size:28px">i</sub>]', x: 1030, y, style: { fontSize: fs, color: 'var(--a4)' } });
    S.fadeIn(trace, at('t2b', 0.6) + 600, 500);
    const g = S.overlay(sc);
    S.draw(curveArrow(S, g, 1070, y + 85, 760, y + 230, 470, y + 85, 'ink a4 thin', 16), at('t2b', 0.6) + 900, 800);
    S.fadeIn(S.el(sc, { cls: 'hand-s', text: 'moved: subject AND object of “attacked”', x: 1200, y: y + 95, style: { color: 'var(--a4)' } }), at('t2b', 0.8));
    // probe recognition
    const bx = 160, by = 720;
    S.fadeIn(S.el(sc, { cls: 'tag', text: 'Time to recognize that “big” was in the sentence', x: bx, y: by - 52, style: { color: 'var(--muted)' } }), B('t2c').start + 300);
    const rows = [['“…city was attacked” (trace)', 0.55, 'var(--a4)'], ['“…city was rich” (no trace)', 0.85, 'var(--muted)']];
    rows.forEach(([lbl, v, c], i) => {
      S.fadeIn(S.el(sc, { cls: 'body-s', text: lbl, x: bx, y: by + i * 70 }), at('t2c', 0.45) + i * 300);
      const bar = S.el(sc, { x: bx + 470, y: by + 6 + i * 70, w: 700 * v, h: 40, style: { background: c, borderRadius: '6px', transformOrigin: '0 50%' } });
      S.tw(bar, 'scale', at('t2c', 0.45) + i * 300, 700, '1 1', { from: '0 1', ease: 'out' });
    });
    S.fadeUp(S.el(sc, { cls: 'hand', text: 'faster!', x: bx + 470 + 385 + 20, y: by - 6, style: { color: 'var(--a4)' } }), at('t2c', 0.85));
    // the delay
    const dl = S.el(sc, { cls: 'card soft', x: 1420, y: 640, w: 340, style: { borderColor: 'var(--a3)', boxShadow: '5px 5px 0 var(--a3)' }, html: '<div class="tag" style="color:#b9851d">but…</div><div class="body-s" style="margin-top:8px">shows up only <b>after</b> the sentence ends, not at the trace</div>' });
    S.fadeUp(dl, B('t2d').start + 200);
  }

  // ── Associations are real too ────────────────────────────────────────
  {
    const sc = S.sceneFor('as1', 'as3', { title: 'Theme 2, variation' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Variation: associations are real, too', x: 160, y: 150 }), B('as1').start - 200);
    const g = S.overlay(sc);
    // a little associative network
    const nodes = [[300, 420], [430, 330], [470, 500], [600, 400], [380, 610], [600, 610], [730, 520], [250, 560]];
    const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [4, 5], [3, 6], [5, 6], [0, 7], [7, 4], [1, 2], [3, 5]];
    edges.forEach(([a, b], i) => S.draw(S.path(g, `M${nodes[a][0]},${nodes[a][1]} L${nodes[b][0]},${nodes[b][1]}`, 'ink thin mutedk'), B('as1').start + 300 + i * 60, 400));
    nodes.forEach(([x, y], i) => S.fadeIn(S.shape(g, 'circle', { cx: x, cy: y, r: 16, class: 'fill-a3' }), B('as1').start + 200 + i * 70, 300));
    S.fadeUp(S.el(sc, { x: 490, y: 680, anchor: 'tc', style: { textAlign: 'center' }, html: '<div class="h4">habits & associations</div><div class="small" style="margin-top:4px">fast, superficial, everywhere</div>' }), at('as1', 0.4));
    // the spire
    const sx = 1480;
    S.draw(S.path(g, `M${sx - 110},790 L${sx - 110},600 L${sx - 60},540 L${sx - 60},470 L${sx},330 L${sx + 60},470 L${sx + 60},540 L${sx + 110},600 L${sx + 110},790 Z M${sx - 30},790 L${sx - 30},700 Q${sx},660 ${sx + 30},700 L${sx + 30},790`, 'ink'), B('as2').start + 300, 1400);
    S.draw(S.path(g, `M${sx - 120},285 C${sx - 90},230 ${sx - 10},240 ${sx},270 C${sx + 30},230 ${sx + 120},235 ${sx + 130},280 C${sx + 170},240 ${sx + 260},250 ${sx + 250},295 Z`, 'ink thin mutedk'), at('as2', 0.6), 700);
    S.fadeIn(S.el(sc, { cls: 'small', text: 'the heavens', x: sx + 65, y: 300, anchor: 'tc' }), at('as2', 0.65));
    S.fadeUp(S.el(sc, { cls: 'hand-s', html: 'a tall spire ≠ reaching heaven<br>mimicking structure ≠ having it', x: 880, y: 470, style: { color: 'var(--a1)' } }), at('as2', 0.7));
    const both = S.el(sc, { cls: 'card', x: 960, y: 820, anchor: 'tc', html: '<span class="h4">Needed: <span style="color:#b9851d">fast habits</span> + <span style="color:var(--a4)">real rules</span></span>' });
    S.fadeUp(both, B('as3').start);
  }

  // ── Analysis by synthesis ────────────────────────────────────────────
  {
    const sc = S.sceneFor('s0', 's4', { title: 'Development: analysis by synthesis' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Analysis <em>by</em> synthesis', x: 160, y: 140 }), B('s0').start - 200);
    const g = S.overlay(sc);
    const Y = 300, H = 230;
    const box = (x, w, color, html, t) => {
      const b = S.el(sc, { cls: 'card soft', x, y: Y, w, h: H, style: { borderColor: color, boxShadow: `5px 5px 0 ${color}`, padding: '20px 24px' }, html });
      S.fadeUp(b, t);
      return b;
    };
    box(160, 300, 'var(--ink)', '<div class="tag" style="color:var(--muted)">Input</div><div class="quote" style="font-size:30px;margin-top:12px">“the city was attacked”</div>', B('s0').start + 500);
    S.draw(arrow(S, g, 470, Y + H / 2, 530, Y + H / 2), B('s1').start, 300);
    box(540, 430, '#e2a93b', '<div class="tag" style="color:#b9851d">Pass 1 · fast, associative</div><div class="body-s" style="margin-top:10px;font-size:25px">(a) words + major phrases<br>(b) template <b>NP be PRED</b> → likely meaning</div>', B('s1').start + 200);
    S.draw(arrow(S, g, 980, Y + H / 2, 1040, Y + H / 2), B('s2').start, 300);
    box(1050, 360, 'var(--a4)', '<div class="tag" style="color:var(--a4)">Pass 2 · syntactic</div><div class="body-s" style="margin-top:10px;font-size:25px">(c) rebuild the sentence with the grammar, step by step</div>', B('s2').start + 200);
    S.draw(arrow(S, g, 1420, Y + H / 2, 1480, Y + H / 2), B('s3').start, 300);
    box(1490, 270, 'var(--good)', '<div class="tag" style="color:var(--good)">(d) Compare</div><div class="body-s" style="margin-top:10px;font-size:25px">rebuilt form = input?</div><div class="h4" style="margin-top:8px;color:var(--good)">✓ understood</div>', B('s3').start + 200);
    S.draw(curveArrow(S, g, 1620, Y + H + 15, 1100, Y + H + 140, 620, Y + H + 15, 'ink bad thin', 16), at('s3', 0.6), 800);
    S.fadeIn(S.el(sc, { cls: 'hand-s', text: 'no match → reanalyze', x: 1110, y: Y + H + 70, anchor: 'tc', style: { color: 'var(--bad)' } }), at('s3', 0.65));
    // the airplane analogy
    const py = 815;
    S.fadeIn(S.el(sc, { cls: 'small', text: 'start', x: 200, y: py + 20, anchor: 'tc' }), B('s4').start + 300);
    S.fadeIn(S.el(sc, { cls: 'small', text: 'here', x: 1700, y: py + 20, anchor: 'tc' }), B('s4').start + 300);
    const route = S.path(g, `M200,${py} C600,${py - 120} 1100,${py + 60} 1700,${py - 40}`, 'ink thin mutedk', { 'stroke-dasharray': '4 12' });
    S.fadeIn(route, B('s4').start + 200, 400);
    const plane = S.el(sc, { text: '✈', x: 200, y: py - 30, anchor: 'c', style: { fontSize: '54px', color: 'var(--a4)' } });
    S.fadeIn(plane, at('s4', 0.45), 200);
    const pts = Array.from({ length: 41 }, (_, i) => {
      const u = i / 40, x0 = 200, c1 = 600, c2 = 1100, x3 = 1700, y0 = py, y1 = py - 120, y2 = py + 60, y3 = py - 40;
      const bx = (1 - u) ** 3 * x0 + 3 * (1 - u) ** 2 * u * c1 + 3 * (1 - u) * u * u * c2 + u ** 3 * x3;
      const by = (1 - u) ** 3 * y0 + 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u * u * y2 + u ** 3 * y3;
      return [bx - 200, by - py];
    });
    const t0 = at('s4', 0.5), dur = 2600;
    S.every((t) => {
      const u = Math.min(1, Math.max(0, (t - t0) / dur));
      const k = Math.min(39, Math.floor(u * 40)), f = u * 40 - k;
      const x = pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f, y = pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f;
      plane.style.translate = `${x}px ${y}px`;
    });
    S.fadeIn(S.el(sc, { cls: 'hand-s', text: 'grammar runs forward only, so retrace the route from a likely start', x: 960, y: py - 150, anchor: 'tc', style: { color: 'var(--a4)' } }), at('s4', 0.55));
  }

  // ── Three look-alike sentences ───────────────────────────────────────
  {
    const sc = S.sceneFor('e1', 'e2', { title: 'Three look-alike sentences' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Same surface, different structure', x: 160, y: 150 }), B('e1').start - 200);
    const head = ['Sentence', 'Pass-1 template: NP be PRED', 'Adjective test'];
    head.forEach((h, i) => S.fadeIn(S.el(sc, { cls: 'tag', text: h, x: [160, 760, 1260][i], y: 280, style: { color: 'var(--muted)' } }), B('e1').start + 200));
    const rows = [
      ['The city was <b>rich</b>.', '✓ fits', 'the rich city lay before us ✓', 'e1', 0.25],
      ['The city was <b>ruined</b>.', '✓ fits', 'the ruined city lay before us ✓', 'e1', 0.55],
      ['The city was <b>attacked</b>.', '≈ meaning, ✗ structure', '*the attacked city lay before us', 'e2', 0.05],
    ];
    rows.forEach(([s, t, adj, id, f], i) => {
      const y = 330 + i * 110;
      S.fadeLeft(S.el(sc, { cls: 'h3', html: s, x: 160, y }), at(id, f));
      S.fadeLeft(S.el(sc, { cls: 'body', html: t, x: 760, y: y + 4, style: { color: i < 2 ? 'var(--good)' : '#b9851d' } }), at(id, f) + 300);
      S.fadeLeft(S.el(sc, { cls: 'body-s', html: adj, x: 1260, y: y + 8, style: { color: i < 2 ? 'var(--ink2)' : 'var(--bad)' } }), at(id, i < 2 ? f + 0.15 : 0.45));
    });
    const fix = S.el(sc, { cls: 'card', x: 160, y: 690, w: 1600, style: { borderColor: 'var(--a4)', boxShadow: '7px 7px 0 var(--a4)' } });
    fix.innerHTML = '<span class="tag" style="color:var(--a4)">Pass 2 repairs it</span><span class="h3" style="margin-left:24px">The city<sub>i</sub> was attacked [t<sub>i</sub>]</span><span class="body-s" style="margin-left:24px">city = patient of “attack”, moved to subject</span>';
    S.fadeUp(fix, at('e2', 0.7));
  }

  // ── Evidence ─────────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('v1', 'v4', { title: 'What the model explains' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'What the two-pass model explains', x: 160, y: 120 }), B('v1').start - 200);
    const cards = [
      ['v1', '1 · Full syntax arrives late', 'Click location, trace salience, movement violations: detected only after <b>a few hundred ms</b>.'],
      ['v2', '2 · First meaning, incomplete syntax', 'Kids: passives as “noun <b>be</b> adjective.” Every moved-NP sentence has a look-alike:<br>was attacked / was ruined · was likely / was eager to attack'],
      ['v3', '3 · We understand everything twice', '<span class="serif" style="font-style:italic;font-size:30px">“More people have gone to Russia than I have.”</span><br>seems fine… then doesn’t compute'],
      ['v4', '4 · Pass two earns its keep', '<span class="serif" style="font-style:italic;font-size:30px">“Delhi copra pricing techniques are quite ununderstandable.”</span><br>odd, out of context, still understood'],
    ];
    cards.forEach(([id, h, body], i) => {
      const x = 160 + (i % 2) * 820, y = 230 + Math.floor(i / 2) * 330;
      const c = S.el(sc, { cls: 'card soft', x, y, w: 780, h: 300 });
      c.innerHTML = `<div class="h4" style="color:var(--a4)">${h}</div><div class="body-s" style="margin-top:14px;font-size:26px">${body}</div>`;
      S.fadeUp(c, B(id).start);
    });
  }

  // ── Recapitulation ───────────────────────────────────────────────────
  {
    const sc = S.sceneFor('rc', 'rc', { title: 'Recapitulation' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Why sentences sound clear', x: 160, y: 150 }), B('rc').start - 200);
    const r1 = S.el(sc, { cls: 'card soft', x: 160, y: 320, w: 620, style: { borderColor: '#e2a93b', boxShadow: '5px 5px 0 #e2a93b' }, html: '<div class="tag" style="color:#b9851d">Surface form #1 · pass 1</div><div class="h3" style="margin-top:10px">the city was attacked</div>' });
    const r2 = S.el(sc, { cls: 'card soft', x: 160, y: 520, w: 620, style: { borderColor: 'var(--a4)', boxShadow: '5px 5px 0 var(--a4)' }, html: '<div class="tag" style="color:var(--a4)">Surface form #2 · rebuilt</div><div class="h3" style="margin-top:10px">the city was attacked</div>' });
    S.fadeUp(r1, at('rc', 0.3));
    S.fadeUp(r2, at('rc', 0.45));
    const g = S.overlay(sc);
    S.draw(arrow(S, g, 820, 440, 960, 520), at('rc', 0.6), 400);
    S.draw(arrow(S, g, 820, 620, 960, 545), at('rc', 0.62), 400);
    const out = S.el(sc, { cls: 'card', x: 990, y: 440, w: 770, style: { textAlign: 'center' }, html: '<div class="tag" style="color:var(--good)">match ✓</div><div class="h2" style="margin-top:10px;letter-spacing:.01em">the city was attacked</div><div class="hand" style="margin-top:6px">extra representation → extra clarity</div>' });
    S.fadeUp(out, at('rc', 0.7));
  }

  // ── Coda: consciousness ──────────────────────────────────────────────
  {
    const sc = S.sceneFor('k1', 'k5', { title: 'Coda: consciousness', post: 2200 });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Coda: which draft feels real?', x: 160, y: 140 }), B('k1').start - 200);
    const g = S.overlay(sc);
    // the loop: meaning -> derivation -> surface form -> ...
    const cx = 470, cy = 520, R = 190;
    const labels = [['meaning', -90], ['derivation', 30], ['surface form', 150]];
    labels.forEach(([lbl, deg], i) => {
      const a = (deg * Math.PI) / 180;
      S.pop(S.el(sc, { cls: 'pill body-s', text: lbl, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), anchor: 'c' }), B('k1').start + 600 + i * 500);
      const a0 = a + 0.42, a1 = a + (2 * Math.PI) / 3 - 0.42;
      const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      const head = 16, ta = a1 + Math.PI / 2;
      const arc = S.path(g, `M${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1}`, 'ink a4');
      const h = S.path(g, `M${x1 - head * Math.cos(ta - 0.45)},${y1 - head * Math.sin(ta - 0.45)} L${x1},${y1} L${x1 - head * Math.cos(ta + 0.45)},${y1 - head * Math.sin(ta + 0.45)}`, 'ink a4');
      S.draw([arc, h], B('k1').start + 900 + i * 500, 500);
    });
    S.fadeUp(S.el(sc, { cls: 'hand-s', text: 'Dennett’s “multiple drafts”', x: cx, y: cy + R + 70, anchor: 'tc', style: { color: 'var(--a4)' } }), at('k1', 0.7));
    // three candidate answers
    const opts = [['the latest draft', 0.55], ['the most complete draft', 0.7], ['the draft most dependent on internal computation', 0.82]];
    const optEls = opts.map(([o, f], i) => {
      const c = S.el(sc, { cls: 'card soft', x: 900, y: 270 + i * 135, w: 860, style: { padding: '20px 28px' }, html: `<div class="body" style="font-size:30px">${o}</div>` });
      S.fadeLeft(c, at('k2', f));
      return c;
    });
    S.dim(optEls[0], B('k3').start + 200, 0.35);
    S.dim(optEls[1], B('k3').start + 200, 0.35);
    S.tw(optEls[2], 'border-color', B('k3').start + 200, 300, '#5a54a4', { from: '#1f2328' });
    S.stamp(S.el(sc, { cls: 'stampbox', text: 'their pick', x: 1700, y: 628, anchor: 'c', style: { color: 'var(--a4)', fontSize: '30px', background: 'rgba(244,239,230,.92)' } }), at('k3', 0.3));
    // prediction
    const pr = S.el(sc, { cls: 'card', x: 900, y: 690, w: 860, style: { borderColor: 'var(--a1)', boxShadow: '7px 7px 0 var(--a1)' }, html: '<div class="tag" style="color:var(--a1)">Bold, testable prediction</div><div class="body" style="margin-top:8px;font-size:29px">More complex (but understood) sentence → <b>clearer</b> words</div>' });
    S.fadeUp(pr, B('k4').start + 200);
    // ending
    S.fadeUp(S.el(sc, { cls: 'quote', text: '“My end is my beginning.”', x: cx, y: cy + R + 140, anchor: 'tc', style: { fontSize: '38px' } }), B('k5').start + 200);
  }
}
