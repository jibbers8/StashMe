#!/usr/bin/env node
// Renders a video frame-by-frame with headless Chromium and pipes frames to ffmpeg.
//
//   node engine/render.mjs <video-id>                 full MP4 -> out/<video-id>.mp4
//   node engine/render.mjs <video-id> --stills        one PNG at the end of every beat
//   node engine/render.mjs <video-id> --stills --draft  same, with estimated timings
//   options: --fps 30  --workers 3  --at 1200,5300 (stills at given ms)

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const vid = args[0];
const flag = (name) => args.includes(`--${name}`);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : def; };
const FPS = Number(opt('fps', 30));
const WORKERS = Number(opt('workers', 3));

async function loadPlaywright() {
  try { return await import('playwright'); } catch {
    const req = createRequire(import.meta.url);
    return req(path.join(execSync('npm root -g').toString().trim(), 'playwright'));
  }
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png' };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

async function openPage(browser, port) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error('[page error]', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.error('[console]', m.text()); });
  const draft = flag('draft') ? '&draft=1' : '';
  await page.goto(`http://127.0.0.1:${port}/engine/player.html?v=${vid}${draft}`);
  await page.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
  return page;
}

function ffmpeg(argv) {
  const p = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...argv], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => p.on('close', (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exited ${c}`)))));
  return { stdin: p.stdin, done };
}

const write = (stream, buf) => new Promise((res) => (stream.write(buf) ? res() : stream.once('drain', res)));

async function main() {
  const { chromium } = await loadPlaywright();
  const server = await serve();
  const port = server.address().port;
  const browser = await chromium.launch();
  const build = path.join(ROOT, 'build', vid);
  fs.mkdirSync(build, { recursive: true });

  try {
    if (flag('stills')) {
      const page = await openPage(browser, port);
      const dir = path.join(build, 'stills');
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
      let times;
      if (opt('at')) times = opt('at').split(',').map((s) => ({ t: Number(s), name: s }));
      else times = (await page.evaluate(() => window.beatsAt)).map((b, i) => ({ t: b.end - 50, name: `${String(i).padStart(2, '0')}-${b.id}` }));
      for (const { t, name } of times) {
        await page.evaluate((tt) => window.seek(tt), t);
        await page.screenshot({ path: path.join(dir, `${name}.png`) });
      }
      console.log(`wrote ${times.length} stills to ${dir}`);
      return;
    }

    const probe = await openPage(browser, port);
    const duration = await probe.evaluate(() => window.duration);
    await probe.close();
    const frames = Math.ceil((duration / 1000) * FPS);
    const per = Math.ceil(frames / WORKERS);
    const started = Date.now();
    let doneFrames = 0;

    const parts = await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
      const f0 = w * per, f1 = Math.min(frames, f0 + per);
      const file = path.join(build, `part${w}.mp4`);
      const page = await openPage(browser, port);
      // Raw CDP JPEG capture is ~10x faster than Playwright's PNG screenshots.
      const cdp = await page.context().newCDPSession(page);
      const ff = ffmpeg(['-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
        '-c:v', 'libx264', '-preset', 'medium', '-tune', 'animation', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), file]);
      for (let f = f0; f < f1; f++) {
        await page.evaluate((t) => window.seek(t), (f * 1000) / FPS);
        const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 94, optimizeForSpeed: true });
        await write(ff.stdin, Buffer.from(data, 'base64'));
        if (++doneFrames % 300 === 0) {
          const rate = doneFrames / ((Date.now() - started) / 1000);
          console.log(`${vid}: ${doneFrames}/${frames} frames (${rate.toFixed(1)} fps, ~${Math.round((frames - doneFrames) / rate)}s left)`);
        }
      }
      ff.stdin.end();
      await ff.done;
      await page.close();
      return file;
    }));

    const list = path.join(build, 'parts.txt');
    fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join('\n'));
    fs.mkdirSync(path.join(ROOT, 'out'), { recursive: true });
    const out = path.join(ROOT, 'out', `${vid}.mp4`);
    const mux = ffmpeg(['-f', 'concat', '-safe', '0', '-i', list, '-i', path.join(build, 'narration.wav'),
      '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-shortest', out]);
    mux.stdin.end();
    await mux.done;
    parts.forEach((p) => fs.rmSync(p));
    console.log(`wrote ${out} in ${Math.round((Date.now() - started) / 1000)}s`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
