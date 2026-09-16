# あるあるサイト 検索機能 設計メモ（ISS-69）

> DevRev Issue: **ISS-69**（kon-jp / PROD-11）`don:core:dvrv-jp-1:devo/6M2YuzjOnn:issue/69`
> ステータス: 着手前（論点を詰める段階）。Computer と Cursor 双方で設計検討する。
> コミット/PR には `work-item:ISS-69` を付与（マージで ISS 自動 completed）。

## 背景

デザイン段階で検索UIの見た目は確定済み。
- トップページ: 大きな検索窓（ヒーロー内）。
- 全ページ: ナビ右の検索アイコン（下層/スマホからの一貫導線）。
- 参照: `docs/internal/design-mocks/`（design-mock.html にトップ検索窓、各モックにナビ検索）、`docs/internal/design-log.md`。

実際の検索処理（インデックス・マッチング）は**未実装**。このISSで方式選定から行う。

## 詰める論点

### 1. 検索方式（最重要）
- **Fuse.js**: `entries.json` をクライアントに載せてファジー全文検索。件数が少ない今は最軽量・実装が速い。ランタイムのネット接続不要でCSP適合。
- **Pagefind**: ビルド時に静的インデックスを生成。記事が増えても軽く、日本語の言語設定あり。Astro静的ビルドと相性良。
- 方針候補: **まず Fuse.js で開始 → 記事増加時に Pagefind へ移行**。段階移行のコスト（UIは共通化しておく）も検討。

### 2. 検索対象フィールドと重み付け
- 対象候補: `title` / `symptom` / `cause` / `solution` / `tags` / `category`。
- title・tags を高め、本文（symptom/cause/solution）を中程度、の重み付けを想定。

### 3. 絞り込みとの併用
- カテゴリ・タグ・あるある度（frequency）での絞り込みと、キーワード検索の併用。
- 並び順（新着 / あるある度）。一覧ページ（案E=2ペイン）との統合をどうするか。

### 4. UI挙動
- トップ大検索窓: インクリメンタル表示（打つそばから結果）か、Enterで結果ページ遷移か。
- ナビ検索アイコン: クリックで検索窓を展開 or 検索ページへ遷移。
- ライト/ダーク両対応（`--page-*` トークン準拠）。

### 5. 制約（前提）
- 静的配信（Vercel）＋ CSPサンドボックス。**ランタイムのネット接続不可 → クライアント完結が前提**。
- eval/WASM 制約に注意（ライブラリ選定時に確認）。

### 6. 日本語対応
- 日本語トークナイズ / 部分一致の扱い。
  - Fuse.js: `threshold` 調整、`ignoreLocation`、n-gram 前処理の要否。
  - Pagefind: 言語設定（日本語インデックス）の挙動確認。

## 進め方

方式比較（Fuse.js vs Pagefind の PoC）→ 方針決定 → 実装。まずは方式選定から。

## 参照
- `docs/internal/design-log.md` — 検索の型・申し送り（Pagefind / Fuse.js 候補）
- `docs/internal/design-mocks/` — 検索窓の見た目
- `web/src/data/entries.json` — 検索対象データ（現行のマスター）
