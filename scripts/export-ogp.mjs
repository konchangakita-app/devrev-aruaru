#!/usr/bin/env node
/**
 * Export OGP PNGs from design-mocks/devrev-aruaru-ogp.html
 * Usage: ARUARU_ROOT=/path/to/devrev-aruaru node scripts/export-ogp.mjs
 * Requires playwright (run from temp dir with npm i playwright, same as capture script)
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.ARUARU_ROOT
  ? path.resolve(process.env.ARUARU_ROOT)
  : path.resolve(__dirname, '..');

const ogpHtml = path.join(root, 'docs/internal/design-mocks/devrev-aruaru-ogp.html');
const outDir = path.join(root, 'web/public/og');

const exports = [
  { selector: '#ogp-main', file: 'og-image.png' },
  { selector: '.simple-wide', file: 'og-banner-wide.png' },
  { selector: '.simple-sq', file: 'og-banner-square.png' },
];

const browser = await chromium.launch();

try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage();
  await page.goto(`file://${ogpHtml}`, { waitUntil: 'networkidle' });

  for (const item of exports) {
    const locator = page.locator(item.selector).first();
    await locator.screenshot({ path: path.join(outDir, item.file) });
    console.log('saved', item.file);
  }
} finally {
  await browser.close();
}
