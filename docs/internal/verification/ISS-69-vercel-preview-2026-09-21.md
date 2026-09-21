# ISS-69 Vercel プレビュー検証（2026-09-21）

- PR: [#8](https://github.com/konchangakita-app/devrev-aruaru/pull/8) `[ISS-69] 検索機能（Fuse.js）と詳細ページ読むモード`
- ブランチ: `feature/ISS-69-search`
- プレビュー URL: https://devrev-aruaru-git-feature-iss-69-search-konchangakitas-projects.vercel.app
- Vercel デプロイ: **SUCCESS**（2026-09-21T09:21:26Z）
- 検証手段: Chrome DevTools MCP（ブラウザ）+ `vercel curl`（HTML/ヘッダ）

## 結果サマリー

| 区分 | 結果 |
|---|---|
| Vercel ビルド / GitHub チェック | **PASS** |
| 検索（Fuse.js クライアント） | **PASS** |
| 詳細ページ（読むモード） | **PASS** |
| コンソールエラー | **なし** |
| CSP ヘッダ | **未設定**（レスポンスヘッダに `Content-Security-Policy` なし。マージ後本番でも同様の見込み） |

## デプロイ保護

- 素の `curl` は **302** → Vercel SSO（Deployment Protection）
- `vercel curl` またはログイン済みブラウザで **200** 取得可能

## UI 検証（プレビュー）

| ID | URL / 内容 | 期待 | 結果 |
|---|---|---|---|
| V1 | `/` | トップ・ヒーロー検索フォーム表示 | PASS |
| V2 | `/search/?q=GitHub` | 4件・タイトル「GitHub」の検索結果」 | PASS |
| V3 | `/search/?q=存在しないキーワードxyz` | 0件・EmptyState 文言 | PASS |
| V4 | `/aruaru/github-oauth-no-events/` | `entry-header` + `entry-sheet`、黄 `hero-band` なし | PASS |
| V5 | 詳細 qflow | 症状/原因/対処ラベル + ヒント行、タグはシート上部 | PASS |
| V6 | ダークモード + 検索 | `data-theme=dark`、4件表示、コンソールエラーなし | PASS |

## 静的 HTML（vercel curl）

- `/search/?q=GitHub` に `search-entries-data` と `search-page` スクリプト参照あり

## 本番（マージ前）

- `https://devrev-aruaru.konchangakita.com` は **main ブランチ**のため、ISS-69 の検索 UI・読むモードは **未反映**
- マージ後に本番で再検証推奨

## 判定

**プレビュー環境では ISS-69 の実装は問題なく動作。PR マージ可能。**
