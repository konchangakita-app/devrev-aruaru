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
> - ネタ帳（連載 ID のメモ）→ [`blog-ideas.md`](./blog-ideas.md)（**構築中は Repo1 正本**。完成後 hack-plus へ統合）
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
- [x] entries 10 件前後 — 2026-09-07 Phase 6（10件）
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

---

### 2026-09-07 — Phase 6 entries 拡充 + Phase 5 画面スクショ（Cursor）

**実施内容**

| 項目 | 内容 |
|---|---|
| `entries.json` | 2件 → **10件**（Computer / SQL / Snap-in / GitHub連携）。list-ideas モックと検証知見ベース |
| 検索・タグ | 新カテゴリ・タグページが SSG で生成（22 pages） |
| `HeroHome` | よく見られているタグを Computer / SQL 等に更新 |
| スクショ | `phase-5-6/` — search, about, 404, 2ペイン（SQL） |
| `capture-build-screenshots.mjs` | `CAPTURE_PHASE=5-6` 対応 |

**Pagefind**: 10件到達。現状は SSG + `searchEntries()` で十分。全文 index は entries 増加・執筆フロー確定後に検討

**検証**: `npm run build` 成功（22 pages）

**次**: Pagefind 検討、トップ/一覧の再スクショ（10件反映）、PR 作成

---

### 2026-09-15 — トップ UX 仕上げ：ヒーロー圧縮・カードクリック・リンク色（Cursor）

**きっかけ**: オーナー「ローカル構築中のサイトを起動して確認」→ 現状把握後、トップの黄ヒーローが小画面で長く「新着あるある」まで遠い、カードはタイトルだけリンク、リンクホバーが黄色下線で違和感、との修正依頼が続いた。

**実施内容**

| 項目 | 内容 |
|---|---|
| カード全体クリック | `AruaruCard` に stretched link。タグは `z-index` で独立クリック維持 |
| リンクホバー色 | 黄色（`--accent`）下線 → `--link-underline`（muted）。カード・verify・section-head・article-body |
| ヒーロー文言 | eyebrow「Unofficial Knowledge Site」削除。h1 を1行「DevRevでつまずいたを、次の人の糧に」。リード2行（句点なし） |
| ヒーローサイズ | モック比で大きすぎたため段階調整：コンパクト化 → 70–80% → +10% → 縦+20% → 検索欄幅130%（`max-width: 601px`） |
| レスポンシブ | `@media (max-width: 640px)` で `.hero--home` 専用の padding / タイポ / 余白。ヒーロー下 `section.block` の上 padding も短縮 |

**サイズ調整の経緯（事実）**

- 初回: Phase 1 モック相当の `76px/68px` padding がそのまま残っていた感 → `.hero--home` 専用スタイルで分離
- オーナー「70–80%くらい」→ padding / フォント / margin を約75%に
- 「10%大きく」→ 全体約110%
- 「縦幅20%大きく」→ 縦方向 spacing のみ約120%（フォントサイズは据え置き）
- 「検索欄横幅130%」→ `462px` → `601px`

**意図**

- ヒーローは世界観の演出だが、**ナレッジサイトでは一覧への到達距離が優先**。黄帯は残しつつ縦を削る
- カード全体クリックは一覧 UX の定番。タグだけ別リンクは stretched link パターンで両立
- 本文エリアのリンクに黄色下線は「CTA/ブランド」と混同しやすい → muted に統一

**コミット**: `8446157` — `feat(web): compact home hero and improve aruaru card UX work-item:ISS-68`

**検証**: ローカル `npm run dev`（:3101）で確認。本番は未デプロイ（main マージ前）

**ブログ記録**: 同日、`docs/internal/blog-ideas.md` を Repo1 正本として新設（構築中は hack-plus へ書かない方針に統合）。DA-6 候補を同ファイルに記載

**ブログ素材メモ**: 「モック通りのヒーローを載せたら小画面で長すぎた」「AI と数値で size を往復調整した」「stretched link でカード全体クリック + タグ独立」の3点が記事ネタになりやすい

**次**: PR 作成、10件反映後の再スクショ、本番デプロイ

---

### 2026-09-16 — ISS-69 検索機能: ブランチ作成・ベースライン記録（Cursor）

**きっかけ**: Computer が DevRev Issue **ISS-69** を起票し、`docs/internal/search-feature-notes.md` に設計メモを残した。オーナー「作業用ブランチを作成、ブログ用メモとスクショを取得しながら進める」。

