# あるある下書きの作り方（型）— レベルA / Computer担当

> 関連 ISS: **ISS-70**（公開ワークフロー）。下書き→ISS→公開→PR→ISS完了の一部。
> これは「あるある1件（構造データ）」の下書きの型。読み物記事（Markdown）はレベルB=別トラック。
> 書き込み先は **サイト本番 `web/src/data/entries.json`**（旧 devrev-aruaru-add 側とは別スキーマ・混同しない）。

## フィールド仕様（サイト本番スキーマ準拠）

| フィールド | 必須 | ルール |
|---|---|---|
| `slug` | ✓ | 英小文字ハイフン区切り、内容を表す短い英語（例 `slack-devrev-conversation-sync`）。既存と重複不可。 |
| `title` | ✓ | **症状ベースの一言**。困って検索する言葉で（「〜が同期しない」「〜が届かない」）。DevRev用語はそのまま可。 |
| `symptom` | ✓ | 「何をしたら/どうなって困るか」。1-2文、具体的に。 |
| `cause` | ✓ | なぜ起きるかの本質。**裏取り必須**。 |
| `fix` | ✓ | 実際の回避/解決手順。コマンド・設定名は正式表記で。 |
| `category` | ✓ | 既存カテゴリに寄せる（Computer / SQL / Snap-in / ポータル / ワークフロー 等）。新設は慎重に。 |
| `frequency` | ✓ | あるある度 **1-3**（3=よく遭遇）。**重大度ではない**。 |
| `tags` | ✓ | 検索用。既存タグの表記に合わせる（例「スナップイン」「Slack連携」）。 |
| `publishedAt` | ✓ | `YYYY-MM-DD`。公開日（下書き時は作成日でよい）。 |
| `status` | ✓ | 下書きは `"draft"`、公開時に `"published"`。未指定は published 扱い（ISS-72で実装）。 |

## 品質基準（下書き作成時の必須チェック）

1. **裏取り必須**: cause / fix は社内ドキュメントで確認。推測で書かない。参照記事IDは ISS 本文に残す（サイトには出さない）。
2. **正式表記**: 機能名・コマンド・グループ名は正式名称（例 `/devrev link`、Customer Admins、WebSocket Secure）。ユーザーの言い方を正しい表記に直してよい。
3. **frequency は頻発度**: 「深刻さ」で付けない。よく遭遇するかで 1-3。
4. **既存への寄せ**: category / tags は既存の粒度・表記に合わせる。
5. **匿名化**: サイトは外部公開。顧客名・組織 slug・社内 ISS 番号などは本文に書かない。

## 作成手順（Computer担当）

1. 会話/調査から 症状・原因・対処 を3点に整理。
2. **社内ドキュメントで裏取り**（cause/fix の正確性・正式表記）。
3. 型に沿って1エントリを組み立て（slug 重複チェック）。
4. `web/src/data/entries.json` に **`status:"draft"` で追記**（1ファイル追記コミットは Computer 可）。
5. **PROD-11 配下に「あるある公開: 〇〇」ISS を起票**（本文に内容ドラフト＋裏取り出典）。
6. → 以降 Cursor（プレビュー確認 → published 化 → PR `work-item:ISS-NN` → マージで ISS 自動 completed）。

## 実例（初回ドッグフーディング / ISS-71）

```json
{
  "slug": "slack-devrev-conversation-sync",
  "title": "SlackとDevRev Conversationが同期しない",
  "symptom": "Slackチャンネルの投稿がDevRevのConversationとして作成されない／DevRev側の返信がSlackに反映されない",
  "cause": "同期には2ステップ両方が必要。リンクまたはBot招待のどちらかが欠けていると双方向同期は動かない（Bot不在=Slack仕様）",
  "fix": "/devrev link でRev Orgにリンク → /invite @DevRev でBot招待 → /devrev help で疎通確認。大量chは /SlackInviteBot で一括招待",
  "category": "Snap-in",
  "frequency": 3,
  "tags": ["Slack連携", "スナップイン", "Conversation"],
  "publishedAt": "2026-09-21",
  "status": "draft"
}
```

## 予備軍（次に同じ型で流す候補）

- Customer Admins（同組織のチケット閲覧）
- Customer Admins へのRevユーザー登録（CO社内オペ）
