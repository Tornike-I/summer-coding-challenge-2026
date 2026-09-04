// Automated contest checks for one generated run.
//   node tools/validate.js <runDir> [--out eval.json]
// Writes <runDir>/shots/*.png and prints a JSON report.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const runDir = path.resolve(process.argv[2]);
const R = { runDir, checks: {}, notes: [] };
const ok = (name, pass, detail) => { R.checks[name] = { pass: !!pass, detail: detail === undefined ? null : detail }; };

// ---------- static checks ----------
const entries = fs.existsSync(runDir) ? fs.readdirSync(runDir).filter(f => f !== 'shots') : [];
ok('single_file', entries.length === 1 && entries[0] === 'index.html', entries);

const file = path.join(runDir, 'index.html');
if (!fs.existsSync(file)) {
  ok('exists', false);
  console.log(JSON.stringify(R, null, 2));
  process.exit(0);
}
ok('exists', true);
const src = fs.readFileSync(file, 'utf8');
R.bytes = Buffer.byteLength(src);
R.lines = src.split('\n').length;

const remote = [...src.matchAll(/https?:\/\/[^\s"'`)<>]+/gi)].map(m => m[0])
  .filter(u => !/^https?:\/\/(www\.)?w3\.org/i.test(u));   // XML namespaces are not network fetches
ok('no_remote_urls', remote.length === 0, remote.slice(0, 8));
ok('no_module_script', !/<script[^>]*type\s*=\s*["']module["']/i.test(src));
ok('no_fetch_xhr_ws', !/\b(fetch\s*\(|XMLHttpRequest|new\s+WebSocket|EventSource)\b/.test(src));
ok('no_import', !/^\s*import\s.+from\s/m.test(src) && !/\bimport\s*\(/.test(src));
ok('no_external_link_tag', !/<link[^>]+href\s*=\s*["'](?!#|data:)[^"']*\/\//i.test(src));
const b64 = [...src.matchAll(/[A-Za-z0-9+/]{300,}={0,2}/g)];
ok('no_encoded_asset_blob', b64.length === 0, b64.length);
ok('has_reduced_motion', /prefers-reduced-motion/.test(src));
ok('has_aria_live', /aria-live/.test(src));
ok('storage_guarded', !/localStorage/.test(src) || /try\s*{[^}]*localStorage/s.test(src) || /catch/.test(src));
ok('has_viewport_meta', /<meta[^>]+name\s*=\s*["']viewport["']/i.test(src));
ok('has_lang', /<html[^>]+lang=/i.test(src));
R.buttonCount = (src.match(/<button/gi) || []).length;

// ---------- runtime checks ----------
(async () => {
  const shots = path.join(runDir, 'shots');
  fs.mkdirSync(shots, { recursive: true });
  const url = 'file:///' + file.replace(/\\/g, '/');
  const browser = await chromium.launch();

  async function session({ storageBroken = false, reducedMotion = 'no-preference' } = {}) {
    const ctx = await browser.newContext({ reducedMotion });
    const page = await ctx.newPage();
    const errs = [], warns = [], crashes = [];
    page.on('console', m => {
      if (m.type() === 'error') errs.push(m.text());
      if (m.type() === 'warning') warns.push(m.text());
    });
    page.on('pageerror', e => crashes.push(String(e && e.message || e)));
    if (storageBroken) {
      await page.addInitScript(() => {
        const boom = () => { throw new DOMException('denied', 'SecurityError'); };
        try {
          Object.defineProperty(window, 'localStorage', { get: boom, configurable: true });
          Object.defineProperty(window, 'sessionStorage', { get: boom, configurable: true });
        } catch (e) { /* some engines refuse the redefinition; the check still loads the page */ }
      });
    }
    return { ctx, page, errs, warns, crashes };
  }

  // --- main pass ---
  const s = await session();
  await s.page.goto(url, { waitUntil: 'load' });
  await s.page.waitForTimeout(1200);

  const overflow = async (w, h, tag) => {
    await s.page.setViewportSize({ width: w, height: h });
    await s.page.waitForTimeout(500);
    const m = await s.page.evaluate(() => {
      const d = document.documentElement;
      return { sw: d.scrollWidth, cw: d.clientWidth, sh: d.scrollHeight, ch: d.clientHeight };
    });
    await s.page.screenshot({ path: path.join(shots, tag + '.png'), fullPage: false });
    return m;
  };

  const mob = await overflow(375, 667, 'mobile');
  ok('no_hscroll_375', mob.sw <= mob.cw + 1, mob);
  const desk = await overflow(1440, 900, 'desktop');
  ok('no_hscroll_1440', desk.sw <= desk.cw + 1, desk);
  const narrow = await overflow(320, 640, 'narrow320');
  ok('no_hscroll_320', narrow.sw <= narrow.cw + 1, narrow);

  await s.page.setViewportSize({ width: 1440, height: 900 });
  await s.page.waitForTimeout(300);

  // visible-content sanity: the page must render something
  const painted = await s.page.evaluate(() => {
    const t = (document.body.innerText || '').trim();
    return { textLen: t.length, hasNaN: /\bNaN\b/.test(t), hasUndef: /\bundefined\b/.test(t), sample: t.slice(0, 400) };
  });
  ok('renders_content', painted.textLen > 20, painted.textLen);
  ok('no_nan_on_screen', !painted.hasNaN);
  ok('no_undefined_on_screen', !painted.hasUndef);
  R.firstScreenText = painted.sample;

  // interaction smoke test: click through, then hammer keys
  const before = await s.page.evaluate(() => document.body.innerHTML.length + '|' + (document.body.innerText || '').slice(0, 200));
  let clicked = 0;
  for (let i = 0; i < 3; i++) {
    const btns = await s.page.$$('button:visible, [role=button]:visible');
    if (!btns.length) break;
    try { await btns[0].click({ timeout: 2000 }); clicked++; await s.page.waitForTimeout(600); } catch (e) { break; }
  }
  for (const k of ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Space', 'Enter', 'Escape']) {
    try { await s.page.keyboard.press(k); await s.page.waitForTimeout(180); } catch (e) { /* key rejected by the page */ }
  }
  await s.page.waitForTimeout(600);
  const after = await s.page.evaluate(() => document.body.innerHTML.length + '|' + (document.body.innerText || '').slice(0, 200));
  ok('interaction_changes_state', before !== after, { clicked });
  await s.page.screenshot({ path: path.join(shots, 'after-interaction.png') });

  // random fuzz: click 12 random visible elements, look for a crash
  await s.page.evaluate(() => {
    const els = [...document.querySelectorAll('button, [role=button], .cell, td, li')].filter(e => e.offsetParent);
    for (let i = 0; i < 40 && els.length; i++) els[Math.floor(Math.random() * els.length)].click();
  }).catch(() => R.notes.push('fuzz click pass threw'));
  await s.page.waitForTimeout(800);
  await s.page.screenshot({ path: path.join(shots, 'after-fuzz.png') });

  ok('no_console_errors', s.errs.length === 0, s.errs.slice(0, 6));
  ok('no_uncaught_exceptions', s.crashes.length === 0, s.crashes.slice(0, 6));
  ok('no_console_warnings', s.warns.length === 0, s.warns.slice(0, 6));
  await s.ctx.close();

  // --- storage-hostile pass ---
  const h = await session({ storageBroken: true });
  await h.page.goto(url, { waitUntil: 'load' });
  await h.page.waitForTimeout(1000);
  const hBtns = await h.page.$$('button:visible');
  if (hBtns.length) { try { await hBtns[0].click({ timeout: 2000 }); } catch (e) { /* nothing clickable yet */ } }
  await h.page.waitForTimeout(800);
  const hPaint = await h.page.evaluate(() => (document.body.innerText || '').trim().length);
  ok('survives_storage_failure', h.crashes.length === 0 && hPaint > 20, { crashes: h.crashes.slice(0, 4), textLen: hPaint });
  await h.page.screenshot({ path: path.join(shots, 'storage-broken.png') });
  await h.ctx.close();

  // --- reduced-motion pass ---
  const rm = await session({ reducedMotion: 'reduce' });
  await rm.page.goto(url, { waitUntil: 'load' });
  await rm.page.waitForTimeout(900);
  ok('loads_under_reduced_motion', rm.crashes.length === 0, rm.crashes.slice(0, 4));
  await rm.page.screenshot({ path: path.join(shots, 'reduced-motion.png') });
  await rm.ctx.close();

  await browser.close();

  const vals = Object.values(R.checks);
  R.passed = vals.filter(c => c.pass).length;
  R.total = vals.length;
  R.failed = Object.entries(R.checks).filter(([, c]) => !c.pass).map(([k]) => k);
  const out = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : path.join(runDir, 'validate.json');
  fs.writeFileSync(out, JSON.stringify(R, null, 2));
  console.log(JSON.stringify({ runDir, passed: R.passed, total: R.total, failed: R.failed, bytes: R.bytes, buttons: R.buttonCount }, null, 2));
})().catch(e => { console.error('VALIDATOR ERROR', e); process.exit(1); });