**ブランチ**: `feature/ISS-69-search`（base: `main` @ PR #7 マージ後）

**現状の検索実装（実装前ベースライン）**

| 項目 | 状態 |
|---|---|
| トップヒーロー検索窓 | `HeroHome.astro` → `/search?q=` に GET 送信 |
| ナビ虫めがね | `Header.astro` → `/search` へリンク |
| 検索ページ | `search.astro` + `searchEntries()` |
| マッチング | `entries.json` 全文を `join(' ').includes(q)` の**部分一致のみ**（ファジー・重み付けなし） |
| フィールド | title / symptom / cause / fix / category / tags（`solution` は `fix` キー） |

**ISS-69 で詰める論点**（`search-feature-notes.md` 要約）

1. Fuse.js（クライアント・軽量） vs Pagefind（ビルド時 index）— 段階移行候補
2. フィールド重み付け、絞り込み併用、UI 挙動（インクリメンタル vs 結果ページ）
3. CSP 制約（ランタイムネット不可）、日本語トークナイズ

**スクショ**: `docs/internal/build-screenshots/phase-69/` — 実装前の検索 UI・結果あり/なし

**次**: Fuse.js / Pagefind の PoC → 方針決定 → 実装

---

### 2026-09-16 — ISS-69 Phase 1: Fuse.js クライアント検索（Cursor）

**方針決定**: 設計メモの段階移行案を採用。**まず Fuse.js**（10件・CSP・静的配信向け）。Pagefind は件数増加後。

**問題（ベースライン）**: `search.astro` の `searchEntries()` はビルド時 SSG のため、`?q=` が本番/プレビューで効かない。開発でも `/search` と `/search/` の差でクエリが落ちることがあった。

**実装**

| 項目 | 内容 |
|---|---|
| `fuse.js` | `web/package.json` に追加 |
| `search-fuse.ts` | 重み付け keys（title 0.35, tags 0.25, category 0.15, symptom/cause/fix）, threshold 0.35 |
| `search-page.ts` | クライアントで URL `q` を読み取り結果描画。静的ビルドでも動作 |
| `search.astro` | entries JSON を `application/json` で埋め込み、結果は JS 描画 |
| リンク統一 | ヒーロー・ナビ・タグ空状態 → `/search/` |

**開発環境**: `docker compose up` 正規。`fuse.js` はコンテナ `node_modules` 用に **image rebuild** が必要。`astro dev` ロックは `.astro/dev.json` 削除 or `npm run dev -- --force` で回避。

**検証**: `http://localhost:3101/search/?q=GitHub` → 4件表示、document.title 更新。`npm run build` 成功（22 pages）。

**次**: インクリメンタル検索（ヒーロー）、絞り込み併用、phase-69 実装後スクショ、PR

---

### 2026-09-16 — 検索結果画面の2ゾーン色分け（Cursor）

**きっかけ**: オーナー「検索結果」と入力バーと結果リストが同じ面に見える → **色分けした方が見やすいかも**。

**方針**: トップの黄ヒーローほど強くしない。**カード面（操作）＋薄いグレー面（結果）** の2段。一覧の2ペイン（左メニュー=カード、右リスト=行カード）と同系の「領域の切り分け」。

| ゾーン | クラス | 背景 | 内容 |
|---|---|---|---|
| 上（操作） | `.search-toolbar` | `--card-bg`（白/ダーク面） | 見出し・件数・検索フォーム・ヒント |
| 下（結果） | `.search-body` | `--tag-bg`（薄グレー） | 「一致したあるある」ラベル + 結果行 / EmptyState |

- 外枠 `.search-page` で1枚のパネルにまとめ（border-radius 14px）
- 検索フォームは toolbar 上で `--page-bg` にして入力欄を浮かせる
- 未検索時は `search-body` を非表示（ツールバーのみ）

**意図**: 見出しと入力は「操作」、その下は「読む場所」と一目で分ける。黄帯はトップ専用のまま。

**次**: オーナー目視 → 濃さ・ラベル文言の調整、ダークモードスクショ

**調整（同日）**: コントラスト強化 — `--search-toolbar-bg` / `--search-body-bg` 専用トークン（ライト: 白 vs `#e6e4e1`、ダーク: `#2c2a2b` vs `#161616`）。境界に黄 3px ライン、結果行は白カードで浮かせる。

---

### 2026-09-21 — ISS-69 検索結果 UI リデザイン（Cursor）

