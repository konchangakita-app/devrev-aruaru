# あるあるサイト構築ログ（ブログネタ・生記録）

> **目的**: サイトの組み上げ・設計判断・Computer/Cursor への相談の過程を、**ブログ記事形式に整えず**ひたすら時系列で残す。
> サイト構成が一通り出来上がったあと、`build-log` / `design-log` 等を素材に **連載を何回に分けるか** を検討し、初めて hack-plus の下書き・公開記事に整形する。
>
> **脚色しない**: 相談内容・AI の提案・採用/不採用・理由・迷いをそのまま書く。記事化時に匿名化（`OPERATIONS.md` §6）。
>
> **関連ログ**:
> - デザイン深掘り → [`design-log.md`](./design-log.md)
> - 方針の確定事項（要約）→ `hack-plus/.company/secretary/notes/YYYY-MM-DD-decisions.md`
> - ネタ帳（連載 ID のメモ）→ `hack-plus/docs/blog-ideas.md`
> - 既に公開済みの DA-1〜4 は、当時「下書き並行」方針で直接執筆された（本ログ運用前）

---

## 記録方針（2026-09-07 確定）

| フェーズ | やること | やらないこと |
|---|---|---|
| **構築中（今）** | 本ファイル + トピック別ログへ追記 | hack-plus `drafts/` への記事整形、frontmatter 執筆、連載分割の確定 |
| **構築完了後** | ログを読み返し、回数・タイトル・切り口を決定 → 下書き化 | — |
| **公開時** | `.company` レビューフロー、匿名化 | ブログからサイト URL へリンク |

**誰が書くか**

| 担当 | 記録先 | 内容 |
|---|---|---|
| **Computer** | `design-log.md` 等 | デザイン相談・モック・ブランド判断の事実 |
| **Cursor** | 本ファイル | 実装相談・現状確認・プラン・セッション要約 |
| **オーナー** | どちらでも可 | 方針・採否。秘書 notes に要約してもよい |

---

## Cursor への相談方法（devrev-aruaru ワークスペース）

あるあるサイトの**設計・実装・検証**は、原則 **Repo1（devrev-aruaru）の Cursor** に相談する。hack-plus の記事執筆フロー（`.company` 秘書ルーティング）とは役割を分ける。

### ワークスペースと正本

| 相談内容 | ワークスペース | 最初に読む正本 |
|---|---|---|
| サイト IA・実装・デザイン反映 | `devrev-aruaru` | `docs/OPERATIONS.md`、`docs/internal/build-log.md` |
| 起票済み ISS の DevRev 検証 | `devrev-aruaru` | Issue 内容 + `devrev-platform-fetch` スキル |
| ブログの公開・文体・レビュー | `hack-plus`（または devrev-aruaru から指示） | `series-devrev-aruaru.md`、`style-guide.md` |

### 相談の型（オーナー → Cursor）

1. **現状確認** — 「検討状況を確認」「実装プランを考えて」など。Cursor はリポジトリ・ログを読んで事実ベースで返す。
2. **設計・実装** — 方針は `design-log` / `secretary/notes` / 本ログの決定を正とする。Cursor は Astro コードを変更する。
3. **記録依頼** — 「ブログネタとして記録して」→ **本ファイルへ追記**（記事形式に整えない）。オーナーが明示しなくても、サイト構成・実装セッションでは Cursor が自動追記する。
4. **DevRev 起票** — Cursor は **起票しない**。Computer に委ねる（`blog-ideas.md` に `(未起票)` と書く）。

### Cursor セッション後の記録義務（自動）

サイト構成・デザイン実装・相談セッションの末尾で、Cursor は次を行う:

- 本ファイルに **日付見出し + 事実** を追記
- 確定した方針があれば `secretary/notes/YYYY-MM-DD-decisions.md` に要約（任意だが推奨）
- `blog-ideas.md` の DA 行は **ネタメモ程度**（ステータスを無理に `drafting` にしない）

### Computer との分担（デザイン例）

| フェーズ | Computer | Cursor |
|---|---|---|
| デザインを考える | モック HTML、トークン、design-log | — |
| デザインを実装する | design-log 追記（事実） | Astro 反映、build-log 追記（実装判断） |
| 記事化 | フェーズ1の事実ログ | フェーズ2の実装ログ → **構築完了後に** 下書き整形 |

### 書かない（構築ログでも）

- あるある本文の紹介・公開サイト URL（デプロイ回の例外は記事化時に判断）
- ブログからサイトへのリンク方針の破り
- DevRev 社内 ISS 番号のそのまま載せ（記事化前の内部メモなら可、公開前に一般化）

---

## 時系列ログ

### 2026-09-07 — 現状確認セッション（Cursor）

**きっかけ**: オーナー「あるある Web サイトの検討状況とブログの下書き状況を確認」

**サイト（Repo1）の到達点（事実）**

