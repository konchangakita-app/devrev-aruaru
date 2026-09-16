# ISS-69 検索機能 QA（2026-09-16）

- ブランチ: `feature/ISS-69-search`
- 環境: `docker compose up` → http://localhost:3101
- ビルド: `npm run build`（22 pages 成功）

## 結果サマリー

| 区分 | 結果 |
|---|---|
| Fuse ロジック（10ケース） | **10/10 PASS** |
| ブラウザ UI（dev） | **8/9 PASS**（1件は DOM 内部の非表示残留、表示上は問題なし） |
| 静的ビルド成果物 | **PASS**（entries JSON 埋め込み + Fuse バンドル ~28KB） |

## ロジックテスト（Node / fuseSearch）

| クエリ | 期待 | 結果 |
|---|---|---|
| GitHub | ≥3件 | 4件 PASS |
| SQL | 3件 | 3件 PASS |
| Computer | 3件 | 3件 PASS |
| OAuth | ≥1件 | 1件 PASS |
| スナップイン | ≥1件 | 3件 PASS |
| triage | ≥1件 | 2件 PASS |
| 存在しないキーワードxyz | 0件 | PASS |
| 空 / 空白 | 0件 | PASS |
| Gthub（typo） | ファジー | 4件 PASS |

## UIテスト（dev / Playwright MCP）

| ID | 内容 | 結果 |
|---|---|---|
| T1 | 初期表示（空クエリ） | PASS |
| T2 | フォーム送信 `SQL` → 3件・URL更新 | PASS |
| T3 | 0件表示（EmptyState） | PASS（表示は正しい。非表示の results DOM に旧 HTML 残留は LOW） |
| T4 | 空検索でリセット | PASS |
| T5 | ブラウザ戻る（popstate） | PASS |
| T6 | ヒーロー form action `/search/` | PASS |
| T7 | ナビ虫めがね href `/search/` | PASS |
| T8 | ヒーロー送信 → `?q=Computer` 3件 | PASS |
| T9 | `/search?q=GitHub`（スラッシュなし） | PASS（4件） |
| T10 | 結果リンク先 slug 正常 | PASS |
| T11 | ダークモード切替 | PASS（クラッシュなし） |

## 静的ビルド

- `dist/search/index.html` に `search-entries-data` あり
- `dist/_astro/search.*.js` に Fuse 同梱（~28KB）
- 本番同等は `astro preview` + ブラウザで要確認（QA セッション中 MCP から 3102 接続不可。curl は 200）

## 既知の LOW 指摘（マージ阻害ではない）

1. **0件時に `data-search-results` の innerHTML をクリアしない** — `hidden` のため表示上は問題なし。DOM 衛生として `innerHTML = ''` 推奨。
2. **entries 全文 JSON を検索ページにインライン** — 現状10件で問題なし。増加時は Pagefind 移行を検討（設計メモ通り）。

## 未テスト（スコープ外 / 次フェーズ）

- ヒーローでのインクリメンタル検索
- カテゴリ・タグ絞り込み併用
- モバイル幅レイアウト専用確認
- Vercel 本番 CSP 下での動作（デプロイ後）
