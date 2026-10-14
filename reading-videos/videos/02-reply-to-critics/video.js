// What Darwin Got Wrong (Fodor & Piattelli-Palmarini), paperback edition:
// the last pages of "Afterword and reply to the critics" (pp. 187–189) and the Appendix (pp. 191–205).

import { arrow, cross, check, gearD } from '../../engine/kit.js';

export const meta = { label: 'What Darwin Got Wrong · Reply to critics + Appendix', speed: 1.05 };

export const beats = [
  { id: 'intro', text: "This reading is the end of Fodor and Piattelli-Palmarini's reply to their critics, in What Darwin Got Wrong, plus the book's appendix.", gap: 900 },

  { id: 's1', text: 'Critics insisted: there has to be something about the creatures, or their ecology, that made the ones with a trait flourish more than those without it.' },
  { id: 's2', text: 'Of course there does, the authors reply. That follows from the principle of sufficient reason, and the cause must be inside the organism or outside it.' },
  { id: 's3', text: 'But that is a truism, not a theory. In their words:' },
  { id: 's3q', voice: 'quote', text: 'There is no theory of evolution. All there is, is natural history.', gap: 900 },

  { id: 'j1', text: "Asked about the eye's adaptive function, they point to the box jellyfish, Tripedalia cystophora." },
  { id: 'j2', text: 'It has twenty-four eyes, much like ours, but no brain to collect the images, no optic nerve, and lenses that focus behind the retina.' },
  { id: 'j3', text: 'A feast of structure without function, and no adaptive explanation in sight.', gap: 900 },

  { id: 'm1', text: "Critics also pointed to the mathematical theory of selection: from Hardy-Weinberg, through Fisher, Haldane, and Wright, to Price's theorem." },
  { id: 'm2', text: 'The authors answer with the historian William Provine:' },
  { id: 'm2q', voice: 'quote', text: 'They all disagreed, often intensely, with each other about actual processes of evolution in nature, even when their models were mathematically equivalent.' },
  { id: 'm3', text: 'And with Carl Woese: biology built a facade of mathematics, and neglected the nature of the evolutionary process itself.' },
  { id: 'm4', text: "Their point: models aren't causal explanations. They spell out the consequences of idealizations, and track correlations, not mechanisms." },
  { id: 'm5', text: 'Sean Rice even notes that two standard idealizations contradict each other.' },
  { id: 'm6', text: 'So their worry stands: no causal mechanism could do what selection-for is supposed to do.', gap: 900 },

  { id: 'c1', text: 'Their verdict: Darwin still got a lot wrong, above all the externalism of his account of selection, and the intensionality of selection-for.' },
  { id: 'c2', text: 'The critics, they say, offered mostly a howl of reflexive Darwinism.' },
  { id: 'c3', text: "They still hope for a calm, rational debate, but admit they believe in it less than they did a year ago.", gap: 900 },

  { id: 'a1', text: "The appendix answers biologists who say that nobody is that kind of Darwinian anymore: an unabashed adaptationist." },
  { id: 'a2', text: 'It is an anthology of quotations, showing hard-line adaptationism thriving in psychology and the philosophy of mind.', gap: 800 },

  { id: 'e0', text: 'Wave one is evolutionary epistemology: knowledge itself, explained by selection.' },
  { id: 'e1', text: 'Boltzmann called the laws of logic inherited habits of thought. James, Peirce, and Dewey extended Darwin to ideas and logic. Quine said bad inductive reasoners tend to die before reproducing their kind. And Campbell and Popper let false theories die in our stead.', gap: 900 },

  { id: 'p0', text: 'Wave two is evolutionary psychology, from 1988 to 2009.' },
  { id: 'p1', text: "Daly and Wilson's Cinderella effect. Robert Wright: everything about the mind is intelligible through selection. Cosmides and Tooby: selection designed the brain to be a computer." },
  { id: 'p2', text: "Millikan, Murphy and Stich, Todd and Gigerenzer, and others apply the same logic to purposes, mismatched minds, heuristics, and even philosophers' intuitions. Buss and Pinker call it the fulfillment of Darwin's vision.", gap: 900 },

  { id: 'w1', text: "The authors don't rebut these quotations one by one. They're evidence that adaptationism has spread far beyond biology." },
  { id: 'w2', text: 'Hence the strategy: cut the tree at its roots, by attacking natural selection itself.', gap: 900 },

  { id: 'r0', text: 'To recap.' },
  { id: 'r1', text: "'Something made them flourish' is a truism, not a theory. There's only natural history." },
  { id: 'r2', text: 'Mathematical models describe correlations, not causal mechanisms.' },
  { id: 'r3', text: 'And the appendix shows the adaptationist target is real.', gap: 600 },
];

