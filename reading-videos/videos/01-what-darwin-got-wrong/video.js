// What Darwin Got Wrong (Fodor & Piattelli-Palmarini, 2010):
// Terms of Engagement + Chapter 1, "What kind of theory is the theory of natural selection?"

import { arrow, cross, gearD, cladogram, funnelD, histogram, gauss, bird, rat, frog, thoughtBubble } from '../../engine/kit.js';
import { rng } from '../../engine/stage.js';

export const meta = { label: 'What Darwin Got Wrong · Front matter + Ch. 1', speed: 1.05 };

export const beats = [
  { id: 'title', text: "What Darwin Got Wrong, by Jerry Fodor and Massimo Piattelli-Palmarini. This is a guide to the book's opening: the Terms of Engagement, and Chapter One.", gap: 900 },

  { id: 'notabout', text: 'First, a disclaimer. This is not a book about God, intelligent design, or creationism.' },
  { id: 'atheists', text: 'Both are card-carrying atheists, who want a fully naturalistic, mechanical account of evolution.' },
  { id: 'target', text: 'Their target is narrower: the theory of natural selection, which they think is wrong, quite possibly fatally.', gap: 900 },

  { id: 'twoparts', text: 'Neo-Darwinism has two parts.' },
  { id: 'tree', text: 'One is the genealogy of species: the branching tree of descent that links living things to common ancestors.' },
  { id: 'engine', text: 'The other is natural selection: the mechanism that supposedly does the branching.' },
  { id: 'accept', text: 'The authors accept the tree, baboon cousins and all. What they reject is natural selection as the mechanism.', gap: 900 },

  { id: 'conf', text: 'Their central charge is that Darwinism slides between two different claims.' },
  { id: 'claim1', text: 'Claim one: creatures with adaptive traits are selected.' },
  { id: 'claim2', text: 'Claim two: creatures are selected *for* their adaptive traits.' },
  { id: 'fallacy', text: 'That inference, they argue, is invalid: an intensional fallacy, with no naturalistic repair available.' },
  { id: 'freeride', text: 'Here is why it matters. If a neutral trait is linked to a useful one, selection picks up both. So which one was it selected for?', gap: 900 },

  { id: 'twin', text: 'To make the case, they give Darwin an unexpected twin: B. F. Skinner, and his theory of learning by operant conditioning.' },
  { id: 'skbox', text: 'Skinner treated the organism as a black box. Behaviors that get reinforced grow stronger; the rest fade away.' },
  { id: 'samename', text: "The authors claim that Skinner's account of learning and Darwin's account of evolution are identical in all but name." },
  { id: 'why', text: "Since Chomsky's 1959 review, almost nobody believes Skinner. So, they ask: why does everybody still believe Darwin?", gap: 900 },

  { id: 'bb', text: 'Viewed from the outside, both theories are black boxes.' },
  { id: 'bbns', text: 'Natural selection takes the traits of one generation, plus its ecology, and outputs the traits of the next.' },
  { id: 'bbot', text: "Operant conditioning takes a creature's current habits, plus its history of reinforcement, and outputs its new habits." },
  { id: 'bbsame', text: 'Same shape: a population of traits, shifted over time by the environment.', gap: 900 },

  { id: 'six', text: 'The two boxes also share six built-in assumptions, which the authors call proprietary constraints.' },
  { id: 'c1', text: 'Iterativity: outputs feed back in, with no limit on what can evolve or be learned.' },
  { id: 'c2', text: 'Environmentalism: change is driven from outside, and internal constraints are mostly ignored.' },
  { id: 'c3', text: 'Gradualism: change comes in small steps. No great leaps, no sudden insights.' },
  { id: 'c4', text: "Monotonicity: pressure keeps pushing one way, so both can get stuck on a local peak. They satisfice; they don't optimize." },
  { id: 'c5', text: "Locality: only actual, nearby causes count. What might have happened, or what will happen next week, can't matter." },
  { id: 'c6', text: 'And mindlessness: no mental causes. Nobody intends anything.', gap: 900 },

  { id: 'crack', text: "That last one is where the analogy cracks." },
  { id: 'scrooge', text: "Scrooge can think, I'd be even richer if we didn't heat the office, and then turn down the thermostat." },
  { id: 'frog', text: "But evolution can't think, frogs would catch more flies with longer tongues, and then lengthen them." },
  { id: 'mindverdict', text: 'So Darwin was right that evolution is mindless. But Skinner was wrong: learning is not.', gap: 900 },

  { id: 'gt', text: 'Open the boxes, and both propose the same mechanism: generate and test. A random generator of variants, then a filter. And that is all.' },
  { id: 'gtot', text: 'For Skinner, the organism emits behaviors at random, and reinforcement filters them, by the law of effect.' },
  { id: 'gtns', text: 'For Darwin, random mutation generates heritable variation, and the environment filters it.', gap: 900 },

  { id: 'whatfilter', text: 'Which raises the crucial question: what is the filter?' },
  { id: 'skf', text: 'Skinner had an explicit answer: the laws of association.' },
  { id: 'dwf', text: 'Darwinism, the authors argue, has no comparable story about how selection filters phenotypes.' },
  { id: 'punch', text: "Hence the chapter's punchline: Skinner's theory is false, but Darwin's theory of selection is empty.", gap: 900 },

  { id: 'p1', text: 'Part One of the book surveys newer biology, like evo-devo, where internal constraints shape organisms, not just outside filters.' },
  { id: 'p2', text: 'Part Two takes on the problem of selection-for, and calls Mother Nature and selfish genes spooks haunting Darwinist explanation.' },
  { id: 'p3', text: 'Their boldest conclusion: there can be no general theory of evolution. The story belongs to natural history.', gap: 900 },

  { id: 'recap', text: 'To recap.' },
  { id: 'r1', text: 'Keep the tree of descent; doubt the engine.' },
  { id: 'r2', text: 'Natural selection and operant conditioning are the same kind of theory: random variation, plus an outside filter.' },
  { id: 'r3', text: "Skinner's filter was false. Darwin's, they claim, is empty, because nothing in selection settles what a trait was selected for.", gap: 600 },
];


