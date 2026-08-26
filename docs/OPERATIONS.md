# 運用ルール（Repo1 あるある / Repo2 ブログ 共通）

本ドキュメントは、2つのリポジトリを DevRev で管理しながら運用するための**共通ルールのマスター**です。Computer（AIエージェント）と Cursor の両方が、このルールに従って作業します。

- マスター（正）: 本ファイル `devrev-aruaru/docs/OPERATIONS.md`
- 従: `hack-plus/docs/blog-ideas.md` の冒頭から本ファイルを参照する
- 最終更新: 2026-08-26（§2 連載例外・§9 Cursor→hack-plus 指示系統を追加）

---

## 1. 全体構成

```
DevRev (kon-jp)  ← Issue / パーツで両サイトの改善を一元管理
   ├── Part: DevRevあるある（Repo1）
   └── Part: hack-plus 開発ブログ（Repo2, PROD-2）
        │  Issue起票（Computer）→ Cursorで実装 → PR（Issue ID記載）→ ステージ自動遷移
        ▼
GitHub Repo1 / Repo2  ← コードとコンテンツ
        │  publish
        ▼
公開サイト（あるある / ブログ）
```

### リポジトリと主題

| | リポジトリ | 主語 | 役割 |
|---|---|---|---|
| Repo1 | konchangakita-app/devrev-aruaru | **DevRev** | DevRev のハマりどころ・ナレッジそのもの。DevRev 単体のハウツー・あるあるはここ。 |
| Repo2 | konchangakita-com/hack-plus | **AI × Webサイト構築** | AIを使ったWebサイト構築のノウハウ・サイト構成・完成までの過程が主役。DevRev は構築を便利にする脇役として登場。 |

---

## 2. ブログ（Repo2）の主題ポリシー ★最重要

- ブログの**既定の主語は「AIを使ったWebサイト構築」**。AIをどう使ってサイトを設計・実装・公開したか、そのノウハウと過程が主役。
- **既定では DevRev は主役にしない。** 「構築を進めるなかで、タスク管理やGitHub連携にDevRevを使うとこう便利」という**エッセンス／脇役**として登場させる。
- **DevRev 解説が主役化した単発記事**は、Repo1（あるある）側のネタとして扱う（主語がDevRevになるものは Repo1 に置く）。
- ネタを書く／記事にする前にセルフチェック: 「この記事の主語はWebサイト構築か？ DevRevが主役になっていないか？」

### 例外：【とあるあるあるサイト】連載

- hack-plus 内の **「【とあるあるあるサイト】」シリーズ**（`series: devrev-aruaru-site`）は、**DevRev を主語にしてよい**（あるあるサイトの開発・運用・ハマりどころが読者価値の中心）。
- タイトル接頭辞はインパクト重視のシリーズ名。本文では DevRev を前面に出してよい。
- 本線 I/II/III ロードマップの一般記事には §2 の既定ルールを適用する。
- シリーズ固有ルールの正本: `hack-plus/.company/operations/content/series-devrev-aruaru.md`

---

## 3. 役割分担（Computer / Cursor）

| 作業 | 担当 | 備考 |
|---|---|---|
| DevRev パーツの作成・管理 | **Computer のみ** | あるあるネタの Part 整備は Computer が行う |
| DevRev Issue（ISS）の起票 | **Computer のみ** | あるあるネタ・ブログ backlog 等の起票は Computer |
| 起票済み ISS の DevRev 検証 | **Cursor 主** | UI 操作・API 確認・スクショ（PAT 使用可） |
| ブログネタの記録（blog-ideas.md 追記） | **Computer と Cursor 両方** | Cursor は検証中に即メモしてよい |
| Web サイトのスクリーンショット取得 | **Cursor 主** | 公開サイト・DevRev UI とも Cursor |
| サイト／ブログのコード実装 | **Cursor 主** | 実装は Cursor。対応する Issue は Computer が起票 |
| あるある本体の更新（entries.json） | **Computer 主**（Cursor も可） | Computer は devrev-aruaru-add スキルを使用 |

### Cursor への明示指示
- **DevRev の起票・パーツ設定は Computer に委ねる。** あるあるネタの ISS 起票や Part 作成は Cursor から行わない。
- **起票済み ISS の検証では DevRev を操作してよい。** UI 操作・API 確認・スクショ取得に PAT を使う（`devrev-pat-manager --profile kon-jp`）。
- その他 Cursor が行うこと: ブログネタの追記、コード実装、あるある entries.json への追記。

### DevRev スキル（Cursor）

スキル正本は `konchangakita/devrev-sampleapp/skills/`。本リポジトリの `.cursor/skills/` は symlink で参照する。

| スキル | 用途 |
|---|---|
| `devrev-pat-manager` | PAT 解決（`pat-profiles/kon-jp.env`） |
| `devrev-platform-fetch` | ISS 状態・接続・timeline の API 検証 |
| `devrev-snap-in-operations` | スナップイン設定変更時 |

Docker 実行は sampleapp の `skills/` から行う。詳細は `.cursor/rules/` を参照。

