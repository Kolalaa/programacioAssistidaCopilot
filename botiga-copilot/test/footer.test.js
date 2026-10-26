import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const htmlPath = new URL('../public/index.html', import.meta.url);
const cssPath = new URL('../public/styles.css', import.meta.url);
const jsPath = new URL('../public/app.js', import.meta.url);

test('el footer existeix al final de la pàgina principal', async () => {
  const html = await readFile(htmlPath, 'utf8');
  assert.match(html, /<footer>[\s\S]*<\/footer>\s*<script src="app\.js"><\/script>\s*<\/body>/);
});

test('el footer mostra any actual i enllaç de correu', async () => {
  const html = await readFile(htmlPath, 'utf8');
  const js = await readFile(jsPath, 'utf8');

  assert.match(html, /© <span id="any-actual"><\/span> Botiga Copilot/);
  assert.match(html, /href="mailto:contactebotiga\.example\.com"/);
  assert.match(js, /anyActual\.textContent = new Date\(\)\.getFullYear\(\);/);
});

test('els estils del footer utilitzen variables CSS', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /footer\s*\{[\s\S]*background:\s*var\(--color-principal\);[\s\S]*color:\s*var\(--color-fons\);[\s\S]*\}/);
  assert.match(css, /footer a\s*\{[\s\S]*color:\s*var\(--color-fons\);[\s\S]*\}/);
});
