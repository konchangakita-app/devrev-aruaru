# 構築スクショ（内部用）

サイト実装の進捗を **build-log** の素材として残す PNG 置き場。公開サイトには載せない。

## 取得方法（推奨）

DevTools MCP の `filePath` はワークスペースルート不一致で保存拒否されるため、**Playwright スクリプト**を使う。

```bash
# 1. ローカルサーバー起動（別ターミナル）
cd web && docker compose up
# → http://localhost:3101/

# 2. 一時 dir に Playwright を入れて実行
tmpdir=$(mktemp -d) && cd "$tmpdir" \
  && npm init -y >/dev/null && npm i playwright@1.51.0 >/dev/null \
  && npx playwright install chromium \
  && cp /path/to/devrev-aruaru/scripts/capture-build-screenshots.mjs ./capture.mjs \
  && ARUARU_ROOT=/path/to/devrev-aruaru CAPTURE_PHASE=5-6 node capture.mjs
```

リポジトリ内に `playwright` を devDependency 追加する場合は `node scripts/capture-build-screenshots.mjs` で直接実行可。

## ディレクトリ

| パス | 内容 |
|---|---|
| `phase-1-2/` | Phase 1–2 実装 + モック参照 + ライト/ダーク（一部） |
| `phase-5-6/` | 検索・About・404・2ペイン（SQL カテゴリ） |

## ファイル命名

- `00-mock-*` — design-mocks 参照
- `01-top-light.png` / `02-top-dark.png` — トップ
- `03-detail-light.png` / `04-detail-dark.png` — 詳細
- `05-list-light.png` — 一覧（Phase 4 以降は 2ペイン）
- `06-tag-light.png` — タグ
- `08-top-mobile-light.png` — モバイル幅トップ

## 関連

- 構築ログ: [`../build-log.md`](../build-log.md)
- デザインモック: [`../design-mocks/`](../design-mocks/)
