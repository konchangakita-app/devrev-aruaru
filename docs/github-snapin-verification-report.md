# GitHub for DevRev スナップイン 動作検証レポート

本レポートは、GitHub for DevRev スナップインの動作検証結果をまとめたものです。

- 検証日: 2026-08-25
- 検証者: 近藤暁（Satoru Kondou）
- DevRev 組織: kon-jp
- GitHub リポジトリ: konchangakita-app/devrev-aruaru
- テスト用 Issue: ISS-62「GitHubスナップイン動作テスト」

---

## 1. 検証サマリー

| # | テスト項目 | 結果 |
|---|-----------|------|
| 0 | テスト用 Issue 作成（ISS-62） | ✅ 完了 |
| 1 | GitHub → DevRev イベント到達 | ✅ 完了（OAuth → PAT 接続で解決） |
| 2 | PR と Issue のリンク作成 | ✅ 完了 |
| 3 | コード活動の記録（last_code_activity） | ✅ 完了 |
| 4 | PR open → In Review 自動遷移 | ✅ 完了（triage からは不可、in_development 以降で発火） |
| 5 | PR close → in_development | ✅ 完了（設定どおり） |
| 6 | PR merge → completed | ⏳ 設定変更済み（2026-08-25 に completed へ）。旧設定 in_development での挙動は検証済み、新設定での再検証は次回 |
| 7 | レビュアータスク生成 | ⚠️ 未実施（実在レビュアーアカウント＋DevRev 紐付けが必要） |

**結論: スナップインのコア動作（イベント到達・リンク・コード活動記録・ステージ自動遷移）は正常に機能することを確認。** レビュアータスク生成のみ、テスト環境の制約により未実施。

---

## 2. スナップインの現在の設定（kon-jp）

現在の主要設定値（2026-08-25 更新）。

| 設定キー | 値 | 意味 |
|---|---|---|
| `issue_stage_on_pr_open` | `in_review` | PR open 時に In Review へ |
| `issue_stage_on_pr_merge` | `completed` | PR マージ時に Issue を完了に（2026-08-25 に in_development から変更） |
| `issue_stage_on_pr_close` | `in_development` | PR をマージせず閉じた場合は開発中へ差し戻し |
| `create_task_for_pr_reviews` | `true` | レビュアータスク生成 有効 |
| `pr_auto_link` | `true` | PR と Issue の自動リンク 有効 |
| `close_autonomous_on_merge` | `true` | 自律 Issue をマージで完了 |
| `autonomous_issue_default_part` | product/3 | 自律 Issue のデフォルト Part |

---

## 3. 検証の経緯とタイムライン

1. **ステップ0**: kon-jp に ISS-62 を作成（Part: Customer Operations Suite / PROD-10）。
2. **ステップ1-2**: ブランチ / コミット / PR を作成（Issue ID `[ISS-62]` / `work-item:ISS-62` を記載）。
   - → **DevRev 側が無反応**。ISS-62 は triage のまま、`last_code_activity` も null。
3. **原因切り分け**: スナップインは active、設定も正常。しかしイベントが届いていない。
   - GitHub App 設定を追加 → それでも未反応。
   - **OAuth 接続では対象 Org / リポジトリを選べない**ことが判明。
4. **PAT 接続へ切り替え** → **イベントが到達開始**（`last_code_activity` 更新、PR-Issue リンク作成）。
5. **ステージ遷移の切り分け**: triage のままでは In Review に遷移しない → in_development へ手動遷移。
6. **PR open** → **In Review 自動遷移を確認**（設定どおり）。
7. **PR close / merge** → 検証時点ではいずれも **in_development**（当時の設定どおり）。その後、運用方針に合わせて **`issue_stage_on_pr_merge` を `completed` に変更**（下記 §4.3 参照）。
8. **レビュアータスク**: 存在しないアカウントを指定したため実施できず（下記制約）。

---

