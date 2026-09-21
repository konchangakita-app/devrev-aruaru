# Computerからのあるある登録→ISS→公開ワークフロー 設計メモ（ISS-70）

> DevRev Issue: **ISS-70**（kon-jp / PROD-11）`don:core:dvrv-jp-1:devo/6M2YuzjOnn:issue/70`
> ステータス: 設計フェーズ（論点を詰める）。Computer と Cursor 双方で検討する。
> コミット/PR には `work-item:ISS-70` を付与（マージで ISS 自動 completed）。

## ゴール

Computer起点で「あるある」を作成し、下書き→ISS→サイト確認→公開→PR連携→ISS完了まで回すワークフローを設計・実装する。

## 確定事項（2026-09-21）

- **下書き形式 = サイト本番 `web/src/data/entries.json` に `status: "draft" | "published"` を追加**（最小変更）。サイトはデフォルト published のみ表示、draft はプレビュー/ビルドフラグ時のみ（実装Cursor）。個別Markdown化は将来別ISS。
- **スキル方針 = 公開フロー用の新スキル（例 aruaru-publish）を分離**。既存 devrev-aruaru-add（別スキーマ・即同期）は触らず温存。新スキル=Computer側の入口（内容作成＋draft追記＋ISS起票）。

## ⚠️ 重要: entries.json が2系統ある（スキーマ差異）

- **サイト本番** `web/src/data/entries.json`（Cursor実装・公開対象）:
  `slug / title / symptom / cause / fix / category / frequency(数値 1-3) / tags / publishedAt`
  → **frequency（あるある度）実装済み**。`status` は未追加（このISSで追加）。
- **devrev-aruaru-add スキル側** `computer_outputs/devrev-aruaru/entries.json`（旧・別物）:
  `id / title / symptom / cause / solution / category / severity / tags / date`
- **公開ワークフローが書き込む先はサイト本番の方**。フィールド名を合わせる（fix / frequency / slug / publishedAt）。新スキルはこのスキーマに準拠すること。旧スキルとはデータを混同しない。

## 役割分担（前提・2026-09-21 確定）

- **Computer（DevRevプラットフォーム側＋内容）**: あるあるの**内容作成と下書き**（DevRev知見なのでComputer主担当）、社内ドキュメントの裏取り調査、**ISS/パーツ/ステージ操作**（kon-jp・PAT経由）、意思決定の記録。
- **Cursor（コード・Git・ブログ）**: サイトのコード実装、**Git操作（ブランチ・コミット・PR作成/マージ）**、公開ビルド/デプロイ、hack-plus連載ブログの執筆・スクショ。
- **受け渡し**: docs/internal/ のメモ＋ISS本文が「共有の伝言板」。

## 想定フロー

```
[Computerで調査/操作]  「これあるあるに登録したい」
        │
        ▼
[1] Computer: あるある内容を作成（症状/原因/対処/カテゴリ/タグ/あるある度）＋ 必要なら追加調査（社内ドキュ裏取り）
        ▼
[2] Computer: 下書き登録（entries.json に status:draft）＋ PROD-11配下にISS起票（あるある1件=ISS1件）
        ▼
[3] 人間: あるあるサイト（プレビュー）で内容確認
        ▼
[4] Cursor: 公開（status:published へ）＋ PR作成
        ▼
[5] Cursor/人間: PRマージ → 連携で ISS 自動 completed（kon-jp: merge→completed）
```

## 詰める論点（推奨つき）

### 1. 下書きの持ち方 — 推奨: entries.json に `status` 追加
- `status: "draft" | "published"` を各エントリに追加（最小変更。現行がentries.jsonベース）。
- サイト側はデフォルト published のみ表示。draft はプレビュー/ビルドフラグ時のみ表示（実装はCursor）。
- 将来の個別Markdown化は別ISSに切り出す。

### 2. 自動化の範囲 — 推奨: Computerは下書き＋ISS起票まで、PR/マージはCursor/人間
- Computer: 内容作成 → entries.json に draft 追記（1ファイル追記コミットはComputer可）→ ISS起票。
- ブランチ作成・PR作成・マージは Cursor/人間（公開は人の確認を挟む）。
- GitHub操作手段（gh CLI / GHMCP）の可否は実装前に検証（このリポは PAT接続・merge→completed 運用）。

### 3. ISS粒度 — 推奨: あるある1件 = ISS 1件
- タイトル例「あるある公開: 〇〇」。本文に内容ドラフトの要点＋裏取り出典。

### 4. 既存スキルとの関係 — 要検討: devrev-aruaru-add 拡張 vs 新スキル
- 現行 devrev-aruaru-add は entries.json + HTML を即同期（下書き概念なし）。
- 「下書き→公開」という新概念が入るため、公開フロー用の新スキル（例 aruaru-publish）に分ける案が有力。要決定。

### 5. 予備軍を最初の実データに
- 現在の予備軍3件をこのフローの初回実データにできる:
  1. 同じ会社なのに他の人のチケットが見れない（Customer Admins グループ）
  2. Revユーザーを Customer Admins に登録する（CO社内オペ）
  3. SlackとDevRev Conversationの同期（/devrev link + /invite @DevRev）

## スプリント/ENH/ロードマップ

- 今回のISS-70では**使わない**（1 ISS=1作業の粒度で十分）。
- 将来: ネタ在庫の可視化が欲しくなったら軽量にスプリント導入、サイト機能の中長期計画が溜まったらENH/ロードマップを別ISSで検討。

## 次アクション

- 論点1（下書き形式）と2（自動化範囲）を確定 → スキル方針（4）を決定 → 実装（Cursor）。

---

## Cursor → Computer フィードバック（2026-09-21）

**文脈**: ISS-71（Slack同期あるある公開）の検証を開始。Computer 担当分（draft 追記 + ISS 起票）は完了。

### ブロッカー

`entries.json` に `status: "draft"` が書かれているが、**サイト実装が未対応**のため ISS-70 フロー Step 3（プレビュー確認）に進めない。

| 項目 | 現状 |
|---|---|
| draft エントリ | `slack-devrev-conversation-sync`（未コミット） |
| サイト `entries.ts` | `status` フィールドなし・draft 除外なし |
| ビルド | draft ページが本番同等に生成される（意図と逆） |

### Computer への依頼

1. **`status` サイト対応の ISS を起票** — ISS-70 確定事項の「実装Cursor」部分。Cursor は起票しないため Computer 依頼。ISS-71 の前提タスクとして明示するとよい。
2. **ISS-71 は triage 維持** — 上記実装完了後、Cursor が公開 PR に進む。
3. **起票時にプレビュー方針を一文で指定** — 例: `PUBLIC_SHOW_DRAFTS` 環境変数、または dev のみ draft 表示。

### 実装完了後の Cursor 作業（ISS-71 再開）

1. draft プレビューで内容確認（人間）
2. `status` を `published` に変更（または draft フィールド削除）
3. `feature/ISS-71-*` ブランチ + PR（`work-item:ISS-71`）→ マージ

**検証ログ**: `docs/internal/verification/ISS-71-draft-gap-2026-09-21.md`

### ISS-72 起票・実装（2026-09-21）

Computer が **ISS-72** を起票。Cursor が `feature/ISS-72-draft-status` ブランチで実装。

**プレビュー方針（確定）**:
- `npm run dev`（`import.meta.env.DEV`）→ draft 表示
- `PUBLIC_SHOW_DRAFTS=true npm run build` → プレビュービルドで draft 表示
- 本番ビルド（デフォルト）→ published のみ

**検証ログ**: `docs/internal/verification/ISS-72-draft-status-2026-09-21.md`