function jellyfish(S, g, cx, cy, s = 1) {
  const P = (d, cls = 'ink') => S.path(g, d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${(cx + a * s).toFixed(1)},${(cy + b * s).toFixed(1)}`), cls);
  const bell = P('M-150,40 C-150,-120 150,-120 150,40 C100,25 -100,25 -150,40 Z');
  const tent = [-120, -60, 0, 60, 120].map((x, i) => P(`M${x},${30} C${x + 25},${90} ${x - 25},${150} ${x + (i % 2 ? 15 : -15)},${230}`, 'ink a4'));
  return { bell, tent };
}

export function build(S) {
  const { B, at } = S;

  // ── Intro ────────────────────────────────────────────────────────────
  {
    const sc = S.scene(0, B('intro').end + 450);
    S.fadeUp(S.el(sc, { cls: 'kicker', text: 'Reading guide', x: 160, y: 250 }), 300);
    S.fadeUp(S.el(sc, { cls: 'h1', html: 'Reply to the critics<br>+ Appendix', x: 160, y: 295 }), 450, 800);
    S.fadeUp(S.el(sc, { cls: 'body', html: 'Fodor & Piattelli-Palmarini, <em>What Darwin Got Wrong</em> (paperback afterword)', x: 162, y: 525 }), 1100);
    const parts = [
      ['pp. 187–189', 'End of the reply: “something about the creatures,” the jellyfish, mathematical models, conclusion'],
      ['pp. 191–205', 'Appendix: “that kind of Darwinian” in psychology and philosophy of mind'],
    ];
    parts.forEach(([pp, d], i) => {
      const c = S.el(sc, { cls: 'card soft', x: 160 + i * 820, y: 640, w: 780, html: `<div class="tag" style="color:var(--a1)">${pp}</div><div class="body-s" style="margin-top:10px">${d}</div>` });
      S.fadeUp(c, at('intro', 0.45) + i * 600);
    });
  }

  // ── "There has to be something" ──────────────────────────────────────
  {
    const sc = S.sceneFor('s1', 's3q', { title: '“There has to be something”' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'The critics’ point', x: 160, y: 150 }), B('s1').start - 200);
    const g = S.overlay(sc);
    // two populations: F creatures flourish, not-F creatures don't
    const blob = (x, y, r, cls) => S.shape(g, 'circle', { cx: x, cy: y, r, class: cls });
    const Fs = [[260, 380], [330, 330], [345, 420], [410, 370], [275, 460], [420, 455], [480, 410]].map(([x, y]) => blob(x, y, 26, 'fill-a2'));
    const Ns = [[650, 390], [730, 430], [700, 350]].map(([x, y]) => blob(x, y, 26, 'ink mutedk'));
    Fs.forEach((b, i) => S.fadeIn(b, B('s1').start + 300 + i * 120, 300));
    Ns.forEach((b, i) => S.fadeIn(b, B('s1').start + 600 + i * 150, 300));
    S.fadeIn(S.el(sc, { cls: 'tag', text: 'with trait F: flourish', x: 370, y: 510, anchor: 'tc', style: { color: 'var(--a2)' } }), at('s1', 0.3));
    S.fadeIn(S.el(sc, { cls: 'tag', text: 'without F', x: 690, y: 510, anchor: 'tc', style: { color: 'var(--muted)' } }), at('s1', 0.35));
    const why = S.el(sc, { cls: 'card', x: 960, y: 290, w: 800, html: '<div class="body">“There has to be <span class="mark" id="sm">something</span> about the creatures, or their ecology, that made the F ones flourish.”</div>' });
    S.fadeUp(why, at('s1', 0.4));
    S.mark(why.querySelector('#sm'), at('s1', 0.55));
    // reply: sufficient reason
    S.fadeUp(S.el(sc, { cls: 'tag', text: 'Principle of sufficient reason', x: 160, y: 610, style: { color: 'var(--a1)' } }), B('s2').start);
    const inside = S.el(sc, { cls: 'pill h4', text: 'inside the organism', x: 160, y: 660 });
    const or = S.el(sc, { cls: 'hand', text: 'or', x: 580, y: 668 });
    const outside = S.el(sc, { cls: 'pill h4', text: 'outside it', x: 660, y: 660 });
    S.pop(inside, at('s2', 0.45));
    S.fadeIn(or, at('s2', 0.55));
    S.pop(outside, at('s2', 0.6));
    S.fadeIn(S.el(sc, { cls: 'small', text: '…there’s nowhere else for it to be.', x: 160, y: 760 }), at('s2', 0.82));
    S.stamp(S.el(sc, { cls: 'stampbox', text: 'Truism ≠ theory', x: 1360, y: 535, anchor: 'tc', style: { color: 'var(--bad)', fontSize: '44px' } }), B('s3').start + 200);
    const qc = S.el(sc, { cls: 'card', x: 960, y: 715, w: 800, style: { borderColor: 'var(--a1)', boxShadow: '7px 7px 0 var(--a1)' } });
    qc.innerHTML = '<div class="quote" style="font-size:38px">“There is no theory of evolution. All there is, is natural history.”</div><div class="cite" style="margin-top:10px">p. 187</div>';
    S.fadeUp(qc, B('s3q').start);
  }

  // ── The box jellyfish ────────────────────────────────────────────────
  {
    const sc = S.sceneFor('j1', 'j3', { title: 'Structure without function' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'The box jellyfish', x: 160, y: 150 }), B('j1').start - 200);
    S.fadeUp(S.el(sc, { cls: 'body-s', html: '<em>Tripedalia cystophora</em> · waters near Puerto Rico', x: 162, y: 228 }), B('j1').start + 400);
    const g = S.overlay(sc);
    const jf = jellyfish(S, g, 520, 500, 1.55);
    S.draw(jf.bell, B('j1').start + 600, 1000);
    S.draw(jf.tent, B('j1').start + 1200, 900, { stagger: 120 });
    // 24 eyes, in clusters around the bell rim
    const clusters = [[-120, 5], [-45, -20], [45, -20], [120, 5]];
    let k = 0;
    clusters.forEach(([cx, cy]) => {
      for (let i = 0; i < 6; i++) {
        const x = 520 + (cx + (i % 3) * 14 - 14) * 1.55, y = 500 + (cy + Math.floor(i / 3) * 14 - 40) * 1.55;
        const e = S.shape(g, 'circle', { cx: x, cy: y, r: 6, class: 'fill-ink' });
        S.fadeIn(e, B('j2').start + 200 + k++ * 45, 200);
      }
    });
    S.fadeUp(S.el(sc, { cls: 'hand', text: '24 eyes', x: 250, y: 300 }), B('j2').start + 900);
    const rows = [
      ['24 eyes, much like vertebrate eyes', true, 0.12],
      ['No brain to collect the images', false, 0.4],
      ['No optic nerve', false, 0.55],
      ['Lenses focus <em>behind</em> the retina', false, 0.7],
    ];
    rows.forEach(([txt, ok, f], i) => {
      const y = 330 + i * 105;
      const row = S.el(sc, { cls: 'body', html: txt, x: 1100, y });
      S.fadeLeft(row, at('j2', f));
      if (ok) S.draw(check(S, g, 1050, y + 24, 46), at('j2', f) + 200, 400);
      else S.draw(cross(S, g, 1050, y + 24, 38), at('j2', f) + 200, 300, { stagger: 100 });
    });
    S.stamp(S.el(sc, { cls: 'stampbox', text: 'Structure without function', x: 1340, y: 790, anchor: 'tc', style: { color: 'var(--a4)', fontSize: '38px' } }), B('j3').start + 200);
  }

  // ── Mathematical models ──────────────────────────────────────────────
  {
    const sc = S.sceneFor('m1', 'm6', { title: 'On mathematical models' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'The defense: mathematical models', x: 160, y: 150 }), B('m1').start - 200);
    // timeline
    const g = S.overlay(sc);
    S.draw(S.path(g, 'M180,350 L1740,350', 'ink thin'), B('m1').start + 300, 900);
    const marks = [
      [260, '1908', 'Hardy–Weinberg', 0.4], [720, '1920s–30s', 'Fisher · Haldane · Wright', 0.58], [1180, '1970', 'Price’s theorem', 0.8],
    ];
    marks.forEach(([x, yr, who, f]) => {
      const d = S.shape(g, 'circle', { cx: x, cy: 350, r: 11, class: 'fill-a1' });
      S.fadeIn(d, at('m1', f), 250);
      S.fadeUp(S.el(sc, { cls: 'tag', text: yr, x, y: 300, anchor: 'tc', style: { color: 'var(--a1)', textTransform: 'none' } }), at('m1', f));
      S.fadeUp(S.el(sc, { cls: 'h4', text: who, x, y: 378, anchor: 'tc' }), at('m1', f) + 100);
    });
    S.fadeIn(S.el(sc, { cls: 'mono', text: 'p² + 2pq + q² = 1', x: 1560, y: 375, anchor: 'tc', style: { fontSize: '30px', color: 'var(--muted)' } }), at('m1', 0.85));
    // quotes
    const q1 = S.el(sc, { cls: 'card soft', x: 160, y: 480, w: 780 });
    q1.innerHTML = '<div class="quote" style="font-size:31px">“They all disagreed, often intensely, with each other about actual processes of evolution in nature, <span class="mark" id="eq">even when their models were mathematically equivalent</span>.”</div><div class="cite" style="margin-top:12px">William Provine, historian (1988)</div>';
    S.fadeUp(q1, B('m2q').start - 300);
    S.mark(q1.querySelector('#eq'), at('m2q', 0.62), 900);
    const q2 = S.el(sc, { cls: 'card soft', x: 990, y: 480, w: 770 });
    q2.innerHTML = '<div class="quote" style="font-size:31px">“Biology built up a <span class="mark" id="fa">facade of mathematics</span> … and neglected to study … the nature of the evolutionary process.”</div><div class="cite" style="margin-top:12px">Carl Woese, microbiologist (2010)</div>';
    S.fadeUp(q2, B('m3').start);
    S.mark(q2.querySelector('#fa'), at('m3', 0.35), 700);
    [q1, q2].forEach((q) => S.fadeOut(q, B('m4').start - 300, 400));
    // model ≠ mechanism
    const mm = S.scene(B('m4').start - 300, B('m6').end + 400);
    sc.appendChild(mm);
    const g2 = S.overlay(mm);
    S.draw(S.path(g2, 'M220,820 L220,520 M220,820 L640,820', 'ink'), B('m4').start, 600);
    S.draw(S.path(g2, 'M250,790 C350,740 450,640 610,560', 'ink a1'), B('m4').start + 500, 700);
    [[270, 770], [330, 740], [390, 700], [440, 690], [500, 630], [560, 610], [600, 560]].forEach(([x, y], i) =>
      S.fadeIn(S.shape(g2, 'circle', { cx: x, cy: y + (i % 2 ? 14 : -10), r: 8, class: 'fill-ink' }), B('m4').start + 300 + i * 80, 200));
    S.fadeUp(S.el(mm, { cls: 'h4', text: 'model: correlation', x: 430, y: 840, anchor: 'tc' }), B('m4').start + 400);
    S.pop(S.el(mm, { cls: 'h1', text: '≠', x: 800, y: 670, anchor: 'c', style: { color: 'var(--bad)' } }), at('m4', 0.3));
    const gg = S.group(g2, 1050, 670);
    S.path(gg, gearD(1050, 670, 110, 10), 'ink mutedk', { 'stroke-width': 5 });
    S.draw(gg, at('m4', 0.3), 900);
    S.fadeIn(S.el(mm, { cls: 'h1', text: '?', x: 1050, y: 670, anchor: 'c', style: { color: 'var(--a1)' } }), at('m4', 0.5));
    S.fadeUp(S.el(mm, { cls: 'h4', text: 'causal mechanism', x: 1050, y: 840, anchor: 'tc' }), at('m4', 0.35));
    // Rice: contradictory idealizations
    S.fadeUp(S.el(mm, { cls: 'tag', text: 'Sean Rice: idealizations collide', x: 1300, y: 500, style: { color: 'var(--a4)' } }), B('m5').start);
    const i1 = S.el(mm, { cls: 'card soft', x: 1300, y: 545, w: 470, style: { padding: '18px 24px' }, html: '<div class="body-s" style="font-size:25px">New variants appear <b>one at a time</b></div>' });
    const i2 = S.el(mm, { cls: 'card soft', x: 1300, y: 735, w: 470, style: { padding: '18px 24px' }, html: '<div class="body-s" style="font-size:25px">Populations respond <b>quickly</b> to change</div>' });
    S.fadeLeft(i1, at('m5', 0.15));
    S.fadeLeft(i2, at('m5', 0.35));
    S.pop(S.el(mm, { cls: 'hand', text: '↕ contradictory', x: 1535, y: 682, anchor: 'c', style: { color: 'var(--bad)' } }), at('m5', 0.6));
    S.fadeUp(S.el(mm, { cls: 'hand-s', text: 'no mechanism for selection-for', x: 1050, y: 470, anchor: 'tc', style: { color: 'var(--bad)' } }), B('m6').start + 300);
  }

  // ── Conclusion ───────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('c1', 'c3', { title: 'Conclusion of the reply' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Their conclusion', x: 160, y: 150 }), B('c1').start - 200);
    const c1 = S.el(sc, { cls: 'card', x: 160, y: 270, w: 1600 });
    c1.innerHTML = '<div class="h3">Still “a lot that Darwin got wrong”</div><div class="body" style="margin-top:12px;font-size:30px">The <b>externalism</b> of his account of selection, and his failure to notice the <b>intensionality of selection-for</b>.</div>';
    S.fadeUp(c1, B('c1').start);
    const c2 = S.el(sc, { cls: 'card soft', x: 160, y: 520, w: 770, h: 300 });
    c2.innerHTML = '<div class="tag" style="color:var(--bad)">The critics so far</div><div class="quote" style="margin-top:22px;font-size:50px">“A howl of reflexive Darwinism”</div><div class="body-s" style="margin-top:16px">…with little attention to the structure of the arguments.</div>';
    S.fadeUp(c2, B('c2').start);
    const c3 = S.el(sc, { cls: 'card soft', x: 990, y: 520, w: 770, h: 300 });
    c3.innerHTML = '<div class="tag" style="color:var(--a2)">Hope for rational debate</div><div style="margin-top:30px;height:48px;border:3px solid var(--ink);border-radius:999px;overflow:hidden;background:var(--paper)"><div id="hope" style="height:100%;width:100%;background:var(--a2)"></div></div><div class="quote" style="margin-top:24px;font-size:30px">“…we don’t believe in it now as much as we did a year ago.”</div>';
    S.fadeUp(c3, B('c3').start);
    S.tw(c3.querySelector('#hope'), 'width', at('c3', 0.5), 1400, '58%', { from: '100%' });
  }

  // ── Appendix: why ────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('a1', 'a2', { title: 'The Appendix' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'The Appendix', x: 160, y: 150 }), B('a1').start - 200);
    const claim = S.el(sc, { cls: 'card soft', x: 160, y: 290, w: 760 });
    claim.innerHTML = '<div class="tag" style="color:var(--muted)">Friends in “wet” biology</div><div class="quote" style="margin-top:12px;font-size:38px">“Nobody is <em>that</em> kind of Darwinian anymore.”</div><div class="small" style="margin-top:10px">i.e. an unabashed adaptationist</div>';
    S.fadeUp(claim, B('a1').start + 300);
    const ans = S.el(sc, { cls: 'card', x: 1000, y: 290, w: 760, style: { borderColor: 'var(--a1)', boxShadow: '7px 7px 0 var(--a1)' } });
    ans.innerHTML = '<div class="tag" style="color:var(--a1)">The reply</div><div class="h3" style="margin-top:12px">An anthology of quotations</div><div class="body-s" style="margin-top:10px">Hard-line adaptationism is alive and influential in psychology and the philosophy of mind.</div>';
    S.fadeUp(ans, B('a2').start);
    const tags = ['Evolutionary epistemology · 1877–1976', 'Evolutionary psychology · 1988–2009'];
    tags.forEach((t, i) => S.pop(S.el(sc, { cls: 'pill h4', text: t, x: 160 + i * 820, y: 640 }), at('a2', 0.5) + i * 400));
  }

  // ── Wave 1: evolutionary epistemology ────────────────────────────────
  {
    const sc = S.sceneFor('e0', 'e1', { title: 'Evolutionary epistemology' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Wave 1: knowledge, explained by selection', x: 160, y: 120 }), B('e0').start - 200);
    const cards = [
      ['e1', 0, 'Boltzmann', '1900', 'Laws of logic = inherited habits of thought. Theories are first useful, then “true.”'],
      ['e1', 0.25, 'William James', '1890s', 'New ideas are spontaneous variations; those that survive reality live another day.'],
      ['e1', 0.29, 'C. S. Peirce', '1877', 'Selection favors practical logic, but may allow pleasing falsehoods elsewhere.'],
      ['e1', 0.33, 'John Dewey', '1909', 'Darwin freed logic for application to mind, morals, and life.'],
      ['e1', 0.47, 'W. V. Quine', '1969', 'Bad inductors “tend to die before reproducing their kind.” (Admittedly circular.)'],
      ['e1', 0.78, 'Campbell · Popper', '1974–75', '“Evolutionary epistemology”: we let false theories die in our stead.'],
    ];
    cards.forEach(([id, f, who, yr, gist], i) => {
      const x = 160 + (i % 3) * 545, y = 235 + Math.floor(i / 3) * 335;
      const c = S.el(sc, { cls: 'card soft', x, y, w: 505, h: 300 });
      c.innerHTML = `<div class="tag" style="color:var(--a1);text-transform:none">${yr}</div><div class="h3" style="margin:8px 0 12px">${who}</div><div class="body-s" style="font-size:26px">${gist}</div>`;
      S.fadeUp(c, at(id, f));
    });
  }

  // ── Wave 2: evolutionary psychology ──────────────────────────────────
  {
    const sc = S.sceneFor('p0', 'p2', { title: 'Evolutionary psychology' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Wave 2: evolutionary psychology, 1988–2009', x: 160, y: 120 }), B('p0').start - 200);
    const notes = [
      ['p1', 0, 'Daly & Wilson', '1988', 'The “Cinderella effect”: stepchildren at far higher risk.', 'var(--soft1)'],
      ['p1', 0.22, 'Robert Wright', '1994', 'Everything about the mind intelligible via selection.', 'var(--soft3)'],
      ['p1', 0.6, 'Cosmides & Tooby', '1994–2005', 'Selection designed the brain to be a computer: study the mind like an engineer.', 'var(--soft4)'],
      ['p2', 0, 'Ruth Millikan', '2004', 'All purposes are “natural purposes,” derived from selection.', 'var(--soft2)'],
      ['p2', 0.04, 'Murphy & Stich', '2000', 'Minds built for an ancestral, hunter-gatherer world.', 'var(--soft1)'],
      ['p2', 0.12, 'Todd & Gigerenzer', '2003', 'Simple heuristics exploit the structure of environments.', 'var(--soft3)'],
      ['p2', 0.22, 'Barrett, Kurzban, Machery', '2006', 'Even general-purpose mechanisms must be plausible adaptations.', 'var(--soft2)'],
      ['p2', 0.55, 'Cokely & Feltz', '2009', 'Philosophical intuitions, explained as adaptive.', 'var(--soft4)'],
      ['p2', 0.72, 'David Buss', '2009', 'Evolutionary psychology fulfills Darwin’s vision.', 'var(--soft1)'],
      ['p2', 0.78, 'Steven Pinker', '2005', 'Sex, love, status, religion, art, morality: opened up to science.', 'var(--soft3)'],
    ];
    notes.forEach(([id, f, who, yr, gist, bg], i) => {
      const x = 160 + (i % 5) * 325, y = 235 + Math.floor(i / 5) * 335;
      const rot = [-1.5, 1, -0.5, 1.5, -1][i % 5] * (Math.floor(i / 5) ? -1 : 1);
      const c = S.el(sc, { cls: 'card soft', x, y, w: 300, h: 305, style: { background: bg, rotate: `${rot}deg`, padding: '22px 22px' } });
      c.innerHTML = `<div class="tag" style="font-size:18px;color:var(--ink2)">${yr}</div><div class="h4" style="margin:8px 0 10px;font-size:29px">${who}</div><div class="body-s" style="font-size:23px">${gist}</div>`;
      S.pop(c, at(id, f), 500, 0.85);
    });
  }

  // ── Why it matters ───────────────────────────────────────────────────
  {
    const sc = S.sceneFor('w1', 'w2', { title: 'Why the appendix matters' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Why the anthology matters', x: 160, y: 150 }), B('w1').start - 200);
    const g = S.overlay(sc);
    // a tree whose roots are "natural selection" and whose branches are fields
    const tx = 960;
    S.draw(S.path(g, `M${tx},790 L${tx},600`, 'ink', { 'stroke-width': 10 }), B('w1').start + 300, 700);
    const branches = [[-560, 420], [-290, 380], [0, 360], [290, 380], [560, 420]];
    branches.forEach(([dx, y], i) => S.draw(S.path(g, `M${tx},${600 + (i % 2) * 30} Q${tx + dx * 0.4},${y + 120} ${tx + dx},${y + 20}`, 'ink', { 'stroke-width': 6 }), B('w1').start + 800 + i * 120, 600));
    ['epistemology', 'psychology', 'philosophy of mind', 'semantics', 'ethics'].forEach((f, i) => {
      const [dx, y] = branches[i];
      S.pop(S.el(sc, { cls: 'pill body-s', text: f, x: tx + dx, y: y - 10, anchor: 'bc' }), at('w1', 0.45) + i * 200);
    });
    const root = S.el(sc, { cls: 'box-black', x: tx, y: 795, w: 560, h: 96, anchor: 'tc', text: 'natural selection as the mechanism' });
    S.fadeUp(root, at('w1', 0.2));
    S.draw(S.path(g, `M${tx - 220},760 L${tx + 220},760`, 'ink bad', { 'stroke-width': 9 }), B('w2').start + 400, 600);
    S.fadeUp(S.el(sc, { cls: 'hand', text: '“cut the tree at its roots”', x: tx + 250, y: 690 }), at('w2', 0.3));
  }

  // ── Recap ────────────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('r0', 'r3', { title: 'Recap', post: 2000 });
    S.fadeUp(S.el(sc, { cls: 'h1', text: 'Recap', x: 160, y: 150 }), B('r0').start);
    const pts = [
      ['r1', '“<em>Something</em> made them flourish” is a <b>truism</b>, not a theory: no theory of evolution, only <b>natural history</b>.'],
      ['r2', 'Mathematical models make idealizations explicit; they describe <b>correlations</b>, not <b>causal mechanisms</b>.'],
      ['r3', 'The Appendix shows unabashed adaptationism thriving in <b>psychology and philosophy</b>: the target is real.'],
    ];
    pts.forEach(([id, txt], i) => {
      S.pop(S.el(sc, { cls: 'num', text: String(i + 1), x: 160, y: 320 + i * 180 }), B(id).start);
      S.fadeLeft(S.el(sc, { cls: 'body', html: txt, x: 260, y: 318 + i * 180, w: 1460, style: { fontSize: '36px' } }), B(id).start + 150);
    });
  }
}
