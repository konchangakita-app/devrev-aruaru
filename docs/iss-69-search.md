# ISS-69 あるあるサイト 検索機能

検索 UI はデザイン済み。本 Issue で方式選定・実装を行う。

- Issue: `ISS-69`
- Org: `kon-jp`
- Repo: `konchangakita-app/devrev-aruaru`
- Branch: `feature/ISS-69-search`

## スコープ

- 検索方式の PoC（Fuse.js vs Pagefind）と方針決定
- 検索処理の実装（現状は `searchEntries()` の部分一致のみ）
- 設計メモ: `docs/internal/search-feature-notes.md`
- 構築ログ: `docs/internal/build-log.md`

## 関連

- ISS-68（サイト UI 構築）で検索ページ・ヒーロー検索窓・ナビ検索アイコンは配置済み
- 実装前のベースラインスクショ: `docs/internal/build-screenshots/phase-69/`