## 4. 判明した重要な知見（ハマりどころ）

### 4.1 接続は PAT を使う（OAuth 接続だと Org 配下のイベントが届かない）

- OAuth 接続は GitHub 個人アカウントの認証止まりで、対象 Organization / リポジトリを選択できない。
- そのため Org 配下（konchangakita-app/devrev-aruaru など）のブランチ / PR / コミットのイベントが DevRev に一切届かず、ステージ自動遷移も code change 生成も起きない。
- **対策**: PAT（Personal Access Token）接続に切り替える。対象リポジトリに最低 write 権限を持つアカウントで Classic PAT を発行（スコープ: `repo` / `read:org` / `user`）。SSO 有効な Org では PAT 発行後に Org を承認すること。
- **切り分けの目安**: Issue の `last_code_activity` が null のまま = イベント未到達 = 接続・Org 到達性の問題。

### 4.2 Issue が triage のままだと In Review に自動遷移しない

- 接続が正常でも、Issue が triage のままだと PR open でステージが変わらない。
- 原因: DevRev のステージ遷移は許可された経路に従い、triage → in_review の直接遷移は許可されていない。
- **対策**: 開発着手時に Issue を triage に放置せず In Development まで進める。
- 補足: 既に open 済みの PR への push（更新）では open トリガーは再発火しない。遷移確認には新規 PR の open、または close → reopen が必要。

### 4.3 マージ後のステージは設定次第（本運用では completed を採用）

- マージ後の遷移先は `issue_stage_on_pr_merge` で決まる。既定で「マージ＝Completed」とは限らない。
- 検証時点の kon-jp は `in_development` だったため、マージしても Completed にならず in_development に留まった（検証で実証）。
- **本運用の方針**: 1 Issue = 1 つの作業単位（実質1本のPRで完結）という粒度に合わせ、**`issue_stage_on_pr_merge` を `completed` に変更**（2026-08-25）。マージ＝作業完了として Issue を自動クローズする。
- **close は `in_development` に据え置き**: マージせず閉じた PR は「作業未完・差し戻し」とみなすため、Completed にはせず開発中へ戻す。`set_issue_to_in_development_on_pr_close: true` と整合。
- 補足: 1 Issue に複数 PR がぶら下がる運用を始める場合、`completed` だと途中の PR マージで Issue が閉じてしまう点に注意。その場合はマージ後ステージを見直す。

### 4.4 レビュアータスク生成には実在アカウント＋DevRev 紐付けが必要

- レビュアータスク生成（`create_task_for_pr_reviews`）を使うには次の両方が必要。
  1. PR のレビュアーに指定できる実在の GitHub アカウント（対象リポジトリ / Org にアクセス権。PR 作成者自身はレビュアーにできない）。
  2. そのアカウントが DevRev ユーザーに紐付いていること（Settings > Account > External Identities > Link GitHub Account）。
- 存在しないアカウント名はレビュアーに指定できず、PR にレビュアーが付かないため DevRev 側のタスク生成も発生しない。
- 今回は実在アカウントを用意できず未検証。実在の別アカウントを用意・紐付けのうえ後日実施する。

---

## 5. 残タスク

- **レビュアータスク生成テスト（#7）**: 実在の GitHub アカウントを用意し、konchangakita-app Org のコラボレーターに追加、DevRev(kon-jp) で GitHub アカウント連携したうえで、PR にレビュアー指定して検証する。
- **新設定（merge → completed）の再検証**: `issue_stage_on_pr_merge` を `completed` に変更済み。in_development 以降の Issue で PR を open → merge し、Completed へ遷移することを確認する。

---

## 6. 関連ドキュメント

- 開発方針: `docs/devrev-github-issue-policy.md`（DevRev を唯一の Issue 管理基盤とする方針＋§7 セットアップ注意）
- 上記のハマりどころは社内「DevRev あるある」コレクションにも登録済み。
