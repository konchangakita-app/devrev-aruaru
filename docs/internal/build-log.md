# あるあるサイト構築ログ（ブログネタ・生記録）

> **目的**: サイトの組み上げ・設計判断・Computer/Cursor への相談の過程を、**ブログ記事形式に整えず**ひたすら時系列で残す。
> サイト構成が一通り出来上がったあと、`build-log` / `design-log` 等を素材に **連載を何回に分けるか** を検討し、初めて hack-plus の下書き・公開記事に整形する。
>
> **脚色しない**: 相談内容・AI の提案・採用/不採用・理由・迷いをそのまま書く。記事化時に匿名化（`OPERATIONS.md` §6）。
>
> **関連ログ**:
> - DevRev Issue: **ISS-68**（サイト構築のトラッキング）→ [`../iss-68-aruaru-site.md`](../iss-68-aruaru-site.md)
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
- `docs/internal/design-mocks/` に Computer 作成のモック5点 + README が配置済み（コミット `9d1b966`）。実装参照可能

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

- [x] Computer モック → `docs/internal/design-mocks/` に配置済み（2026-09-07、commit `9d1b966`）
- [x] デザイントークン + BaseLayout シェル（Phase 1）— 2026-09-07 Cursor 実装
- [x] 共有コンポーネント + entries スキーマ + トップ/詳細 UI（Phase 2）— 2026-09-07
- [ ] トップ案 A カテゴリ窓 / 一覧案 E 2ペイン（Phase 4）
- [x] `entries.json` — `frequency`・`category`（2件に付与済み）
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

---

### 2026-09-07 — デザインモック配置確認（Cursor）

**きっかけ**: オーナー「Computer で作成したモックや OGP を配置した。確認して」

**配置先（事実）**: `docs/internal/design-mocks/`（6ファイル + README）。git commit `9d1b966`

| ファイル | 確認結果 |
|---|---|
| `devrev-aruaru-design-mock.html` | トップ。黒ナビ・黄ヒーロー・検索 UI・あるある度メーター・テーマ切替・非公式バッジ。design-log トークン一致 |
| `devrev-aruaru-detail-mock.html` | 詳細。3ブロック・コード dark 固定・出典 note・画像型・前後ページャ |
| `devrev-aruaru-list-ideas.html` | 案 A/C/E 比較。採用方針（A+E）を README に明記 |
| `devrev-aruaru-ogp.html` | OGP 1200×630 + シンプル版（横長/正方形）+ 共有カードプレビュー。**PNG は未同梱**（HTML から書き出し前提） |
| `devrev-aruaru-favicon.svg` | 黄角丸 + 「A」。`web/public/` へのコピーは未実施 |
| `README.md` | 実装要点の索引あり |

**design-log / build-log との整合**: 方針どおり。古い `computer_outputs/` 未配置メモを build-log から更新。

**実装 Phase 0 完了**: モック参照可能。次は Phase 1（トークン + BaseLayout シェル）。

---

### 2026-09-07 — Phase 1 デザイン基盤（Cursor）

**きっかけ**: オーナー「ブログ書くためにもステップバイステップで進めていきましょう」→ Phase 1 着手

**参照モック**: `devrev-aruaru-design-mock.html`（Header/Footer/トークン）

**実施内容**

| 項目 | 変更 |
|---|---|
| `web/src/styles/global.css` | モックの CSS 変数（`--page-*`）+ シェル用コンポーネントクラス |
| `BaseLayout.astro` | Google Fonts、favicon、`hero` スロット、880px wrap、テーマ初期化 script |
| `Header.astro` | 黒ナビ、非公式バッジ、検索アイコン（`/aruaru` リンク）、ThemeToggle |
| `Footer.astro` | 2カラム + disclaimer + 公式出典リンク |
| `web/public/favicon.svg` | モック同型（黄地 + A） |
| テーマ | `html[data-theme="dark"]` + `localStorage`（`aruaru-theme`）+ `prefers-color-scheme` |

**意図的に Phase 2 へ回したもの**

- 黄ヒーロー（トップ・詳細）→ `Hero.astro` + 各ページ
- `AruaruCard` 等のカード UI（旧 slate/amber Tailwind が本文に残る过渡状態）
- 案A カテゴリ窓 / 案E 2ペイン

**検証**: `npm run build` 成功（10 pages）

**ブログ素材メモ**: 「モック CSS をそのまま移植せず、クラス名を site-header / page-main 等に整理した」「テーマは html 要素 + head inline script で FOUC 回避」

**次**: Phase 2 — `FrequencyMeter` / `AruaruCard` / `Hero` コンポーネント

---