export function build(S) {
  const { B, at } = S;

  // ── Title ────────────────────────────────────────────────────────────
  {
    const sc = S.scene(0, B('title').end + 450);
    S.fadeUp(S.el(sc, { cls: 'kicker', text: 'Reading guide', x: 160, y: 300 }), 300);
    S.fadeUp(S.el(sc, { cls: 'h0', html: 'What Darwin<br>Got Wrong', x: 160, y: 345 }), 450, 800);
    S.fadeUp(S.el(sc, { cls: 'body', text: 'Jerry Fodor & Massimo Piattelli-Palmarini · 2010', x: 162, y: 640 }), 1100);
    S.fadeUp(S.el(sc, { cls: 'body-s', html: 'Terms of Engagement  +  Ch. 1: <em>What kind of theory is the theory of natural selection?</em>', x: 162, y: 700, w: 900 }), 1500);
    const g = S.overlay(sc);
    const t = cladogram(S, g, 1230, 1730, 220, 700, [[['a', 'b'], 'c'], [['d', ['e', 'f']], ['g', 'h']]]);
    t.levels.forEach((lv, d) => S.draw(lv, 700 + d * 380, 600));
    t.tips.forEach((p, i) => { const c = S.shape(g, 'circle', { cx: p.x, cy: p.y, r: 10, class: 'fill-a2' }); S.fadeIn(c, 2300 + i * 60, 300); });
    const gear = S.path(g, gearD(t.root.x, 780, 62, 11), 'ink a1', { 'stroke-width': 5 });
    S.draw(gear, 2600, 1200);
    S.pop(S.el(sc, { cls: 'hand', text: '?', x: t.root.x + 90, y: 780, anchor: 'l', style: { fontSize: '96px' } }), 3600);
  }

  // ── Terms of engagement ──────────────────────────────────────────────
  {
    const sc = S.sceneFor('notabout', 'target', { title: 'Terms of engagement' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Terms of engagement', x: 160, y: 150 }), B('notabout').start - 200);
    S.fadeUp(S.el(sc, { cls: 'tag', text: 'This is NOT a book about…', x: 162, y: 275, style: { color: 'var(--muted)' } }), B('notabout').start + 600);
    const row = S.el(sc, { x: 160, y: 320, style: { display: 'flex', gap: '24px' } });
    ['God', 'Intelligent design', 'Creationism'].forEach((w, i) => {
      const p = document.createElement('div');
      p.className = 'pill h3';
      p.style.position = 'relative';
      row.appendChild(p);
      const span = document.createElement('span');
      span.className = 'strike';
      span.textContent = w;
      p.appendChild(span);
      S.pop(p, at('notabout', 0.45) + i * 350);
      S.strike(span, at('notabout', 0.8) + i * 200);
    });
    const c1 = S.el(sc, { cls: 'card', x: 160, y: 500, w: 770 });
    c1.innerHTML = '<div class="tag" style="color:var(--a2)">The authors</div><div class="h3" style="margin:14px 0 14px">Card-carrying atheists</div><div class="body" style="font-size:30px">Naturalistic, mechanical explanations only: no God, no final causes, no <em>élan vital</em>, no aliens.</div>';
    S.fadeUp(c1, B('atheists').start);
    const c2 = S.el(sc, { cls: 'card', x: 990, y: 500, w: 770, style: { borderColor: 'var(--a1)', boxShadow: '7px 7px 0 var(--a1)' } });
    c2.innerHTML = '<div class="tag" style="color:var(--a1)">The target</div><div class="h3" style="margin:14px 0 14px">The theory of natural selection</div><div class="body" style="font-size:30px">“Something wrong — quite possibly fatally wrong — with the theory of natural selection.”</div>';
    S.fadeUp(c2, B('target').start);
  }

  // ── Two parts ────────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('twoparts', 'accept', { title: 'Two parts of neo-Darwinism' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Neo-Darwinism has <span class="mark" id="two">two parts</span>', x: 160, y: 150 }), B('twoparts').start - 200);
    S.mark(sc.querySelector('#two'), at('twoparts', 0.5));
    const g = S.overlay(sc);
    // left: the tree of descent
    const t = cladogram(S, g, 260, 800, 300, 690, [[['a', 'b'], ['c', 'd']], [['e', ['f', 'g']], ['h', ['i', 'j']]]]);
    t.levels.forEach((lv, d) => S.draw(lv, B('tree').start + d * 330, 550));
    t.tips.forEach((p, i) => { const c = S.shape(g, 'circle', { cx: p.x, cy: p.y, r: 11, class: 'fill-a2' }); S.fadeIn(c, B('tree').start + 1700 + i * 50, 300); });
    S.fadeUp(S.el(sc, { x: 530, y: 720, anchor: 'tc', html: '<div class="h4">① Genealogy of species</div><div class="small" style="margin-top:6px">the tree of descent</div>', style: { textAlign: 'center' } }), at('tree', 0.3));
    // right: the engine
    const gr = S.group(g, 1360, 500);
    S.path(gr, gearD(1360, 500, 150, 12), 'ink a1', { 'stroke-width': 6 });
    S.draw(gr, B('engine').start, 1300);
    const gr2 = S.group(g, 1585, 345);
    S.path(gr2, gearD(1585, 345, 82, 8), 'ink a1', { 'stroke-width': 5 });
    S.draw(gr2, B('engine').start + 400, 1100);
    S.tw(gr, 'rotate', B('engine').start, B('accept').end - B('engine').start, '40deg', { from: '0deg', ease: 'linear' });
    S.tw(gr2, 'rotate', B('engine').start, B('accept').end - B('engine').start, '-72deg', { from: '0deg', ease: 'linear' });
    S.fadeUp(S.el(sc, { x: 1400, y: 720, anchor: 'tc', html: '<div class="h4">② Natural selection</div><div class="small" style="margin-top:6px">the proposed mechanism of branching</div>', style: { textAlign: 'center' } }), at('engine', 0.2));
    // verdicts
    S.pop(S.el(sc, { cls: 'pill tag', html: '✓ accepted', x: 530, y: 830, anchor: 'tc', style: { color: 'var(--good)', borderColor: 'var(--good)' } }), at('accept', 0.08));
    S.draw(cross(S, g, 1360, 500, 150), at('accept', 0.55), 350, { stagger: 150 });
    S.pop(S.el(sc, { cls: 'pill tag', html: '✗ rejected as the mechanism', x: 1400, y: 830, anchor: 'tc', style: { color: 'var(--bad)', borderColor: 'var(--bad)' } }), at('accept', 0.6));
  }

  // ── The central confusion ────────────────────────────────────────────
  {
    const sc = S.sceneFor('conf', 'freeride', { title: 'The central confusion' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Two claims that sound alike', x: 160, y: 150 }), B('conf').start - 200);
    const k1 = S.el(sc, { cls: 'card', x: 160, y: 265, w: 700, h: 220 });
    k1.innerHTML = '<div class="tag" style="color:var(--a2)">① Selection <em>of</em></div><div class="h3" style="margin-top:16px">Creatures <em>with</em> adaptive traits are selected.</div>';
    S.fadeUp(k1, B('claim1').start);
    const k2 = S.el(sc, { cls: 'card', x: 1060, y: 265, w: 700, h: 220 });
    k2.innerHTML = '<div class="tag" style="color:var(--a1)">② Selection <em>for</em></div><div class="h3" style="margin-top:16px">Creatures are selected <span class="mark" id="for">for</span> their adaptive traits.</div>';
    S.fadeUp(k2, B('claim2').start);
    S.mark(k2.querySelector('#for'), at('claim2', 0.55));
    const g = S.overlay(sc);
    S.draw(arrow(S, g, 880, 375, 1040, 375, 'ink', 22), B('fallacy').start, 500);
    S.fadeUp(S.el(sc, { cls: 'hand-s', text: 'infer?', x: 960, y: 305, anchor: 'tc', style: { color: 'var(--ink)' } }), B('fallacy').start + 200);
    S.draw(cross(S, g, 960, 375, 70), at('fallacy', 0.3), 300, { stagger: 120 });
    S.stamp(S.el(sc, { cls: 'stampbox', text: 'Intensional fallacy', x: 960, y: 500, anchor: 'tc', style: { color: 'var(--bad)', fontSize: '40px' } }), at('fallacy', 0.4));

    // free-riders
    const fy = 795;
    S.fadeUp(S.el(sc, { cls: 'tag', text: 'Why it matters: free-riders', x: 162, y: 668, style: { color: 'var(--muted)' } }), B('freeride').start);
    const g2 = S.overlay(sc);
    const crit = S.group(g2, 260, fy);
    bird(S, crit, 255, fy + 5, 62);
    S.fadeIn(crit, B('freeride').start + 100, 400);
    S.fadeLeft(S.el(sc, { cls: 'pill body-s', html: '<b style="color:var(--good)">A</b> · useful trait', x: 430, y: fy - 72 }), B('freeride').start + 300);
    S.fadeLeft(S.el(sc, { cls: 'pill body-s', html: '<b style="color:var(--muted)">B</b> · neutral free-rider', x: 430, y: fy + 18, style: { color: 'var(--muted)', borderStyle: 'dashed' } }), B('freeride').start + 700);
    S.draw(S.path(g2, `M418,${fy - 30} C392,${fy} 392,${fy + 22} 418,${fy + 52}`, 'ink thin'), B('freeride').start + 1000, 400);
    S.fadeIn(S.el(sc, { cls: 'hand-s', text: 'linked', x: 330, y: fy + 70, style: { fontSize: '30px', color: 'var(--muted)' } }), B('freeride').start + 1100);
    S.fadeUp(S.el(sc, { cls: 'box-black', x: 960, y: fy - 60, w: 260, h: 120, text: 'selection' }), at('freeride', 0.3));
    S.draw(arrow(S, g2, 790, fy, 945, fy), at('freeride', 0.33), 400);
    S.draw(arrow(S, g2, 1235, fy, 1380, fy), at('freeride', 0.45), 400);
    S.fadeLeft(S.el(sc, { cls: 'pill body-s', html: '<b style="color:var(--good)">A</b> + <b style="color:var(--muted)">B</b> both pass', x: 1400, y: fy - 70 }), at('freeride', 0.5));
    S.fadeUp(S.el(sc, { cls: 'hand', text: 'selected FOR which one?', x: 1400, y: fy + 10 }), at('freeride', 0.72));
  }

  // ── Skinner, the twin ────────────────────────────────────────────────
  {
    const sc = S.sceneFor('twin', 'why', { title: 'Darwin’s twin' });
    const g = S.overlay(sc);
    const L = 430, R = 1480;
    S.draw(bird(S, g, L, 400, 120), B('twin').start, 1000, { stagger: 80 });
    S.fadeUp(S.el(sc, { x: L, y: 560, anchor: 'tc', html: '<div class="h3">Darwin</div><div class="small" style="margin-top:4px">natural selection · evolution</div>', style: { textAlign: 'center' } }), B('twin').start + 300);
    const box = S.path(g, `M${R - 200},250 L${R + 200},250 L${R + 200},520 L${R - 200},520 Z`, 'ink');
    const lever = S.path(g, `M${R + 200},440 L${R + 150},440 L${R + 135},420`, 'ink a2');
    const bulb = S.shape(g, 'circle', { cx: R + 160, cy: 300, r: 18, class: 'ink a3' });
    S.draw([box, lever, bulb], at('twin', 0.35), 800, { stagger: 150 });
    S.draw(rat(S, g, R - 30, 470, 80), at('twin', 0.5), 800, { stagger: 60 });
    S.fadeUp(S.el(sc, { x: R, y: 560, anchor: 'tc', html: '<div class="h3">Skinner</div><div class="small" style="margin-top:4px">operant conditioning · learning</div>', style: { textAlign: 'center' } }), at('twin', 0.55));
    // the organism as a black box
    S.fadeIn(S.el(sc, { cls: 'box-black', x: R - 205, y: 245, w: 410, h: 280, html: 'black box' }), B('skbox').start + 200, 500);
    const g2 = S.overlay(sc);
    S.draw(arrow(S, g2, R - 330, 385, R - 220, 385), B('skbox').start + 600, 400);
    S.draw(arrow(S, g2, R + 220, 385, R + 330, 385), B('skbox').start + 900, 400);
    S.fadeIn(S.el(sc, { cls: 'small', text: 'stimulus', x: R - 275, y: 340, anchor: 'tc' }), B('skbox').start + 600);
    S.fadeIn(S.el(sc, { cls: 'small', text: 'response', x: R + 275, y: 340, anchor: 'tc' }), B('skbox').start + 900);
    S.fadeUp(S.el(sc, { cls: 'hand-s', text: 'reinforced habits strengthen', x: R, y: 640, anchor: 'tc', style: { color: 'var(--a2)' } }), at('skbox', 0.55));
    // the equation
    S.pop(S.el(sc, { cls: 'h0', text: '=', x: 900, y: 385, anchor: 'c', style: { color: 'var(--a1)' } }), B('samename').start + 200);
    S.fadeUp(S.el(sc, { cls: 'hand', text: 'identical in all but name', x: 900, y: 220, anchor: 'tc' }), at('samename', 0.45));
    // the question
    const qc = S.el(sc, { cls: 'card', x: 960, y: 715, w: 1400, anchor: 'tc', style: { textAlign: 'center' } });
    qc.innerHTML = '<div class="quote" style="font-size:40px">“If nobody believes Skinner anymore, why does everybody still believe Darwin?”</div>';
    S.fadeUp(qc, at('why', 0.38));
    S.stamp(S.el(sc, { cls: 'stampbox', text: 'abandoned · Chomsky 1959', x: R, y: 385, anchor: 'c', style: { color: 'var(--bad)', fontSize: '30px', background: 'rgba(244,239,230,.94)' } }), B('why').start + 300);
  }

  // ── Black boxes ──────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('bb', 'bbsame', { title: 'Viewed from outside' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Two black boxes', x: 160, y: 150 }), B('bb').start - 200);
    const g = S.overlay(sc);
    const row = (y, id, name, inLbl, outLbl, envLbl, color, mu0, mu1) => {
      const t0 = B(id).start;
      S.fadeIn(S.el(sc, { cls: 'tag', text: name, x: 160, y: y - 52, style: { color } }), t0);
      const hIn = histogram(S, sc, 160, y, 300, 170, gauss(7, mu0, 1.3), color);
      S.fadeIn(hIn.base, t0 + 150, 300);
      hIn.forEach((b, i) => S.tw(b, 'scale', t0 + 200 + i * 50, 450, `1 ${b.dataset.v}`, { from: '1 0', ease: 'out' }));
      S.fadeIn(S.el(sc, { cls: 'small', text: inLbl, x: 310, y: y + 185, anchor: 'tc' }), t0 + 400);
      S.draw(arrow(S, g, 500, y + 90, 640, y + 90), t0 + 700, 400);
      const box = S.el(sc, { cls: 'box-black', x: 660, y, w: 520, h: 180, text: name.split(' · ')[0] });
      S.fadeUp(box, t0 + 900);
      S.draw(arrow(S, g, 920, y - 90, 920, y - 10, 'ink thin'), t0 + 1300, 400);
      S.fadeIn(S.el(sc, { cls: 'hand-s', text: envLbl, x: 940, y: y - 100, style: { color } }), t0 + 1300);
      S.draw(arrow(S, g, 1200, y + 90, 1340, y + 90), at(id, 0.6), 400);
      const hOut = histogram(S, sc, 1370, y, 300, 170, gauss(7, mu1, 1.3), color);
      S.fadeIn(hOut.base, at(id, 0.62), 300);
      hOut.forEach((b, i) => S.tw(b, 'scale', at(id, 0.65) + i * 50, 600, `1 ${b.dataset.v}`, { from: '1 0', ease: 'out' }));
      S.fadeIn(S.el(sc, { cls: 'small', text: outLbl, x: 1520, y: y + 185, anchor: 'tc' }), at(id, 0.7));
      return box;
    };
    const b1 = row(360, 'bbns', 'Natural selection · Darwin', 'traits, generation N', 'traits, generation N+1', 'ecology', 'var(--a1)', 2, 4);
    const b2 = row(680, 'bbot', 'Operant conditioning · Skinner', 'habits at time t', 'habits at time t+1', 'history of reinforcement', 'var(--a2)', 2.5, 4.3);
    S.fadeUp(S.el(sc, { cls: 'hand', text: '“population thinking”', x: 1760, y: 165, anchor: 'tr' }), B('bbsame').start + 200);
    [b1, b2].forEach((b) => S.tw(b, 'box-shadow', B('bbsame').start + 300, 400, '0px 0px 0px 10px rgba(226,169,59,1)', { from: '0px 0px 0px 0px rgba(226,169,59,0)' }));
  }

  // ── Six proprietary constraints ──────────────────────────────────────
  {
    const sc = S.sceneFor('six', 'c6', { title: 'Six shared assumptions' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Six shared <em>proprietary constraints</em>', x: 160, y: 120 }), B('six').start - 200);
    const items = [
      ['c1', 'Iterativity', 'Outputs feed back in. No limit on what can evolve or be learned.'],
      ['c2', 'Environmentalism', 'Change driven from outside; internal constraints ignored.'],
      ['c3', 'Gradualism', 'Small steps only. No saltations, no sudden insights.'],
      ['c4', 'Monotonicity', 'Pushes one way, so stuck on local peaks. Satisfices, doesn’t optimize.'],
      ['c5', 'Locality', 'Only actual, present, nearby causes. Not what might have been.'],
      ['c6', 'Mindlessness', 'No mental causation. Nobody intends anything.'],
    ];
    const pos = (i) => ({ x: 160 + (i % 3) * 545, y: 235 + Math.floor(i / 3) * 335 });
    items.forEach(([id, name, gloss], i) => {
      const { x, y } = pos(i);
      const c = S.el(sc, { cls: 'card soft', x, y, w: 505, h: 300, style: { padding: '24px 28px' } });
      c.innerHTML = `<div style="display:flex;align-items:center;gap:16px"><div class="num" style="width:52px;height:52px;font-size:26px">${i + 1}</div><div class="h4">${name}</div></div><div class="body-s" style="margin-top:16px;width:290px;font-size:26px">${gloss}</div>`;
      S.fadeUp(c, B(id).start);
      S.tw(c, 'border-color', B(id).start, 300, '#c4572f', { from: '#1f2328' });
      S.tw(c, 'border-color', B(id).end + 200, 400, '#1f2328');
    });
    const g = S.overlay(sc);
    items.forEach(([id], i) => {
      const { x, y } = pos(i);
      const ix = x + 405, iy = y + 185, t = B(id).start + 400;
      let parts = [], fills = [];
      if (i === 0) parts = [S.path(g, `M${ix + 50},${iy} A50,50 0 1 1 ${ix + 35},${iy - 35}`, 'ink a1'), arrow(S, g, ix + 22, iy - 50, ix + 38, iy - 33, 'ink a1', 16)[1]];
      if (i === 1) {
        fills = [S.shape(g, 'circle', { cx: ix, cy: iy, r: 24, class: 'fill-ink' })];
        parts = [0, 1, 2, 3].flatMap((k) => { const a = k * Math.PI / 2 + 0.6; return arrow(S, g, ix + 78 * Math.cos(a), iy + 78 * Math.sin(a), ix + 36 * Math.cos(a), iy + 36 * Math.sin(a), 'ink a1', 13); });
      }
      if (i === 2) parts = [S.path(g, `M${ix - 75},${iy + 55} h30 v-22 h30 v-22 h30 v-22 h30 v-22 h30`, 'ink a1')];
      if (i === 3) {
        parts = [S.path(g, `M${ix - 85},${iy + 55} C${ix - 60},${iy - 5} ${ix - 30},${iy - 5} ${ix - 10},${iy + 25} C${ix + 15},${iy - 75} ${ix + 55},${iy - 75} ${ix + 85},${iy + 55}`, 'ink')];
        fills = [S.shape(g, 'circle', { cx: ix - 42, cy: iy - 2, r: 12, class: 'fill-a1' })];
      }
      if (i === 4) {
        parts = [S.shape(g, 'circle', { cx: ix, cy: iy, r: 62, class: 'ink a1 thin' })];
        fills = [S.shape(g, 'circle', { cx: ix, cy: iy, r: 11, class: 'fill-ink' })];
      }
      if (i === 5) parts = [...thoughtBubble(S, g, ix - 62, iy - 62, 115, 78, ix - 72, iy + 52, 'ink thin'), S.path(g, `M${ix - 80},${iy + 30} L${ix + 68},${iy - 78}`, 'ink bad')];
      S.draw(parts, t, 700);
      fills.forEach((f) => S.fadeIn(f, t + 400, 300));
    });
  }

  // ── Where the analogy cracks: minds ──────────────────────────────────
  {
    const sc = S.sceneFor('crack', 'mindverdict', { title: 'Where the analogy cracks' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Minds can use what might be', x: 160, y: 150 }), B('crack').start - 200);
    const g = S.overlay(sc);
    const L = 560;
    const scrooge = [S.shape(g, 'circle', { cx: L - 175, cy: 600, r: 60, class: 'ink' }),
      S.path(g, `M${L - 250},540 L${L - 100},540 M${L - 222},540 L${L - 222},455 L${L - 128},455 L${L - 128},540`, 'ink'),
      S.path(g, `M${L - 270},745 C${L - 260},675 ${L - 90},675 ${L - 80},745`, 'ink')];
    S.draw(scrooge, B('scrooge').start, 700, { stagger: 100 });
    S.draw(thoughtBubble(S, g, L - 140, 250, 560, 170, L - 165, 520, 'ink'), B('scrooge').start + 300, 700);
    S.fadeIn(S.el(sc, { cls: 'quote', html: '“I’d be even richer if we didn’t heat the office.”', x: L - 105, y: 282, w: 500, style: { fontSize: '36px' } }), B('scrooge').start + 700);
    const dial = S.group(g, L + 200, 610);
    S.shape(dial, 'circle', { cx: L + 200, cy: 610, r: 64, class: 'ink' });
    S.path(dial, `M${L + 200},610 L${L + 200},560`, 'ink a1', { 'stroke-width': 7 });
    S.fadeIn(dial, at('scrooge', 0.6));
    S.tw(dial, 'rotate', at('scrooge', 0.7), 800, '-70deg', { from: '50deg' });
    S.fadeIn(S.el(sc, { cls: 'small', text: 'thermostat ↓', x: L + 200, y: 690, anchor: 'tc' }), at('scrooge', 0.7));
    const R = 1380;
    S.draw(frog(S, g, R - 150, 650, 100), B('frog').start, 800, { stagger: 60 });
    S.draw(thoughtBubble(S, g, R - 100, 250, 540, 170, R - 160, 520, 'ink mutedk'), B('frog').start + 300, 700);
    S.fadeIn(S.el(sc, { cls: 'quote', html: '“Frogs would catch more flies with longer tongues.”', x: R - 65, y: 282, w: 480, style: { fontSize: '36px', color: 'var(--muted)' } }), B('frog').start + 700);
    S.draw(cross(S, g, R + 170, 335, 170), at('frog', 0.55), 300, { stagger: 120 });
    S.fadeIn(S.el(sc, { cls: 'hand-s', text: 'evolution can’t do this', x: R + 230, y: 560, anchor: 'tc', style: { color: 'var(--bad)' } }), at('frog', 0.6));
    S.fadeUp(S.el(sc, { cls: 'card soft', x: 160, y: 795, w: 770, html: '<span class="h4">Evolution is mindless</span>  <span class="body-s" style="color:var(--good)"> → Darwin was right</span>' }), B('mindverdict').start);
    S.fadeUp(S.el(sc, { cls: 'card soft', x: 990, y: 795, w: 770, html: '<span class="h4">Learning is mindless</span>  <span class="body-s" style="color:var(--bad)"> → Skinner was wrong</span>' }), at('mindverdict', 0.45));
  }
  // ── Generate and test ────────────────────────────────────────────────
  {
    const sc = S.sceneFor('gt', 'gtns', { title: 'Inside the boxes' });
    S.fadeUp(S.el(sc, { cls: 'h2', html: 'Inside both boxes: <em>generate and test</em>', x: 160, y: 140 }), B('gt').start - 200);
    S.fadeUp(S.el(sc, { cls: 'tag', text: 'Generate', x: 310, y: 260, anchor: 'tc' }), at('gt', 0.25));
    S.fadeUp(S.el(sc, { cls: 'tag', text: 'Test (filter)', x: 1060, y: 260, anchor: 'tc' }), at('gt', 0.4));
    S.fadeUp(S.el(sc, { cls: 'hand', text: '…and that is all.', x: 1810, y: 250, anchor: 'tr' }), at('gt', 0.82));
    const g = S.overlay(sc);
    const lanes = [
      { y: 440, id: 'gtot', color: '#2b7a87', gen: 'random behaviors', filt: 'reinforcement', who: 'Skinner', seed: 4 },
      { y: 720, id: 'gtns', color: '#c4572f', gen: 'random mutations', filt: 'environment', who: 'Darwin', seed: 9 },
    ];
    lanes.forEach((ln) => {
      // both lanes start during the general "generate and test" line, then each is highlighted in turn
      const t0 = at('gt', ln.id === 'gtot' ? 0.3 : 0.45);
      const gen = S.el(sc, { cls: 'box-black', x: 160, y: ln.y - 80, w: 300, h: 160, html: `<div><div class="tag" style="color:${ln.color};font-size:17px">${ln.who}</div><div style="margin-top:8px;font-size:27px">${ln.gen}</div></div>` });
      S.fadeUp(gen, t0);
      S.tw(gen, 'box-shadow', B(ln.id).start, 300, '0px 0px 0px 9px rgba(226,169,59,1)', { from: '0px 0px 0px 0px rgba(226,169,59,0)' });
      S.tw(gen, 'box-shadow', B(ln.id).end + 150, 300, '0px 0px 0px 0px rgba(226,169,59,0)');
      const sieve = S.path(g, `M1060,${ln.y - 110} L1060,${ln.y + 110}`, 'ink dash', { 'stroke-width': 8, style: `stroke:${ln.color}` });
      S.draw(sieve, t0 + 300, 500);
      S.fadeIn(S.el(sc, { cls: 'hand-s', text: ln.filt, x: 1080, y: ln.y + 95, style: { color: ln.color } }), t0 + 500);
      // particles: generated at random sizes; about half pass the filter
      const r = rng(ln.seed);
      const N = 34, life = 4200, spacing = 230;
      const ps = Array.from({ length: N }, (_, i) => ({
        c: S.shape(g, 'circle', { cx: 0, cy: 0, r: 6 + r() * 10, style: `fill:${ln.color}` }),
        dy: (r() - 0.5) * 120, pass: r() < 0.45, k: i,
      }));
      const start = t0 + 400, stop = B('gtns').end + 400;
      S.every((t) => {
        for (const p of ps) {
          const local = t - start - p.k * spacing;
          const cyc = ((local % (N * spacing)) + N * spacing) % (N * spacing);
          const u = cyc / life;
          if (local < 0 || u > 1 || t > stop) { p.c.style.opacity = 0; continue; }
          let x = 470 + u * 1300, y = ln.y + p.dy * Math.min(1, u * 4), op = 1;
          if (!p.pass && x > 1045) {
            const fall = (x - 1045) / 160;
            x = 1045 - fall * 30; y += fall * fall * 120; op = Math.max(0, 1 - fall);
          }
          p.c.setAttribute('cx', x.toFixed(1));
          p.c.setAttribute('cy', y.toFixed(1));
          p.c.style.opacity = op * (p.pass || x < 1045 ? 0.9 : 0.6);
        }
      });
    });
  }

  // ── What is the filter? ──────────────────────────────────────────────
  {
    const sc = S.sceneFor('whatfilter', 'punch', { title: 'The crucial question' });
    S.fadeUp(S.el(sc, { cls: 'h1', text: 'What is the filter?', x: 960, y: 150, anchor: 'tc' }), B('whatfilter').start);
    const g = S.overlay(sc);
    const L = 560, R = 1360;
    S.draw(S.path(g, funnelD(L, 340, 420, 380), 'ink a2', { 'stroke-width': 6 }), B('skf').start, 800);
    const lf = S.el(sc, { cls: 'h4', html: 'laws of<br>association', x: L, y: 362, anchor: 'tc', style: { textAlign: 'center', color: 'var(--a2)' } });
    S.fadeIn(lf, at('skf', 0.4));
    S.fadeUp(S.el(sc, { cls: 'h3', text: 'Skinner', x: L, y: 760, anchor: 'tc' }), B('skf').start);
    S.draw(S.path(g, funnelD(R, 340, 420, 380), 'ink a1 dash', { 'stroke-width': 6 }), B('dwf').start, 800);
    const qm = S.el(sc, { cls: 'h1', text: '?', x: R, y: 400, anchor: 'tc', style: { color: 'var(--a1)' } });
    S.pop(qm, at('dwf', 0.5));
    S.fadeUp(S.el(sc, { cls: 'h3', text: 'Darwin', x: R, y: 760, anchor: 'tc' }), B('dwf').start);
    const s1 = S.el(sc, { cls: 'stampbox', text: 'False', x: L, y: 560, anchor: 'c', style: { color: 'var(--bad)', background: 'rgba(244,239,230,.9)' } });
    const s2 = S.el(sc, { cls: 'stampbox', text: 'Empty', x: R, y: 560, anchor: 'c', style: { color: 'var(--bad)', background: 'rgba(244,239,230,.9)' } });
    S.stamp(s1, at('punch', 0.28));
    S.stamp(s2, at('punch', 0.55));
    S.fadeUp(S.el(sc, { cls: 'hand-s', text: '→ argued in Part Two', x: 1810, y: 840, anchor: 'tr' }), at('punch', 0.85));
  }

  // ── Roadmap ──────────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('p1', 'p3', { title: 'Where the book goes' });
    S.fadeUp(S.el(sc, { cls: 'h2', text: 'Where the book goes next', x: 160, y: 150 }), B('p1').start - 200);
    const rows = [
      ['p1', 'Part One · The biological argument', 'Evo-devo, gene networks, “laws of form”: <b>internal</b> constraints shape organisms, not just outside filtering.', 'var(--a2)'],
      ['p2', 'Part Two · The conceptual situation', 'The problem of <em>selection-for</em>. Mother Nature, selfish genes, memes: “spooks” haunting Darwinist explanation.', 'var(--a1)'],
      ['p3', 'Chapter 9 · Summary', 'No single mechanism, so “there can be no general theory of evolution.” The story belongs to <b>natural history</b>.', 'var(--a4)'],
    ];
    rows.forEach(([id, h, body, c], i) => {
      const card = S.el(sc, { cls: 'card soft', x: 160, y: 270 + i * 215, w: 1600, style: { borderLeft: `14px solid ${c}` } });
      card.innerHTML = `<div class="h3" style="color:${c}">${h}</div><div class="body" style="margin-top:10px;font-size:31px">${body}</div>`;
      S.fadeLeft(card, B(id).start);
    });
  }

  // ── Recap ────────────────────────────────────────────────────────────
  {
    const sc = S.sceneFor('recap', 'r3', { title: 'Recap', post: 2000 });
    S.fadeUp(S.el(sc, { cls: 'h1', text: 'Recap', x: 160, y: 150 }), B('recap').start);
    const pts = [
      ['r1', 'Keep the <b>tree of descent</b>; doubt the <b>engine</b> (natural selection).'],
      ['r2', 'NS and operant conditioning are the <b>same kind of theory</b>: random variation + an external filter.'],
      ['r3', 'Skinner’s filter is <b>false</b>. Darwin’s is <b>empty</b>: nothing in selection settles what a trait was selected <em>for</em>.'],
    ];
    pts.forEach(([id, txt], i) => {
      const n = S.el(sc, { cls: 'num', text: String(i + 1), x: 160, y: 320 + i * 180 });
      const t = S.el(sc, { cls: 'body', html: txt, x: 260, y: 318 + i * 180, w: 1460, style: { fontSize: '38px' } });
      S.pop(n, B(id).start);
      S.fadeLeft(t, B(id).start + 150);
    });
  }
}
