#!/usr/bin/env node
/**
 * One-off capture script for build-log retrospective screenshots.
 * Usage: npx playwright screenshot ... OR node scripts/capture-build-screenshots.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.ARUARU_ROOT
  ? path.resolve(process.env.ARUARU_ROOT)
  : path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs/internal/build-screenshots/phase-1-2');

const shots = [
  { url: 'http://localhost:3101/', file: '01-top-light.png', darkFile: '02-top-dark.png' },
  {
    url: 'http://localhost:3101/aruaru/github-oauth-no-events/',
    file: '03-detail-light.png',
    darkFile: '04-detail-dark.png',
  },
  { url: 'http://localhost:3101/aruaru/', file: '05-list-light.png', darkFile: null },
  {
    url: 'http://localhost:3101/tags/GitHub%E9%80%A3%E6%90%BA',
    file: '06-tag-light.png',
    darkFile: null,
  },
];

const mockShots = [
  {
    url: `file://${path.join(root, 'docs/internal/design-mocks/devrev-aruaru-design-mock.html')}`,
    file: '00-mock-top-reference.png',
  },
  {
    url: `file://${path.join(root, 'docs/internal/design-mocks/devrev-aruaru-detail-mock.html')}`,
    file: '00-mock-detail-reference.png',
  },
];

async function capturePage(page, url, file, darkFile) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, file), fullPage: true });
  if (darkFile) {
    const toggle = page.locator('#themeToggle');
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(outDir, darkFile), fullPage: true });
    }
  }
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

try {
  await mkdir(outDir, { recursive: true });
  const page = await context.newPage();

  for (const shot of mockShots) {
    await capturePage(page, shot.url, shot.file, null);
    console.log('saved', shot.file);
  }

  for (const shot of shots) {
    await capturePage(page, shot.url, shot.file, shot.darkFile);
    console.log('saved', shot.file, shot.darkFile ?? '');
  }

  // Mobile width — top page
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3101/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, '08-top-mobile-light.png'), fullPage: true });
  console.log('saved 08-top-mobile-light.png');
} finally {
  await browser.close();
}
