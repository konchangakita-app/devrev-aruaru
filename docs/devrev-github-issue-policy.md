# 開発方針：DevRev を唯一の Issue 管理基盤とする

本ドキュメントは、本リポジトリ（`konchangakita-app/devrev-aruaru`）における開発フローの方針を定めるものです。**開発メンバーは本方針を遵守してください。**

- 対象: 本リポジトリで開発を行う全メンバー
- 前提: 本組織は DevRev をメインの開発基盤とし、GitHub for DevRev スナップインを利用します
- 最終更新: 2026-08-25

---

## 1. 基本方針（結論）

| 項目 | 方針 |
|---|---|
| Issue 管理 | **DevRev に一本化する** |
| GitHub Issue | **使わない**（起票・運用しない） |
| GitHub | コード（ブランチ / PR / コミット）専用の場として使う |
| 利用スナップイン | GitHub for DevRev スナップイン |
| 連携方式 | ブランチ名・コミット・PR に DevRev の Issue ID（`ISS-XXX`）を記載する |

**Issue の起票・優先度づけ・トリアージ・ステータス管理は、すべて DevRev 側で行います。GitHub 側で Issue を立てないでください。**

---

## 2. 背景：設計思想（なぜこの方針なのか）

DevRev は開発作業を 2 つのレイヤーに分けて管理します。

- **Issue** = 「何を・なぜ作るか」という作業の意図・単位（プランニングの対象）
- **code change** = 「どう実装したか」というコードの変更事実（PR / コミットの記録）

GitHub for DevRev スナップインは、GitHub の PR を DevRev の **code change オブジェクト**として取り込みます。PR は「DevRev Issue に写し替えるもの」ではなく、「Issue に紐づく実装エビデンス」として別オブジェクトとして扱われます。

このため、**GitHub Issue と DevRev Issue の同期は行いません**。連携するのは GitHub の「コード活動（ブランチ・コミット・PR）」であり、GitHub Issue ではありません。

### この設計を採用する理由

1. **Single Source of Truth の分離**
   Issue（計画・トリアージ・優先度・顧客との紐付け）は DevRev が正、コード変更は GitHub が正。両方で Issue を持つと、どちらが真実か曖昧になり、ステータス衝突・二重管理・同期ループが起きる。

2. **コードが Issue の State を駆動する**
   ブランチ / コミット / PR のライフサイクルに応じて Issue のステージが自動遷移する（In Development → In Review → Completed）。開発者が手でステータスを更新する必要をなくし、コード活動を唯一の信号源にする。

3. **Support と Product を 1 つのグラフで繋ぐ**
   顧客の Ticket（サポート）→ Issue（開発）→ code change（実装）→ リリースを 1 つのナレッジグラフで繋ぐ。Issue は顧客課題と開発の接続点であり、DevRev 側に置くことに意味がある。

4. **トレーサビリティの粒度（1 Issue : N code change）**
   1 つの Issue に複数の PR・複数リポジトリの変更が紐づくのが通常。code change を独立オブジェクトにすることで、PR ごとに作成者・レビュアー・承認・変更行数 / ファイルまで記録し、Issue に複数ぶら下げられる。

> 補足: 「GitHub Issue そのものを DevRev に持ち込みたい / 移行したい」ニーズには、別スナップイン **GitHub Issues AirSync**（Issue 双方向同期）が存在します。ただし本リポジトリでは **DevRev をメインとし、GitHub Issue は使わない** 方針のため、AirSync は利用しません。

---

## 3. 開発メンバーが守るルール

### 3.1 Issue は DevRev で起票する
- 作業を始める前に、必ず DevRev 側で Issue（`ISS-XXX`）を起票する。
- GitHub Issue は起票しない。

### 3.2 ブランチ名に Issue ID を含める
- ブランチ名に対象 Issue ID を含めること。
- 例: `feature/ISS-1234-add-login`, `fix/ISS-1234-crash-on-start`

### 3.3 コミットメッセージに Issue ID を含める
- コミットメッセージに `work-item:ISS-XXX` を含めること。
- 例: `git commit -m "add login form work-item:ISS-1234"`

### 3.4 PR に Issue ID を記載する
- PR タイトルまたは本文に対象 Issue ID を記載すること。
- 推奨: タイトルに `[ISS-XXX]`、本文に `work-item:ISS-XXX`。
- 1 つの Issue に複数 PR を紐づけてよい。関連する Issue ID をすべて記載する。

### 3.5 GitHub アカウントを DevRev に紐付ける
- 各メンバーは DevRev の **Settings > Account > External Identities > Link GitHub Account** で GitHub アカウントを連携すること。
- 未連携だと、コード活動が正しく Issue に反映されない場合がある。

---

## 4. 標準ワークフロー

```
1. DevRev で Issue を起票        → ISS-XXX が発行される
2. ブランチを作成               → feature/ISS-XXX-...
                                  （Issue が In Development に自動遷移）
3. 実装・コミット               → コミットに work-item:ISS-XXX
4. PR を作成                    → タイトル [ISS-XXX] / 本文 work-item:ISS-XXX
                                  （Issue が In Review に自動遷移 + code change 生成）
5. レビュー・承認               → （設定に応じてレビュアータスクが自動完了）
6. PR をマージ                  → Issue が Completed に自動遷移（本運用の設定。詳細は「7. セットアップと運用上の注意」参照）
```

