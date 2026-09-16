import Fuse from 'fuse.js';
import type { AruaruEntry } from '../lib/entries';
import { fuseSearchOptions } from '../lib/search-fuse';

function dotClass(frequency: number) {
  if (frequency >= 3) return 'dot dot--high';
  if (frequency >= 2) return 'dot dot--medium';
  return 'dot dot--low';
}

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderResults(entries: AruaruEntry[]) {
  return entries
    .map(
      (entry) => `
        <a class="pl-row" href="/aruaru/${encodeURIComponent(entry.slug)}/">
          <span class="${dotClass(entry.frequency)}" aria-hidden="true"></span>
          <span class="ttl">${escapeHtml(entry.title)}</span>
          <span class="cat">${escapeHtml(entry.category)}</span>
        </a>
      `,
    )
    .join('');
}

function renderEmpty(query: string) {
  return `
    <div class="empty-state">
      <p class="empty-state__title">「${escapeHtml(query)}」に一致するあるあるはありません</p>
      <p class="empty-state__message">別のキーワードを試すか、タグやカテゴリから探してみてください。</p>
      <p class="empty-state__hint">まだ誰も書いていない「あるある」かもしれません。</p>
      <div class="empty-state__actions">
        <a class="btn btn-outline" href="/aruaru/">一覧を見る</a>
        <a class="btn btn-outline" href="/about/">投稿方法（About）</a>
      </div>
    </div>
  `;
}

function initSearchPage() {
  const root = document.querySelector<HTMLElement>('[data-search-page]');
  const dataEl = document.getElementById('search-entries-data');
  if (!root || !dataEl?.textContent) return;

  let entries: AruaruEntry[];
  try {
    entries = JSON.parse(dataEl.textContent) as AruaruEntry[];
  } catch {
    return;
  }

  const fuse = new Fuse(entries, fuseSearchOptions);
  const input = root.querySelector<HTMLInputElement>('[data-search-input]');
  const heading = root.querySelector<HTMLElement>('[data-search-heading]');
  const count = root.querySelector<HTMLElement>('[data-search-count]');
  const hint = root.querySelector<HTMLElement>('[data-search-hint]');
  const body = root.querySelector<HTMLElement>('[data-search-body]');
  const bodyLabel = root.querySelector<HTMLElement>('[data-search-body-label]');
  const resultsRoot = root.querySelector<HTMLElement>('[data-search-results]');
  const emptyRoot = root.querySelector<HTMLElement>('[data-search-empty]');

  if (!input || !heading || !count || !hint || !body || !bodyLabel || !resultsRoot || !emptyRoot) return;

  function runSearch(query: string) {
    const q = query.trim();
    input.value = q;

    if (!q) {
      heading.textContent = 'あるあるを検索';
      count.hidden = true;
      hint.hidden = false;
      body.hidden = true;
      bodyLabel.hidden = true;
      resultsRoot.hidden = true;
      resultsRoot.innerHTML = '';
      emptyRoot.hidden = true;
      emptyRoot.innerHTML = '';
      document.title = '検索 | DevRevあるある';
      return;
    }

    const results = fuse.search(q).map((result) => result.item);
    heading.textContent = '検索結果';
    count.textContent = `${results.length} 件`;
    count.hidden = false;
    hint.hidden = true;
    body.hidden = false;

    if (results.length === 0) {
      bodyLabel.hidden = true;
      resultsRoot.hidden = true;
      resultsRoot.innerHTML = '';
      emptyRoot.hidden = false;
      emptyRoot.innerHTML = renderEmpty(q);
    } else {
      bodyLabel.hidden = false;
      emptyRoot.hidden = true;
      emptyRoot.innerHTML = '';
      resultsRoot.hidden = false;
      resultsRoot.innerHTML = renderResults(results);
    }

    document.title = `「${q}」の検索結果 | DevRevあるある`;
  }

  function syncFromUrl() {
    const params = new URLSearchParams(window.location.search);
    runSearch(params.get('q') ?? '');
  }

  syncFromUrl();

  root.querySelector('form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = input.value.trim();
    const url = new URL(window.location.href);
    if (q) {
      url.searchParams.set('q', q);
    } else {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url);
    runSearch(q);
  });

  window.addEventListener('popstate', syncFromUrl);
}

initSearchPage();
