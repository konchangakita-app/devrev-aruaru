# ISS-71 検証: draft 未対応ブロッカー（2026-09-21）

- **検証対象**: ISS-71（Slack同期あるあるの公開ドッグフーディング）
- **親ワークフロー**: ISS-70
- **検証者**: Cursor
- **結果**: **ブロック** — フロー Step 3（サイトプレビュー確認）に進めない

## 発見事項

Computer が `web/src/data/entries.json` に `status: "draft"` 付きエントリを追記済み（slug: `slack-devrev-conversation-sync`）。  
しかしサイト側は **draft を認識・除外する実装がない**。

| 観点 | 状態 |
|---|---|
| `entries.json` に `status: "draft"` | ✅ 追記済み（未コミット） |
| `entries.ts` Zod スキーマに `status` | ❌ 未定義（未知キーは strip） |
| `getEntries()` の draft 除外 | ❌ 未実装 |
| プレビューモード（draft 表示） | ❌ 未実装 |
| ビルド出力 | ⚠️ `/aruaru/slack-devrev-conversation-sync/` が **通常ページとして生成される** |

## ISS-70 設計とのギャップ

ISS-70 確定事項:

> サイトはデフォルト published のみ表示、draft はプレビュー/ビルドフラグ時のみ（**実装Cursor**）

Computer 側（下書き追記 + ISS-71 起票）は完了。  
Cursor 側（サイトの `status` 対応）は **未着手**。  
そのため想定フローの Step 3「人間: サイト（プレビュー）で確認」が成立しない。

## Computer への依頼

1. **ISS 起票**: `entries.json` の `status: draft | published` をサイトが扱う実装タスクを ISS として起票（ISS-70 の子タスクまたは独立 ISS）。Cursor は起票しないため Computer 依頼。
2. **ISS-71 のステージ**: 実装 ISS 完了まで triage 維持でよい（現状どおり）。
3. **実装完了後**: Cursor が ISS-71 の公開 PR（`work-item:ISS-71`）に進む。

## 実装タスクの目安（Cursor 側・起票後）

- `entries.ts`: `status` を optional（デフォルト `published`）
- `getEntries()`: 本番ビルドは `published` のみ、プレビューは draft 含む
- 一覧・検索・タグ・`getStaticPaths` も同フィルタを適用
- プレビュー手段: 環境変数 `PUBLIC_SHOW_DRAFTS=true` または Astro dev のみ draft 表示 等（ISS 本文で方針確定）

## 参照

- `docs/internal/publish-workflow-notes.md` — Cursor → Computer フィードバック節
- ISS-70 / ISS-71 タイムラインコメント（2026-09-21 投稿）