### 2026-09-07 — Phase 2 共有コンポーネント + 主要ページ UI（Cursor）

**参照モック**: `design-mock.html`（Hero/Card）、`detail-mock.html`（詳細3ブロック）

**実施内容**

| 項目 | 内容 |
|---|---|
| コンポーネント | `FrequencyMeter`, `TagPill`, `HeroHome`, `HeroDetail`, `SectionBlock`, `EntryPager`, `AruaruCard` 刷新 |
| データ | `entries.json` に `category` + `frequency`(1–3)。`lib/entries.ts` にカテゴリ/関連/前後ヘルパー |
| トップ `/` | 黄ヒーロー（検索 UI・CTA）+ 新着カード + 検証リスト |
| 詳細 | コンパクト黄ヒーロー + 症状/原因/対処 + タグ + 関連 + ページャ |
| 一覧・タグ | 新 `AruaruCard` グリッド（案E 2ペインは Phase 4） |

**entries 暫定値**

- `github-oauth-no-events`: category=Snap-in, frequency=3
- `pr-merge-stage-not-completed`: category=GitHub連携, frequency=2

**検証**: `npm run build` 成功

**次**: Phase 5 — About 刷新、404/空状態、OGP、検索

---

### 2026-09-07 — Phase 4 案A カテゴリ窓 + 案E 2ペイン一覧（Cursor）

**きっかけ**: オーナー「動作が早い方で続き」→ DevTools スクショは見送り、Playwright スクリプト + 実装優先

**参照モック**: `devrev-aruaru-list-ideas.html` 案A（`.cat-windows`）、案E（`.twopane`）

**実施内容**

| 項目 | 内容 |
|---|---|
| `CategoryWindows.astro` | カテゴリごとの窓（タイトルリスト・窓内スクロール・件数バッジ） |
| `AruaruListPane.astro` | 左カテゴリメニュー + 右タイトル行。`?category=` + 軽量 client script |
| `getCategoryGroups()` | `entries.ts` に追加 |
| トップ `/` | 「カテゴリ別で探す」セクション（新着の下） |
| `/aruaru` | カードグリッド → 2ペインに差し替え |
| `global.css` | 案A/E スタイル + モバイル 1 カラム |

**意図**

- カテゴリ窓の「すべて →」は `/aruaru?category=…` へ（2ペインと連動）
- 2ペインは SSG のまま、フィルタのみクライアント（件数が少ないうちは十分）

**検証**: `npm run build` 成功

**スクショ**: `scripts/capture-build-screenshots.mjs` + `docs/internal/build-screenshots/README.md`（Playwright は temp dir 実行、`ARUARU_ROOT` でパス解決）

**次**: Phase 6 — entries 拡充、Pagefind 本格導入（件数増後）、DA-4 公開（別ライン）

---

### 2026-09-07 — Phase 5 About・404・空状態・OGP・検索（Cursor）

**参照**: `design-log.md` バックログ（空状態/404/OGP/検索）、`devrev-aruaru-ogp.html`

**実施内容**

| 項目 | 内容 |
|---|---|
| `404.astro` | 非公式トーンの Not Found + トップ/一覧 CTA |
| `EmptyState.astro` | タグ0件・検索0件・検証0件で再利用 |
| `search.astro` + `searchEntries()` | キーワード部分一致（タイトル/本文/タグ/カテゴリ）。Hero・ナビ検索を `/search` に |
| `about.astro` | 旧 Tailwind → `article-body` + あるある度の説明 |
| `verify/index.astro` | デザインシステムに合わせて刷新 |
| OGP | `BaseLayout` に og/twitter メタ。`web/public/og/*.png` を `export-ogp.mjs` で書き出し |
| `scripts/export-ogp.mjs` | Playwright で OGP HTML から PNG 3点 |

**意図**

- 検索は件数が少ないうちはサーバ側フィルタ（SSG）で十分。Pagefind は entries 10件前後から検討
- OGP URL は `astro.config` の `site` と整合

**検証**: `npm run build` 成功

**次**: entries 拡充、About/検索のスクショ、必要なら Pagefind

---

### 2026-09-07 — ISS-68 へ作業ブランチを分離（Cursor）

**背景**: サイト構築が ISS-67 ブランチに載っていた。ISS-67（スナップイン再構築）は完了済み。Computer が **ISS-68** を起票。

**実施**

- 新ブランチ `feature/ISS-68-aruaru-site`（base: `origin/main`）
- サイト関連コミット（design-log / build-log / Phase 0〜5）を cherry-pick
- `docs/iss-68-aruaru-site.md` を追加

**以降**: コミット・PR に `work-item:ISS-68` / ブランチ名 `feature/ISS-68-*` を使用