---

## 4. 標準フロー（Issue 駆動）

```
1. Computer が DevRev で Issue を起票        → ISS-XX が発行される
2. Cursor がリポジトリのコードを実装         → ブランチ / コミット / PR に ISS-XX を記載
3. PR 作成 → DevRev のステージが自動遷移      → In Review 等
4. マージ → Issue が Completed に自動遷移（1 Issue = 1 作業単位の運用）
```

- ブランチ名・コミット・PR に DevRev Issue ID（`ISS-XX` / `work-item:ISS-XX`）を必ず記載する。
- GitHub 連携の設定・ハマりどころは `devrev-github-issue-policy.md`（§7）を参照。

---

## 5. ブログネタ運用（両方から記録、DevRev 登録は Computer）

### 記録は両方から、DevRev 起票は Computer だけ
- ネタ帳 `hack-plus/docs/blog-ideas.md` は **Computer と Cursor の両方が追記できる単一の真実源**。
- ただし **DevRev のネタ Issue 起票は Computer のみ**が行う。
- **非同期の受け渡し**: Cursor が追記したネタは `DevRev Issue: (未起票)` と書いておく。次に Computer が動いたときに、未起票ネタをまとめて hack-plus 配下に backlog Issue として起票し、番号を書き戻す。

### Computer の自動ルール
- 「DevRevあるある」関連の指示（追加・検証・記事化など）を受けたら、Computer は同時に hack-plus のブログネタを1件準備する。
  - (a) hack-plus（PROD-2）配下に「ブログネタ: 〇〇」Issue を **backlog** ステージで起票。
  - (b) `blog-ideas.md` にも追記。
- 記事化は別途 Issue 化（backlog → prioritized → in_development）して進める。ネタ準備（自動）と記事化（選択）は分ける。

### ネタの記入項目
- 記事の主題（Webサイト構築の何の話か）
- DevRev の絡み方（脇役としてどう登場するか）
- 元になったあるある（あれば）
- 想定タイトル／書ける切り口
- 匿名化の注意点
- ステータス（idea / drafting / published）
- DevRev Issue（起票後に記入。Cursor 追記時は「(未起票)」）

---

## 6. 匿名化ルール ★外部公開の必須事項

両サイトとも外部公開するため、以下の固有情報は公開時に必ず一般化・マスクする。

| 対象 | 例 | 置換の方針 |
|---|---|---|
| DevRev 組織 slug | kon-jp | 「あるDevRev組織」等 |
| Dev ID / 実 DON | DEV-xxx, don:core:... | 記載しない |
| 社内 Issue 番号 | ISS-62 等 | 記載しない or 「あるIssue」 |
| GitHub アカウント名 | konchangakita 等 | 「あるユーザー」等 |
| GitHub Org / リポジトリ実名 | konchangakita-app/... | 一般名に置換 |
| 顧客名・アカウント名 | （実顧客名） | 記載しない |

- 「社内用（実情報あり）」と「公開用（匿名）」を分けて管理する。公開ビルド時に置換を通すのが安全。

---

## 7. パーツ対応（DevRev / kon-jp）

- hack-plus 開発ブログ: PROD-2（Product）
- あるある: 別 Part（必要に応じて Computer が整備）
- ブログネタ Issue のステージ: backlog（ネタ置き場）→ prioritized → in_development（記事化着手）

---

## 8. 関連ドキュメント

- 開発方針（DevRev を唯一の Issue 基盤とする）: `devrev-aruaru/docs/devrev-github-issue-policy.md`
- GitHub スナップイン検証レポート: `devrev-aruaru/docs/github-snapin-verification-report.md`
- ブログネタ帳: `hack-plus/docs/blog-ideas.md`
- 【とあるあるあるサイト】連載ルール: `hack-plus/.company/operations/content/series-devrev-aruaru.md`
- hack-plus 仮想組織（記事制作フロー）: `hack-plus/.company/CLAUDE.md`

---

## 9. Cursor から hack-plus 記事を指示する系統

オーナーは **devrev-aruaru ワークスペースの Cursor** から、hack-plus のブログ記事の方針・執筆・修正を指示できる。hack-plus の `.company/`（company スキル運用）と役割を分け、二重管理を避ける。

### 役割の分担

| 層 | 場所 | 担当すること |
|---|---|---|
| 横断・2リポジトリ | 本ファイル `OPERATIONS.md` | リポジトリ主語、Computer/Cursor/DevRev 分担、連載例外 |
| ネタ帳 | `hack-plus/docs/blog-ideas.md` | 記事ネタ・想定タイトル・ステータス |
| 方針・文体（一般） | `hack-plus/.company/operations/content/style-guide.md` | サイト全体の文体・表記（継続アップデート） |
| 連載固有 | `series-devrev-aruaru.md` | 接頭辞・タグ・frontmatter・修正手順 |
| 制作実行 | `hack-plus/.company/` | 秘書ルーティング → content → サブエージェント → QA → engineering 公開 |
| 記事本体 | `hack-plus/web/content/drafts/` → `articles/` | Markdown 下書き・公開記事 |