**きっかけ**: 2ゾーン色分けの意図は正しいが、外枠カード＋黄ライン＋矩形フォームの組み合わせが「箱の中の箱」感でイケてない。デザイン言語をサイト全体に揃える。

**方針（デザインチーム合意）**

- **2ゾーンは維持**: 上＝操作（ページ背景）、下＝結果（muted 全幅バンド）
- **外枠カードを廃止**: 1枚パネル＋shadow をやめ、編集系サイトの「入力エリア → 結果リスト」構成に
- **検索フォーム**: ヒーローと同じ `hero-search` ピル型（黒枠・黒ボタン）に統一
- **結果カード**: `pl-row` 流用をやめ、トップの `AruaruCard` 系（黄上線・症状1行）の `.search-hit` に
- **見出し整理**: toolbar は常に「あるあるを検索」。結果帯は `「q」で N 件` の mono メタのみ
- **黄 3px 境界線を削除**: 背景差のみでゾーン分離

**変更ファイル**: `search.astro`, `search-page.ts`, `global.css`（search セクション）

**次**: オーナー目視、ダークモードスクショ、PR

---

### 2026-09-21 — あるある詳細ページ「読むモード」リデザイン（Cursor）

**きっかけ**: 詳細ページがトップと同じ黄ヒーロー＋グレー地の平坦配置で、一覧から入ったとき「またトップ？」と感じて読みにくい。

**デザインチーム方針**

| ページ | 役割 | 黄の使い方 |
|---|---|---|
| トップ | 発見・回遊 | 大ヒーロー＋カード一覧 |
| 詳細 | 読む・理解 | **黄ヒーローなし**。黄は対処ラベル・左線アクセントのみ |
| 検索 | 探す | 操作エリア＋結果バンド（ISS-69 で確立） |

**実装**

- 黄 `hero-band` を廃止 → `entry-header`（パンくず・タイトル・メタはページ背景上）
- 本文は検索結果と同型の **muted 全幅バンド** ＋ 白 `entry-sheet`
- 症状/原因/対処はシート内の **左アクセント付きブロック**（黒 / グレー / 黄）
- 関連・ページャもシート内に収める

**変更**: `HeroDetail.astro`, `aruaru/[slug].astro`, `global.css`

**次**: オーナー目視、ダークモード、design-mock 更新検討

**追記（同日）**: 症状/原因/対処は **qflow--flat**（箱なし・横線区切り）に落ち着き。ラベルピル＋ヒント行、対処のみ左黄線。タグはシート上部へ移動。番号付きタイムライン案は不採用。

**スクショ（同日）**: `docs/internal/build-screenshots/phase-70/` — 検索リデザイン後（空/結果/0件・ライト/ダーク）+ 詳細読むモード（ライト/ダーク）+ DA-6 トップコンパクト（09-10）+ 検索0件ダーク（08）。`phase-69/` は実装前ベースラインのまま（Before/After 比較用）。

---

### 2026-09-21 — ISS-71 検証開始: draft 未対応でブロック（Cursor）

**きっかけ**: オーナー「ISS-71 であるある一件とおす検証」。ISS-70 公開ワークフローの初回ドッグフーディング（Slack同期あるある）。

**ISS-71 状態（API）**: triage / Open。Computer 担当分（`entries.json` draft 追記 + ISS 起票）完了。

**ブロッカー発見**: `status: "draft"` は JSON にあるがサイト未対応。

- `entries.ts` に `status` なし、`getEntries()` は全件返す
- `npm run build` で `/aruaru/slack-devrev-conversation-sync/` が通常ページとして生成
- ISS-70 Step 3「サイト（プレビュー）で確認」が成立しない

**判断**: 先に Computer へフィードバック。`status` サイト対応 ISS の起票を依頼（Cursor は起票しない）。ISS-71 公開 PR はその後。

**記録**: `publish-workflow-notes.md` フィードバック節、`verification/ISS-71-draft-gap-2026-09-21.md`、ISS-70/71 タイムラインコメント。

---

### 2026-09-21 — ブランチ整理 + ISS-72 draft 対応実装（Cursor）

**ブランチ整理**:
- `feature/ISS-69-search` → PR #8 マージ済み。`main` に切替・pull、旧ブランチ削除
- `feature/ISS-72-draft-status` を `main` から新規作成

**ISS-72 実装**:
- `entries.ts`: `status` フィールド、 `getEntries()` フィルタ、`PUBLIC_SHOW_DRAFTS` / dev プレビュー
- 本番ビルド 22 ページ（draft 除外）、プレビュービルド 25 ページ（draft 含む）