- IA・技術方針は 2026-08-26 `secretary/notes/2026-08-26-decisions.md` で確定（Astro + Vercel + Cloudflare、MVP ページ構成、GitHub Issue 投稿）
- `web/` は Astro 骨組み完成、本番 `devrev-aruaru.konchangakita.com` デプロイ済み
- 見た目は着手前の仮 UI（slate + amber、`max-w-3xl` 1 カラム）。Computer のブランドデザインは **未反映**
- `entries.json` は 2 件（MVP 目標 10 件前後には未達）
- `docs/internal/design-log.md` に 2026-09-05 デザイン方針・モック方針が大量に記録済み（Computer フェーズ1）
- `computer_outputs/*.html` は design-log から参照されているが **Repo1 に未コミット**（実装時の参照用）

**ブログ（Repo2）の到達点（事実）**

- DA-1〜3: 公開済み（`articles/`）
- DA-4: `drafts/20260826-devrev-aruaru-deploy-da4.md`、factChecked 済み、**未公開**
- DA-5: `blog-ideas.md` に起票、`idea`、下書きなし。素材は design-log のみ
- `series-devrev-aruaru.md` の DA-4/5 表は blog-ideas より古い

**Cursor が提示した次の一手（参考）**

- DA-4 公開、デザイン Astro 反映、entries 拡充、ドキュメント同期 — 優先度の目安として列挙したのみ（未着手）

---

### 2026-09-07 — デザイン実装プラン（Cursor）

**きっかけ**: オーナー「Computer で作成したデザインを Cursor で実装していくターン。プランを考えて」

**プラン概要（事実として記録）**

- 正本: `design-log.md` + Computer の HTML モック（取込要）
- Phase 0: モック取込 → Phase 1: トークン・シェル（黒ナビ/黄ヒーロー/本文テーマ/黒フッター）→ Phase 2: 共有コンポーネント → Phase 3: トップ(案A)/一覧(案E)/詳細 → Phase 4: `entries` に `frequency`・`category` → Phase 5: 検索・OGP・404 等
- PR 3 分割案を提示
- ブログ DA-5 下書きはプラン上 Phase 6 に回していた（後述方針で見直し）

**未決（オーナー判断待ちだった項目）**

- HTML モックの Repo1 への置き場所
- Phase 5（検索・OGP）を同スプリントに含めるか
- `category` フィールドの初期値

---

### 2026-09-07 — ブログ並行の問い（Cursor）

**きっかけ**: オーナー「ブログネタへ作り込みも同時に進めていますか？」

**回答の要点（事実）**

- Computer の `design-log` = 記事素材として並行進行中
- hack-plus の下書き・secretary notes・`drafting` 更新 = 未着手
- 当時の `OPERATIONS.md` §9 / `.cursor/rules` は「`drafts/` に下書き」「DA-1 を drafting」並行を規定 → **実態とずれ**あり

---

### 2026-09-07 — 記録方針の再宣言（オーナー → 運用更新）

**オーナー指示（要旨）**

- サイトの組み上げ・Cursor への相談方法も **すべてブログネタとして記録**
- **ブログ形式に整える必要はない**。ひたすら記録
- Web サイトの構成が出来上がってから、連載（何回に分けるか等）を検討
- あるある構築開始時にも宣言していたはず → 確認し、必要ならルール更新

**確認結果**

- 2026-08-26 時点の `OPERATIONS.md` §9 / `project-operations.mdc` は「同セッションで `hack-plus/web/content/drafts/` に下書き」「`blog-ideas` を drafting」と書いており、**今回の「生ログ → 後から連載分割」とは一致していなかった**
- DA-1〜4 は当時の方針どおり **直接下書き・公開** まで進んでいる（過去分として維持）
- **2026-09-07 以降**: 本ファイル `build-log.md` を構築期の正本とし、記事整形は構築完了後に行う — `OPERATIONS.md` §9 を更新

**本セッションで実施**

- 本ファイル新設
- `OPERATIONS.md` §9、`project-operations.mdc`、`blog-ideas.md`、`docs/internal/README.md` を更新
- `design-log.md` ヘッダーに build-log との関係を追記

---

## 構築バックログ（サイト側・記事化は後）

design-log / 2026-08-26 decisions より。実装タスクのメモ（完了したら日付を追記）。

- [ ] Computer モック `computer_outputs/` を Repo1 参照可能にする
- [ ] デザイントークン + BaseLayout シェル（Phase 1）
- [ ] トップ案 A / 一覧案 E / 詳細ページ（Phase 3）
- [ ] `entries.json` — `frequency`・`category`
- [ ] entries 10 件前後
- [ ] 検索・OGP・404（Phase 5）
- [ ] DA-4 公開（hack-plus、別ライン）

---

## 記事化待ち素材（構築完了後に検討）

| 素材 | 場所 | 想定テーマ（分割は未決） |
|---|---|---|
| 環境・Cursor ルール | 公開済 DA-1 | 済 |
| IA・2 系統コンテンツ | 公開済 DA-2 | 済 |
| Astro 骨組み | 公開済 DA-3 | 済 |
| Vercel + Cloudflare | drafts DA-4 | デプロイ回 |
| デザイン相談 + 実装 | design-log + 本ログ | 1 回以上に分割可 |
| Cursor 相談の型 | 本ファイル §相談方法 | DA-1 補足 or 独立回 |

**連載分割**: サイト構成（デザイン反映まで）が一通り揃った時点で、`build-log` 全体を読み返して DA-N の切り口・回数を決める。