開発者は手動で Issue のステータスを更新する必要はありません。**コード活動がステージを自動で駆動します。**

> 注: 上記のステージ遷移先（In Development / In Review / マージ後）は、いずれもスナップインの設定値で決まります。**本運用では「マージ＝Completed」に設定**しています（1 Issue = 1 作業単位のため）。既定でマージ＝完了とは限らない点、および設定の考え方は「7. セットアップと運用上の注意」を参照してください。
> Issue が triage のままの場合は、PR 作成前に In Development へ手動遷移が必要です（§7.2 参照）。

---

## 5. やってはいけないこと（アンチパターン）

- GitHub Issue を起票して課題管理に使う。
- DevRev の Issue を作らずにブランチ / PR だけで作業を進める（トレーサビリティが失われる。※どうしても必要な場合は Autonomous Issue 機能で自動生成されるが、原則は事前起票）。
- ブランチ名・コミット・PR に Issue ID を書き忘れる（ステージが自動遷移しない）。
- GitHub アカウントの DevRev 連携をしないまま作業する。

---

## 6. まとめ

本リポジトリでは、**DevRev を唯一の Issue 管理基盤**とし、GitHub はコードの場として使います。開発者は「DevRev で Issue を起票し、ブランチ / コミット / PR に Issue ID を書く」だけでよく、あとはスナップインがステージ遷移と実装記録（code change）を自動化します。これにより、顧客課題から実装までを 1 本のグラフで追跡でき、二重管理を防げます。

---

## 7. セットアップと運用上の注意（ハマりどころ）

本リポジトリでのスナップイン検証で判明した、つまずきやすいポイントです。

### 7.1 接続は PAT を使う（OAuth接続だと Org 配下のイベントが届かない）

- GitHub スナップインを **OAuth で接続すると、GitHub 個人アカウントの認証止まり**になり、対象の Organization / リポジトリを選択できないことがある。
- その場合、Organization 配下（本リポジトリ `konchangakita-app/devrev-aruaru` など）のブランチ / PR / コミットのイベントが **DevRev に一切届かず**、ステージ自動遷移も code change 生成も起きない。
- **対策: PAT（Personal Access Token）接続を使う。** 対象リポジトリに最低 write 権限を持つアカウントで Classic PAT を発行する。
  - 必要スコープ: `repo` / `read:org` / `user`
  - SSO 有効な Org では、PAT 発行後に「Configure SSO」で Org を承認すること。
- 切り分けの目安: Issue の `last_code_activity` が **null のまま**なら、そもそもイベントが届いていない（＝接続・Org 到達性の問題）。

### 7.2 Issue が triage のままだと In Review に自動遷移しない

- 接続が正常でも、Issue が **triage** のままだと PR を open してもステージが変わらないことがある。
- 原因: DevRev のステージ遷移は許可された経路に従い、**triage → in_review の直接遷移は許可されていない**。
- **対策: 開発着手時に Issue を triage に放置せず `In Development` まで進めておく。** In Development の状態で PR を open すれば In Review に自動遷移する。
- 補足: 既に open 済みの PR へ push（更新）しても open トリガーは再発火しない。遷移を確認したい場合は、新規 PR の open、または close → reopen で open イベントを発生させる。

### 7.3 PR マージ＝Issue 完了とは限らない（マージ後のステージは設定次第）

- 「GitHub で PR をマージすれば Issue が自動で Completed になる」と考えがちだが、**マージ後の遷移先はスナップイン設定 `issue_stage_on_pr_merge` で決まる**。既定でマージ＝完了とは限らない。
- **本運用の設定（2026-08-25 時点）:**
  - `issue_stage_on_pr_open` = `in_review`（PR 作成でレビュー中へ）
  - `issue_stage_on_pr_merge` = **`completed`**（マージ＝作業完了。1 Issue = 1 作業単位の粒度に合わせて採用）
  - `issue_stage_on_pr_close` = `in_development`（マージせず閉じた PR は差し戻し扱い。Completed にはしない）
- **注意**: 1 Issue に複数 PR がぶら下がる運用を始める場合、`completed` だと途中の PR マージで Issue が閉じてしまう。その場合はマージ後ステージを見直す。
- 挙動を疑う前に、まず `issue_stage_on_pr_open` / `issue_stage_on_pr_merge` / `issue_stage_on_pr_close` の各設定値を確認する。

### 7.4 レビュアータスク生成には実在アカウント＋DevRev紐付けが必要

- スナップインのレビュアータスク生成（`create_task_for_pr_reviews`）を使うには、次の両方が必要。
  1. PR のレビュアーに指定できる **実在の GitHub アカウント**（対象リポジトリ / Org にアクセス権があること。PR 作成者自身はレビュアーにできない）。
  2. そのアカウントが **DevRev ユーザーに紐付いている**こと（Settings > Account > External Identities > Link GitHub Account）。
- 存在しないアカウント名はレビュアーに指定できず、PR にレビュアーが付かないため DevRev 側のタスク生成も発生しない。
- 両方が揃って初めて、PR へのレビュアー指定 → Issue 配下のレビュアータスク自動生成 → 承認 / 却下 / クローズでの自動完了、が機能する。