**次**: PR（`work-item:ISS-72`）→ ISS-71 公開フロー再開

---

### 2026-09-22 — ISS-72 マージ + ISS-71 公開 PR（Cursor）

- PR #9 マージ（ISS-72）。DevRev ISS-72 → in_review
- Computer へ ISS-71/72 タイムライン通知（プレビュー手順・ガイド更新依頼）
- `feature/ISS-71-publish-slack`: Slack あるある `status: published` 化
- 本番ビルド 25 ページ、slack ページ・タグ生成確認

---

### 2026-09-22 — ISS-71/72 完走・初回ドッグフーディング完了（Cursor）

**マージ**:
- PR #9（ISS-72）→ DevRev ISS-72 completed
- PR #10（ISS-71）→ DevRev ISS-71 completed

**フロー上の学び（ブログネタ DA-9 に追記）**:
- Step 3「人間: dev で draft プレビュー確認」は **published 化の前** が正しいタイミング
- 今回は Step 3 を省略して ISS-71 公開 PR まで一気に進めた → 次回以降は必須ゲートにする
- ISS-72 実装: 本番 22 ページ（draft 除外）/ プレビュー 25 ページ（`npm run dev` or `PUBLIC_SHOW_DRAFTS=true`）

**次**: Computer ターン（ガイド Step 6 追記・次の draft 準備）。Cursor は ISS 起票待ち。

---

### 2026-09-23 — DA-10 骨子作成・記事執筆 ISS は Computer 判断（Cursor）

**きっかけ**: オーナー「DevRev Issue の説明と Computer による ISS 起票を DA-10 で書きたい。骨子を作り、ISS 起票は Computer に任せる」

**実施**:
- `docs/internal/blog-ideas.md` に **DA-10 候補**（見出し骨子 §1〜§6 + HACK+PLUS 案 + Computer 引き渡し表）を追加
- DA-9 は公開パイプライン（下流）、DA-10 は Issue 説明＋起票（上流）の役割分担を明文化
- 記事執筆 ISS: **`(未起票)`** — 起票要否・親 ISS・タイミング・タイトル確定は Computer 判断（Cursor は起票しない）

**Computer ターン待ち**:
- DA-10 執筆 ISS 起票（参考: 親 ISS-73、acceptance は blog-ideas DA-10 節）
- 起票後 Cursor が hack-plus 下書き執筆へ

---

### 2026-09-24 — favicon を吹き出し案に差し替え（Cursor）

**きっかけ**: オーナーが比較画像 `devrev-aruaru-favicon-a-options.png` の右案（黒地＋黄吹き出し＋「あ」）を採用

**実施**:
- `docs/internal/design-mocks/devrev-aruaru-favicon-chat.svg` を `web/public/favicon.svg` に適用
- 16/32/48/64px を含む正しい ICO を生成し `web/public/favicon.ico` を差し替え（旧ファイルは PNG 偽装だった）
- `BaseLayout.astro` に ICO フォールバック `<link rel="icon" href="/favicon.ico" sizes="any" />` を追加
- `npm run build` で `dist/favicon.svg` / `dist/favicon.ico` の出力を確認

**検証（2026-09-24 ローカルコンテナ）**:
- `podman compose up --build -d` → http://localhost:3101 で Astro dev 起動
- `/favicon.svg` 200 `image/svg+xml`、黒地＋黄吹き出し＋「あ」の内容を確認
- `/favicon.ico` 200 `image/x-icon`、MS Windows icon resource（16/32/48/64）を確認
- HTML に ICO/SVG の `<link rel="icon">` 2件を確認
- ブラウザタブでも吹き出し案の favicon が表示されることを確認

---

### 2026-09-24 — DA-6 執筆準備（Cursor）

**きっかけ**: オーナー「hack-plus であるある記事 6 本目対応。ブランチ切って準備」

**実施**:
- hack-plus `feature/ISS-75-da6-review` を `main` から作成
- 下書き `20260925-devrev-aruaru-hero-ux-da6.md` に Before/After スクショ3枚を埋め込み
- 画像: `da6-before-top.png`（phase-1-2）/ `da6-top-light.png`・`da6-top-dark.png`（phase-70）
- 検証ログ `docs/internal/verification/ISS-75-da6-draft-2026-09-24.md` を起票
- `blog-ideas.md` DA-6 を `in_development` に更新

**次**: draft-content-reviewer → オーナー確認 → ファクトチェック → 公開
