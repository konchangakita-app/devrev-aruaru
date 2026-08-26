# Cursor 設定

## skills/

DevRev スキルの**正本**は `konchangakita/devrev-sampleapp/skills/` にあり、ここは symlink で参照する。

| リンク | 用途 |
|---|---|
| `devrev-pat-manager` | PAT 解決（`--profile kon-jp`） |
| `devrev-platform-fetch` | ISS 検証の API 呼び出し |
| `devrev-snap-in-operations` | スナップイン操作手順 |

リンク再作成:

```bash
SKILLS="/Users/skon/DevRev/develop/repo/konchangakita/devrev-sampleapp/skills"
ARUARU="$(git rev-parse --show-toplevel)"
mkdir -p "$ARUARU/.cursor/skills"
for name in devrev-pat-manager devrev-platform-fetch devrev-snap-in-operations; do
  ln -snf "$SKILLS/$name" "$ARUARU/.cursor/skills/$name"
done
```

## rules/

| ファイル | 適用 |
|---|---|
| `project-operations.mdc` | 常時 — 役割分担・スキル参照 |
| `devrev-verification.mdc` | `docs/internal/verification/**` — 検証手順 |
