# ブログネタ（【とあるあるあるサイト】構築中）

> **構築期の正本は Repo1 内**。サイト構築セッション（ISS-68 等）では **本ファイル + [`build-log.md`](./build-log.md)** に追記する。  
> hack-plus `docs/blog-ideas.md` への統合は **構築完了後**（Computer / オーナー判断）。

- 時系列の生記録 → [`build-log.md`](./build-log.md)
- デザイン深掘り → [`design-log.md`](./design-log.md)
- 運用マスター → [`docs/OPERATIONS.md`](../OPERATIONS.md) §9
- 連載ルール（公開時）→ hack-plus `series-devrev-aruaru.md`

## 記入フォーマット

- **想定タイトル** / **書ける切り口** / **匿名化の注意点**
- **ステータス**: `idea`（構築中は drafting にしない）
- **DevRev Issue**: `(未起票)` — 起票は Computer
- **build-log 参照**: 日付セクションへのリンク

---

## 連載ネタ（DA-5 以降）

### DA-5 — AIと一緒にサイトのデザインを考える（デザイン編）

- **記事の主題**: 骨組み後のデザインを Computer/Cursor と詰めた過程
- **記録**: [`design-log.md`](./design-log.md) + [`build-log.md`](./build-log.md)（Phase 0〜5）
- **想定タイトル**: 「【とあるあるあるサイトをつくる】AIと一緒にサイトのデザインを考える」
- **ステータス**: idea
- **DevRev Issue**: (未起票)

### DA-6 候補 — トップを「使える」大きさに仕上げる（2026-09-15）

- **記事の主題**: モック載せ**後**の UX 仕上げ — ヒーロー縦幅・コピー・カードクリック。Cursor とオーナーが数値を往復調整
- **build-log**: [`build-log.md` §2026-09-15](./build-log.md)（トップ UX 仕上げ）
- **元コミット**: `8446157`（`feature/ISS-68-aruaru-site`）
- **想定タイトル**: 「【とあるあるあるサイトをつくる】ヒーローが大きすぎた — モック載せ後の UX 調整」
- **書ける切り口**:
  - 黄ヒーローはかっこいいが小画面で新着まで遠い → **到達距離**優先で `.hero--home` のみ圧縮
  - コピー短文化 + AI への段階指示（70–80% → +10% → 縦+20% → 検索130%）
  - **stretched link** でカード全体クリック、タグは独立
  - リンクホバーの黄色下線 → `--link-underline`（muted）に統一
- **匿名化**: コミット/Issue/ポート/本番 URL（完成節以外）は一般化
- **ステータス**: idea
- **DevRev Issue**: (未起票)
