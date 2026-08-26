# devrev-aruaru

DevRev のハマりどころ・ナレッジを公開するサイトのリポジトリです。

## ドキュメント

| ドキュメント | 内容 |
|---|---|
| [運用ルール](docs/OPERATIONS.md) | 2リポジトリ共通の運用マスター（Computer / Cursor 分担） |
| [開発方針](docs/devrev-github-issue-policy.md) | DevRev を唯一の Issue 管理基盤とする方針 |
| [スナップイン検証レポート](docs/github-snapin-verification-report.md) | GitHub for DevRev スナップインの検証結果 |

## ローカル開発

```bash
docker compose up
# → http://localhost:3101
```

ポート **3101**（`konchangakita-com` の 3001–3099 とは別レンジ）。詳細は `docs/OPERATIONS.md` §10。

サイト実装は `web/`（Astro）。あるあるの投稿は GitHub Issue（`OPERATIONS.md` §11）。

## 開発方針（要点）

本リポジトリは **DevRev をメインの開発基盤**とし、Issue 管理は DevRev に一本化します。GitHub Issue は使いません。GitHub はコード（ブランチ / PR / コミット）専用の場として使います。

- Issue は必ず DevRev で起票する（GitHub Issue は起票しない）
- ブランチ名・コミット・PR に DevRev の Issue ID（`ISS-XXX` / `work-item:ISS-XXX`）を記載する
- PR マージで Issue が Completed に自動遷移する（本運用の設定）
- 各メンバーは DevRev の Settings > Account > External Identities で GitHub アカウントを連携する

詳細は [開発方針ドキュメント](docs/devrev-github-issue-policy.md) を参照してください。
