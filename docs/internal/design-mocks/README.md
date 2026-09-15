# デザインモック（フェーズ1成果物 / Cursor実装の参照用）

Computer と一緒に決めた「あるあるサイト」のデザイン方針を、静的HTMLモックとして固めたもの。
実装（Astro）の見た目リファレンスとして参照する。意思決定の経緯は `../design-log.md` を参照。

すべて単一HTMLで自己完結（フォントは Google Fonts、公式ロゴ不使用・ブランドカラーのみ）。

| ファイル | 内容 |
|---|---|
| `devrev-aruaru-design-mock.html` | **トップページ**。黒ナビ（検索アイコン＋テーマトグル）→ 黄ヒーロー（大検索窓）→ 本文（新着カード・あるある度メーター）→ 黒フッター。本文はライト/ダーク切替。 |
| `devrev-aruaru-detail-mock.html` | **あるある詳細ページ**。黄ヒーロー（パンくず＋あるある度メーター）→ 症状/原因/対処の3ブロック → コードブロック・出典note・画像の型・タグ・関連・前後ページャ。ライト/ダーク切替。 |
| `devrev-aruaru-list-ideas.html` | **一覧の見せ方 比較**（案A/C/E）。採用は **案A（トップ）＋案E（一覧ページ）**。Cは不採用。 |
| `devrev-aruaru-ogp.html` | **OGP画像（1200×630）** と **シンプルバナー**（横長1200×630／正方形800×800、「DevRevあるある」のみ）。共有カードのプレビュー付き。書き出しはPNG化。 |
| `devrev-aruaru-favicon.svg` | **favicon**。黄色角丸＋黒の「A」。本実装は `web/public/favicon.svg` へ。文字はアウトライン化推奨。 |

## 実装時の要点（詳細は design-log.md）

- 配色 = DevRevブランドそのまま（黒#161616／白／グレー#F4F4F4／イエロー#FFE600）。**非公式ファンサイト**を明示、公式ロゴ・Chipフォントは不使用。
- フォント = 見出し Space Grotesk / 本文 Inter＋Noto Sans JP / 等幅 JetBrains Mono（すべてOFL）。
- テーマ = 本文エリアのみライト/ダーク切替。`--page-*` トークンを `body[data-theme="dark"]` で上書き。本実装は localStorage 永続化＋prefers-color-scheme 初期値。
- 指標 = severity（重大度）は廃止。**「あるある度」（頻発度）メーター**（黄色ドット3段、赤緑不使用）。データ項目は `frequency` 等に。
- 画像 = `figure.shot`（インライン画像／16:9プレースホルダ／before-after 2列）。本実装は `<img width height loading="lazy">` でCLS回避。
- 検索 = トップ大検索窓＋全ページ ナビ検索アイコン。実処理は Pagefind / Fuse.js 候補（クライアント動作）。
