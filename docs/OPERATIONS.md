# 運用ルール（Repo1 あるある / Repo2 ブログ 共通）

本ドキュメントは、2つのリポジトリを DevRev で管理しながら運用するための**共通ルールのマスター**です。Computer（AIエージェント）と Cursor の両方が、このルールに従って作業します。

- マスター（正）: 本ファイル `devrev-aruaru/docs/OPERATIONS.md`
- 従: `hack-plus/docs/blog-ideas.md` の冒頭から本ファイルを参照する
- 最終更新: 2026-08-26

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

- ブログの**主語は「AIを使ったWebサイト構築」**。AIをどう使ってサイトを設計・実装・公開したか、そのノウハウと過程が主役。
- **DevRev は主役にしない。** 「構築を進めるなかで、タスク管理やGitHub連携にDevRevを使うとこう便利」という**エッセンス／脇役**として登場させる。
- **DevRev 解説が主役化したら、それは Repo1（あるある）側のネタ。** 主語がDevRevになるものは Repo1 に置く。
- ネタを書く／記事にする前に必ずセルフチェック: 「この記事の主語はWebサイト構築か？ DevRevが主役になっていないか？」

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
