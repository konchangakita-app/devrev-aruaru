# ISS-72 検証: entries.json status(draft/published) サイト対応（2026-09-21）

- **ブランチ**: `feature/ISS-72-draft-status`（base: `main` @ ISS-69 マージ後）
- **関連**: ISS-70（ワークフロー）、ISS-71（ブロッカー解消）

## 実装概要

| 項目 | 内容 |
|---|---|
| `entries.ts` | `status: draft \| published`（optional、デフォルト published） |
| フィルタ | `getEntries()` が表示対象を制御 |
| プレビュー | `import.meta.env.DEV` または `PUBLIC_SHOW_DRAFTS=true` で draft 含む |
| 本番ビルド | draft 除外（一覧・詳細・検索・タグすべて） |

## ビルド検証

| 条件 | ページ数 | slack draft ページ | Slack連携/Conversation タグ |
|---|---:|---|---|
| `npm run build`（本番） | 22 | ❌ 生成されない | ❌ 生成されない |
| `PUBLIC_SHOW_DRAFTS=true npm run build` | 25 | ✅ 生成される | ✅ 生成される |

## プレビュー手順（ISS-71 Step 3 向け）

```bash
cd web
npm run dev
# → http://localhost:3101 で draft 含む全11件を確認

# または Vercel プレビュー用
PUBLIC_SHOW_DRAFTS=true npm run build && npm run preview
```

## 完了条件チェック

- [x] 本番ビルドで draft のページ/カード/検索/タグが出ない
- [x] プレビュー時に draft を確認できる
- [ ] PR マージ（`work-item:ISS-72`）→ ISS 自動 completed
- [ ] ISS-71 公開 PR に進む
