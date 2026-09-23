# DA-10 執筆資料: DevRev Issue の考え方と、このサイトでの使い方

> **用途**: Cursor が【とあるあるあるサイトをつくる】DA-10 を執筆するための社内用資料。公開記事の完成稿ではない。実ID・リポジトリ名は**内部参照専用**。公開時は匿名化・再確認する。
> **基準日**: 2026-09-23。公式説明とプロジェクト記録を照合。現在のステージやデプロイ状況を主張する場合は、執筆時に再確認する。

## まず伝えること

DevRev の **Issue は、作る側・運用する側の作業を記録し、Part（どの製品領域の作業か）に結び付ける仕事の単位**。GitHub の PR はその Issue を実現したコード変更の記録としてつながる。**GitHub Issue と DevRev Issue は別オブジェクト**であり、このプロジェクトでは役割を分けている。公式の Issue / GitHub の説明と、Repo1 の開発方針を参照。[公式: Issues](https://support.devrev.ai/devrev/article/ART-21870) / [公式: GitHub](https://support.devrev.ai/devrev/article/ART-21980) / `docs/devrev-github-issue-policy.md`

### 表1: 似た名前のものをどう使い分けたか

| もの | 一般的な意味 | このプロジェクトでの役割 | 記事で混同しないポイント |
|---|---|---|---|
| **DevRev Issue** | Builder / maintainer の作業をPartと結び付けて追うもの | サイト開発・あるある1件の公開・ブログ記事1本の執筆を管理 | 作業の正本。`ISS-...` は公開稿では実番号を書かない。 |
| **GitHub Issue** | GitHubリポジトリの課題・投稿の受け口 | 外部の人からの「あるあるを投稿・提案」の受け口 | 開発タスクの管理先ではない。DA-2の「投稿の受け口」とつなぐ。 |
| **GitHub PR** | コードやコンテンツの変更を提案・レビュー・マージする単位 | 変更履歴・レビュー・公開用のマージ。Issueの実装記録として連携 | DevRev Issueそのものではない。マージでサイトが公開されるかは別途デプロイの確認が必要。 |

出典: [公式: Core concepts](https://support.devrev.ai/devrev/article/ART-21847)、[公式: Issues](https://support.devrev.ai/devrev/article/ART-21870)、[公式: GitHub](https://support.devrev.ai/devrev/article/ART-21980)、`docs/OPERATIONS.md` §3-4, §11、`docs/devrev-github-issue-policy.md` §1-4。

### 表2: Issueで何を表すか

| 要素 | ひとことで | このプロジェクトの具体例 | 境界・注意 |
|---|---|---|---|
| **Part** | その作業が属する製品・領域 | サイト関連の作業はサイトのPart、ブログ執筆はブログのPart | PartはIssueではない。細分化は必要なときだけ。 |
| **Issue本文** | 何をするか・背景・完了条件 | あるある下書きの場所、確認・公開手順、裏取り根拠 | 「1件＝1 Issue」はこのプロジェクトで選んだ粒度。 |
| **Owner** | 作業責任の所在 | Computerが起票し、担当を設定 | 起票したAIと実装担当が同じとは限らない。 |
| **Stage** | 現在どこまで進んだか | triage → in_development → in_review → completed | 表示名・許可遷移は組織や設定による。in_progressは**ステージ群**にも使われる語で、個別のステージ名とは分ける。 |
| **Timeline** | コメントと変更履歴 | Cursorがdraft表示のブロッカーをコメント、Computerが対応Issueの起票を返信 | 「AI同士の伝言板」はこの事例での利用法。一般機能の必須用途ではない。 |
| **親子リンク** | 大きな作業を小さく分ける | 公開フローの親Issue → 実装Issue・1件公開Issue | 親Issueを「DevRevのEpic」と同義にしない。Enhancementは別の概念。 |
| **依存リンク** | 前提の作業が何かを示す | draft対応実装が終わってから1件公開を進める | 親子＝内訳、依存＝順序。意味が違う。 |
| **Code change** | PRなどの変更実績 | Issue ID を含めたPRがIssueにつながる | 「IssueからPRが自動生成される」とは限らない。 |

出典: [公式: Issues](https://support.devrev.ai/devrev/article/ART-21870)、[公式: Links and dependency management](https://support.devrev.ai/devrev/article/ART-148256)、[公式: GitHub](https://support.devrev.ai/devrev/article/ART-21980)。

### 図1: 外部の「提案」と内部の「公開作業」

```text
外部の人 ──「あるあるを提案」──> GitHub Issue（投稿の受け口）
                                        │ 採用・裏取りは別判断
Computer ──内容の裏取り・draft準備──> DevRev Issue（公開作業）──> Part（サイト）
Cursor   ──変更・レビュー───────────> GitHub PR ───────────────┘
人間     ──draftプレビューの確認──────> 公開に進む判断
```

**説明に使う順番**: 「誰が投稿するか」と「誰が公開作業を管理するか」は異なる → 内部の作業はPartに結び付いたDevRev Issueへ → GitHubのPRはその作業を実現した変更。投稿のGitHub IssueからDevRev Issueが**必ず自動作成される**とは書かない。Repo1 `docs/OPERATIONS.md` §11 と `docs/internal/publish-workflow-notes.md` を参照。

### 図2: このプロジェクトで実走した作業の親子と順序

```text
公開フローの設計を管理する親Issue
  ├─ draft を安全に表示・非公開にする実装Issue  ──┐
  └─ あるある1件を公開するIssue             <──┘ 依存（実装が前提）
       └─ Computer が下書きとIssueを作る → 人間がdraftを確認
          → Cursor がpublished化・PR作成 → レビュー・マージ
```

内部照合: 親 ISS-70、公開 ISS-71、実装 ISS-72（kon-jp）。親子リンクと依存リンクは異なる。初回は**人間のdraft目視確認を省略してしまった**ので、この図は「次回の正しいフロー」。初回に全工程を守れた図として語らない。`docs/internal/verification/ISS-71-draft-gap-2026-09-21.md`、`docs/internal/verification/ISS-71-publish-2026-09-22.md`、`docs/internal/blog-ideas.md` DA-9節を参照。

### 表3: GitHub連携 ― 一般機能と今回の設定

| イベント・表記 | 公式に説明される一般的な動き | このプロジェクトで選んだ運用 | 記事での書き方 |
|---|---|---|---|
| ブランチ名、コミット、PRにIssue ID | 対応するDevRev IssueにGitHub活動を関連付けられる | ブランチ/コミット/PRにIssueの表示IDを入れる。コミット本文では `work-item:ISS-...` を運用 | `work-item:ISS-...` は**本運用の表記例**。唯一の連携形式ではない。公開稿は番号を架空例へ。 |
| PRオープン | 関連Issueのステージ変更先は連携設定に依存 | in_development から in_review に進める | triageのままPRを開くと、この組織では直接遷移が許可されず進まないことがあった。 |
| PRマージ | **既定では完了とは限らない**。公式GitHubガイドの既定例は in_development。 | `issue_stage_on_pr_merge = completed` に設定 | 「マージで自動完了」は**今回の設定と1 Issue＝1作業という粒度**による。一般仕様としない。 |
| 複数PRを1 Issueに関連付け | 関連付け可能 | 今回は原則1記事/1公開作業に対して1PRを想定 | 複数PRなら途中のマージでIssueが完了し得るため、設定を再検討。 |

出典: [公式: GitHub](https://support.devrev.ai/devrev/article/ART-21980)、「この組織」の設定・検証は `docs/devrev-github-issue-policy.md` §7、`docs/OPERATIONS.md` §4。**PRマージ＝配信完了ではない**。Vercel等への反映は別途確認する。

## 記事の組み方（Cursor向け）

1. **導入**: DA-9で下書き→公開を扱ったが、「作業を管理したIssue」をまだ説明していない。ただしDA-9は現時点で下書きなので、公開前に「前回」を確定表現にしない。
2. **表1 → 図1**: GitHub Issue（外部投稿）とDevRev Issue（内部作業）を混同しない導入。
3. **表2**: Part/Stage/Timeline/親子・依存を一気に網羅せず、本文で必要な要素だけ取り出す。公式仕様とプロジェクト固有の選択を区別する。
4. **図2 → 表3**: 実走の1件で、Computerが下書き・起票、Cursorが実装・PR、人が公開前に確認する境界を説明。初回のゲート飛ばしも正直に。
5. **締め**: Issueは「作業の内容」「途中の会話」「変更とのつながり」の居場所。読者に試してもらうのは、まず小さな作業をPart付きIssueで起票し、コード変更との対応を確認すること。

## 執筆前のファクトチェック・編集上の注意

- [ ] DA-9の公開状態とリンク先を確認。未公開なら「前回」「公開済み」と書かない。
- [ ] `DevRev Issue` と `GitHub Issue` の文脈（内部作業 / 外部提案）を区別。両者が自動同期するという誤解を生まない。
- [ ] 「親Issue=Epic」「Issue=Ticket」と言い切らない。IssueとTicketは別種の作業。親子と依存も別。
- [ ] Stageの英語表記は実際の画面と照合。組織固有の遷移を製品全体の既定と混同しない。
- [ ] `work-item:ISS-...` はこのプロジェクトの規約、マージで completed は組織設定。公式ガイドの一般則と分ける。
- [ ] 初回に人間のdraft確認を**飛ばした事実**を隠さない。次回に守るゲートとして扱う。
- [ ] 内部用実ID・顧客名・組織slug・トークン・実リポジトリ名・スクショ上の識別子を公開原稿から除く。
- [ ] DA-10骨子 `blog-ideas.md` の「§5」「§6」「HACK+PLUS」の見出し閉じ忘れを直してから記事本文へ転記。
- [ ] DA-9下書き末尾の「連載はここまで」をDA-10継続方針と合わせて直す（Cursor担当、現在の未コミット変更に注意）。

## 根拠資料

| 用途 | 内部参照先 |
|---|---|
| Issueの一般的な定義・属性・ステージ・親子 | [公式 Issues](https://support.devrev.ai/devrev/article/ART-21870) |
| PartとWorkの区別 | [公式 Core concepts](https://support.devrev.ai/devrev/article/ART-21847)、[公式 Parts & trails](https://support.devrev.ai/devrev/article/ART-21849) |
| 親子と依存の区別 | [公式 Links and dependency management](https://support.devrev.ai/devrev/article/ART-148256) |
| GitHub連携のID参照形式・既定と設定 | [公式 GitHub](https://support.devrev.ai/devrev/article/ART-21980) |
| このリポジトリの管理方針と設定値 | `docs/devrev-github-issue-policy.md`、`docs/OPERATIONS.md` |
| 実走の順序・人間ゲートの反省 | `docs/internal/build-log.md` §2026-09-21〜22、`docs/internal/verification/ISS-71-publish-2026-09-22.md` |
| 公開フローの合意・下書きの項目 | `docs/internal/publish-workflow-notes.md`、`docs/internal/aruaru-draft-guide.md` |