**Cursor セッション ≈ オーナーが秘書に相談**（company 運営モード）。方針決定と記録はここから行い、公開フロー・チェックリストは `.company` の既存ワークフローに従う。

### 指示の流れ

```
1. オーナーが Cursor（devrev-aruaru）で方針・ネタ・執筆を指示
2. Cursor が記録
   - ネタ → blog-ideas.md
   - 方針決定 → hack-plus/.company/secretary/notes/YYYY-MM-DD-decisions.md
   - 連載ルール変更 → series-devrev-aruaru.md（必要時）
3. 執筆 → web/content/drafts/ に下書き
   - 連載は series-devrev-aruaru.md の frontmatter 必須項目に従う
4. レビュー・公開 → hack-plus .company の記事作成フロー（変更しない）
   - draft-content-reviewer → draft-design-reviewer → QA → engineering
5. DevRev Issue 起票が必要な場合 → Computer に委ねる（Cursor は起票しない）

### サイト構成作業と DA-1 の並行（自動）

devrev-aruaru で**あるあるサイトの構成**（サイトマップ・ページ設計・AI との設計対話など）を始めたセッションでは、オーナーが「記事」と言わなくても次を**同セッションで**行う。

1. `series-devrev-aruaru.md` と `blog-ideas.md`（DA-1）を参照
2. 構成の議論を進める（entries 詳細・サイト URL 掲載は不要）
3. 決定事項を `secretary/notes/YYYY-MM-DD-decisions.md` に記録
4. 議論ログを `hack-plus/web/content/drafts/` の下書きに反映（frontmatter はシリーズルール準拠）
5. `blog-ideas.md` の DA-1 を `drafting` に更新

`.cursor/rules/project-operations.mdc` に同内容を記載（新セッション向け）。
```

### 修正の方法

| 変更の種類 | 正本の更新 | 記事ファイル |
|---|---|---|
| 接頭辞・タグ・series ルール | `series-devrev-aruaru.md` | 該当下書き／公開記事を追随修正 |
| 文体・トーン（全体） | `style-guide.md` | 必要に応じて既存記事を順次修正 |
| ネタ・タイトル案 | `blog-ideas.md` | drafts の title / frontmatter |
| 下書きの内容 | — | `web/content/drafts/` を直接編集 |
| 公開済み記事（軽微） | — | `web/content/articles/` を編集（事実誤認・リンク切れ等） |
| 公開済み記事（構成・時制・大改稿） | — | drafts に戻してフロー再通過を推奨 |

### Computer / Cursor の境界（再掲）

- **Computer**: DevRev Issue 起票、Part 整備、未起票ネタの backlog Issue 化
- **Cursor**: ネタ追記、下書き執筆、`.company` ルール更新、あるあるサイト実装、起票済み ISS の検証

---

## 10. あるあるサイト — ローカル開発ポート

`konchangakita-com` ワークスペースは **3001–3099** を予約している。本リポジトリ（`konchangakita-app/devrev-aruaru`）は別レンジを使う。

| 項目 | 値 |
|---|---|
| ローカル Web（docker-compose） | **3101** |
| 正本（konchangakita-com） | `hq/.company/secretary/notes/2026-05-11-docker-port-allocation.md`（3001–3099 のみ） |

```bash
docker compose up   # → http://localhost:3101
```

---

## 11. あるあるサイト — 投稿・採用フロー（GitHub 経由）

サイトは **静的**のまま。ユーザー投稿は Web フォーム・認証・DB を使わず、**GitHub** で受け付ける。

### 一般ユーザー（推奨入口）

**GitHub Issue**（テンプレート付き）— PR よりハードルが低い。

1. リポジトリの「あるあるを投稿」Issue テンプレートを開く
2. 症状・原因・対処・再現手順を記入して送信
3. メンテナが内容を確認・匿名化
4. メンテナ（または Cursor）が `entries.json` / 検証記事を **PR** で追加
5. マージ → Vercel が再ビルド → サイトに反映

一般ユーザーが **直接 PR を書く必要はない**（書ける人は PR も可）。

### 上級者・コントリビュータ

**GitHub PR** — fork → `entries` や検証 Markdown を追加 → PR。

- テンプレート・スキーマに沿っていればそのままレビュー
- 匿名化が必要な記述はレビューで修正

### DevRev Issue の位置づけ（社内）

**外部ユーザー向けではない。** 社内の検証・起票・ステージ管理用。

| 場所 | 誰が使う | 用途 |
|---|---|---|
| GitHub Issue | 一般ユーザー・コントリビュータ | あるあるの **投稿・提案** |
| GitHub PR | メンテナ・上級コントリビュータ | コンテンツの **反映** |
| DevRev ISS | Computer / 社内メンバー | 検証タスク・改善の **管理**（起票は Computer） |

サイトの About / CONTRIBUTING には **GitHub Issue へのリンク**を載せる（DevRev は載せない）。

### Astro との整合

投稿が GitHub 経由であれば、公開サイトはビルド時静的生成のまま。**Astro 継続で問題なし。**
