# ブログネタ（【とあるあるあるサイト】構築中）

> **構築期の正本は Repo1 内**。サイト構築セッション（ISS-68 等）では **本ファイル + [`build-log.md`](./build-log.md)** に追記する。  
> hack-plus `docs/blog-ideas.md` への統合は **構築完了後**（Computer / オーナー判断）。

- 時系列の生記録 → [`build-log.md`](./build-log.md)
- デザイン深掘り → [`design-log.md`](./design-log.md)
- 運用マスター → [`docs/OPERATIONS.md`](../OPERATIONS.md) §9
- 連載ルール（公開時）→ hack-plus `series-devrev-aruaru.md`

## 記入フォーマット

- **想定タイトル** / **書ける切り口** / **匿名化の注意点**
- **ステータス**: `idea`（構築中は drafting にしない）
- **DevRev Issue**: `(未起票)` — 起票は Computer
- **build-log 参照**: 日付セクションへのリンク

---

## 連載ネタ（DA-5 以降）

### DA-5 — AIと一緒にサイトのデザインを考える（デザイン編）

- **記事の主題**: 骨組み後のデザインを Computer/Cursor と詰めた過程
- **記録**: [`design-log.md`](./design-log.md) + [`build-log.md`](./build-log.md)（Phase 0〜5）
- **想定タイトル**: 「【とあるあるあるサイトをつくる】AIと一緒にサイトのデザインを考える」
- **ステータス**: in_development（執筆開始）
- **DevRev Issue**: ISS-74（親: ISS-73）

### DA-6 候補 — トップを「使える」大きさに仕上げる（2026-09-15）

- **記事の主題**: モック載せ**後**の UX 仕上げ — ヒーロー縦幅・コピー・カードクリック。Cursor とオーナーが数値を往復調整
- **build-log**: [`build-log.md` §2026-09-15](./build-log.md)（トップ UX 仕上げ）
- **スクショ**: `phase-1-2/01-top-light.png`（Before 相当）→ `phase-70/09-10`（コンパクトヒーロー・ライト/ダーク）
- **元コミット**: `8446157`（`feature/ISS-68-aruaru-site`）
- **想定タイトル**: 「【とあるあるあるサイトをつくる】モック載せ後の UX 調整」
- **書ける切り口**:
  - 黄ヒーローはかっこいいが小画面で新着まで遠い → **到達距離**優先で `.hero--home` のみ圧縮
  - コピー短文化 + AI への段階指示（70–80% → +10% → 縦+20% → 検索130%）
  - **stretched link** でカード全体クリック、タグは独立
  - リンクホバーの黄色下線 → `--link-underline`（muted）に統一
- **匿名化**: コミット/Issue/ポート/本番 URL（完成節以外）は一般化
- **ステータス**: triage（DA-5公開後に着手）
- **DevRev Issue**: ISS-75（親: ISS-73）

### DA-7 候補 — 検索をどう実装するか（Fuse.js vs Pagefind）（2026-09-16）

- **記事の主題**: デザインだけ先に決まった検索 UI に、**方式選定から実装・UI 仕上げ**まで（CSP・日本語・件数増化）
- **build-log**: [`build-log.md` §2026-09-16〜21](./build-log.md)（ISS-69）
- **設計メモ**: [`search-feature-notes.md`](./search-feature-notes.md)
- **検証ログ**: [`verification/ISS-69-search-qa-2026-09-16.md`](./verification/ISS-69-search-qa-2026-09-16.md)
- **スクショ**: `build-screenshots/phase-69/`（Before）→ `phase-70/` 01〜05, 08（After・ライト/ダーク）
- **想定タイトル**: 「【とあるあるあるサイトをつくる】検索は Fuse.js から始める」
- **書ける切り口**:
  - UI はモック済み、ロジックは `includes()` だけだった現状
  - 静的配信 + CSP でランタイム API 不可 → クライアント完結の選択肢
  - Fuse.js で始めて Pagefind に移行する段階戦略（件数・日本語・ビルドコスト）
  - PoC の比較観点（threshold、インデックスサイズ、Astro ビルド連携）
  - **UI 仕上げ**: 2ゾーン色分け → 外枠カード廃止 → ヒーロー同型ピル検索 + `search-hit` カード（2026-09-21）
- **匿名化**: Issue ID・ポート・本番 URL
- **ステータス**: triage（DA-5公開後に着手）
- **実装 Issue**: ISS-69（completed）
- **記事執筆 Issue**: ISS-76（親: ISS-73）

### DA-8 候補 — 詳細ページを「読むモード」にする（2026-09-21）

- **記事の主題**: トップと同じ黄ヒーローだと読みにくい → **ページ役割の分離**（発見 vs 読む）と症状/原因/対処の見せ方
- **build-log**: [`build-log.md` §2026-09-21](./build-log.md)（詳細リデザイン）
- **スクショ**: `phase-1-2/03-detail-light.png`（Before・黄ヒーロー）→ `phase-70/06-07`（After・読むモード）
- **想定タイトル**: 「【とあるあるあるサイトをつくる】読むモードのデザイン」
- **書ける切り口**:
  - トップ＝発見、詳細＝読む、検索＝探す — 黄の使い方をページごとに変える
  - muted 全幅バンド + 白シート（検索結果と同型のパターン再利用）
  - 症状/原因/対処: 箱なし `qflow--flat`、ラベルピル + ヒント行、対処のみ左黄線
  - タグを本文上に移動した理由
  - 番号付きタイムライン案は不採用（シンプル優先）
- **匿名化**: Issue ID・ポート・本番 URL
- **ステータス**: triage（DA-5公開後に着手）
- **実装 Issue**: ISS-69（completed、検索と同ブランチで実装）
- **記事執筆 Issue**: ISS-77（親: ISS-73）

### DA-9 候補 — 記事づくりを「AIと人の分業」で回す（2026-09-21）

- **想定タイトル**: 「【とあるあるあるサイトをつくる】DevRev Computerと分業であるあるを公開する」
- **記事の主題**: サイトに載せる記事（コンテンツ）を作って公開するまでを、**AIと人・ツールの役割分担**で仕組み化する話。ネタ発生 → 下書き → タスク化 → 確認 → 公開 → タスク自動クローズ、という「コンテンツ公開パイプライン」を、どこをAIに任せてどこを人が判断するかで設計した回。
- **役割分担の肝（記事の芯）**: 「調べて内容を書く担当AI」と「コードを書いて公開する担当AI／人」を分けた。前者はドメイン知識と裏取りが得意、後者はコード実装とGit運用が得意。境界を決めたことで受け渡しが明確になった、という体験談。
- **ツールの絡み方**: コンテンツの下書きに合わせてタスク（Issue）を自動で立て、コードのPRとタスクをひも付けておくと、**公開（マージ）と同時にタスクが自動で完了**する。この「作業が勝手に閉じる」体験を仕組みのエッセンスとして紹介（主役はあくまでAIを使った記事づくりのフロー）。
- **書ける切り口**:
  - なぜ「書くAI」と「実装するAI」を分けたか（得意分野の違い）
  - 下書きを status:draft で持ち、公開で published に上げる最小設計
  - どこまで自動化し、どこで人が確認を挟むか（公開前レビュー）
  - タスクとコードPRの連携で「マージ＝タスク完了」を自動化した気持ちよさ
  - **「1件だけ実際に流してみたら設計の穴が見つかった」話**（2026-09-21 実体験）: 机上で設計せず、最初の1件をドッグフーディングしたら、**データファイルが実は2系統に分裂していた**（書くAI側の想定スキーマと、実装側の本番スキーマがフィールド名から違った）ことが発覚。→ 「小さく1件通す」ことがいかに設計を守るか、という教訓として書ける。
  - **AI同士がタスクで会話して受け渡す話**（2026-09-21 実体験）: 「実装するAI」が1件流して詰まり（下書きが公開扱いになる穴）を見つけ、**タスクのコメントで「実装タスクを立てて」と依頼** → 「書く/管理するAI」がその実装タスクを起票して返信、という往復が起きた。人間はほぼ承認だけ。タスク管理ツールが**AI間の非同期な伝言板**になる、という新しい分業の絵。
  - **下書きの「型」を先に決めた話**: 何を必須項目にし、どこまで裏取りを義務化するか（推測を書かせない）を型として固めた。AIに書かせるほど、品質のガードレールを先に言語化する重要性。
  - **draft プレビューの実装話**（2026-09-22 完走）: `entries.json` の `status: draft | published` をサイトが扱う実装（ISS-72）。本番ビルドは published のみ、**`npm run dev` または `PUBLIC_SHOW_DRAFTS=true` で draft 表示**。22 ページ vs 25 ページの差で「下書きが本番に漏れない」ことをビルドで担保した、という技術的な安心感。
  - **「確認ステップを飛ばした」反省**（2026-09-22 実体験）: フロー上は **published 化の前に人間が dev で draft を目視確認**（Step 3）する設計だったが、ISS-72 マージ後に一気に公開 PR まで進めてしまった。→ 「自動化が進むほど、**どこで人が止まるか**をフローに明示しないと省略される」という教訓。次回以降は Step 3 を必須ゲートにする。
  - **初回ドッグフーディング完走のまとめ**（2026-09-22）: ISS-70 設計 → ISS-71（1件公開）→ 途中で ISS-72（前提実装）が割り込む → 両方マージでタスク自動クローズ。1件通すだけで「スキーマ分裂」「サイト未対応」「確認タイミング」の3つの学びが出た。
  - **一度通した流れをスキルに固定した話**（2026-09-22）: 実走で得たガードレール（本番データの見分け方、裏取り、draft限定、タスク起票で止める境界）を、書くAIが次回も同じ品質で再利用できるスキルに落とした。手順書だけでなく、実行時に迷わない「ガードレール」にする価値。
- **設計メモ**: [`publish-workflow-notes.md`](./publish-workflow-notes.md), [`aruaru-draft-guide.md`](./aruaru-draft-guide.md)
- **検証ログ**: [`verification/ISS-71-draft-gap-2026-09-21.md`](./verification/ISS-71-draft-gap-2026-09-21.md), [`verification/ISS-72-draft-status-2026-09-21.md`](./verification/ISS-72-draft-status-2026-09-21.md), [`verification/ISS-71-publish-2026-09-22.md`](./verification/ISS-71-publish-2026-09-22.md)
- **匿名化**: Issue ID・組織 slug・リポジトリ実名・製品固有名（「あるSaaS」「タスク管理ツール」等に一般化）。ツール固有の解説が主役化しないこと。
- **ステータス**: triage（DA-5公開後に着手）
- **実装 Issue**: ISS-70（初回ドッグフーディング完走: ISS-71 公開 + ISS-72 draft 対応、2026-09-22）
- **記事執筆 Issue**: ISS-78（親: ISS-73）
- **DA-10 への橋渡し**: Issue の概念・起票の詳細は DA-10。下書き PLUS は「次回」に差し替え予定

### DA-10 候補 — DevRev Issue の使い方と Computer による起票（2026-09-23）

- **想定タイトル**: 「【とあるあるあるサイトをつくる】DevRev Issueの使い方」（副題なし。Computer 起票を主題にするなら「DevRev ComputerでISSを起票する」も可 — **Computer 起票時に確定**）
- **記事の主題**: [DA-9](/articles/20260927-devrev-aruaru-publish-pipeline-da9) で触れた「タスク（Issue）」を、**DevRev Issue として正しく説明**する回。あわせて **あるある 1 件が生まれるとき Computer が ISS を起票する**流れまで踏み込む。DA-2/DA-4 で出てきた「Issue」との混同もここで整理する。
- **前回との関係**: DA-9 = 公開パイプラインの**下流**（1 件ドッグフーディング）。DA-10 = 同じフローの**上流**（Issue とは何か → 起票 → entries draft → 実装 ISS へ受け渡し）。時系列は逆だが、読者は DA-9 の Step 1 を詳しく知りたい状態で読む想定。
- **記事執筆 ISS**: `(未起票)` — **起票要否・親 ISS・タイミングは Computer 判断**（Cursor は起票しない）
- **ステータス**: `idea`（骨子のみ。DA-9 下書き公開後または並行で執筆可）
- **設計メモ**: [`publish-workflow-notes.md`](./publish-workflow-notes.md), [`aruaru-draft-guide.md`](./aruaru-draft-guide.md)
- **検証ログ（執筆時参照・記事では匿名化）**: ISS-70 設計、ISS-71 公開、ISS-72 draft 対応、ISS-71-draft-gap
- **匿名化**: 公開記事では ISS 番号・組織 slug・リポジトリ実名・PAT 詳細なし。DevRev / Issue / Computer / Part 等の**製品用語は本シリーズ例外で使ってよい**（`OPERATIONS.md` §2 連載例外）。

#### 骨子（見出し案）

**導入**

- [前回 DA-9](/articles/20260927-devrev-aruaru-publish-pipeline-da9): 分業で 1 件公開まで通した。フロー図の Step 1「Computer が ISS 起票」は触れたが、**DevRev Issue 自体の説明はしていない**
- ここまで連載で「Issue」と書いてきた箇所（DA-2 の GitHub Issue、DA-4 の Issue→PR→マージ）と、**DevRev 上の Issue** は別物 — 今回整理する

---

**§1 DevRev Issue とは**

- DevRev 上の**作業単位**（チケット）。1 Issue ≒ 1 作業（このプロジェクトの運用）
- **Part** — プロダクト／サイト単位で Issue を束ねる（例: あるあるサイト Part）
- **Stage（ステージ）** — triage → in progress → in review → completed 等。進捗の正本
- **Timeline** — コメント・イベント。人間だけでなく **AI 同士の非同期な伝言板** としても使う（DA-9 で実体験済み）
- GitHub Issue との違い（DA-2）: サイト投稿受け口は GitHub 側の話。**開発・公開のタスク管理は DevRev Issue**

---

**§2 GitHub との連携 — マージでタスクが閉じる**

- ブランチ名・コミット・PR に `work-item:ISS-XX`（形式は一般化して記載）
- PR 作成 → DevRev 側 Stage が自動遷移（in review 等）
- **マージ → Issue が completed** — DA-9 の「マージ＝タスク完了」の正体
- DA-4 の「Issue → PR → マージ」は **DevRev Issue 起点** の運用と読み替え可能（DA-4 本文は触らず、DA-10 で補足）

---

**§3 このサイトでの Issue の置き方**

- **親 Issue（エピック）** — 連載執筆まとめ、公開ワークフロー設計など大きな塊
- **子 Issue** — あるある 1 件の公開、draft 対応の実装、記事 1 本の執筆、など
- **粒度**: あるある 1 件 = ISS 1 件（`publish-workflow-notes.md` 確定事項）
- **役割分担**（`OPERATIONS.md` §3）:
  - **Computer のみ**: ISS 起票、Part、ステージ操作、あるある内容＋draft 追記
  - **Cursor 主**: コード実装、Git/PR、起票済み ISS の DevRev 検証
  - **Cursor は起票しない** — 境界を記事でも明示

---

**§4 あるある 1 件が DevRev Issue になる流れ**

想定フロー（匿名化した図・表）:

```
[1] Computer: 内容作成（症状/原因/対処/裏取り）
[2] Computer: entries.json に status:draft 追記
[3] Computer: あるある公開用 ISS 起票（Part 紐付け、本文に要点・受け入れ条件）
[4] 人間: dev / PUBLIC_SHOW_DRAFTS でプレビュー確認
[5] Cursor: published 化 + PR（work-item 記載）
[6] マージ → ISS completed
```

- 起票時に ISS 本文へ書くもの（案）:  slug、下書き要点、裏取り出典、Step 3 確認の指示、公開 PR 担当
- **初回ドッグフーディングの振り返り**（番号なしで叙述）:
  - 設計 ISS → 1 件目公開 ISS → draft 未対応で実装 ISS が割り込む — DA-9 の 3 つの穴の**上流**
  - 実装 AI がタイムラインで「実装 ISS を起票して」と依頼 → Computer が起票 — DA-9 §「AI 同士がタスクで受け渡した」の詳細版

---

**§5 Computer が ISS を起票するとき（実務）

- **いつ起票するか**: あるあるネタ確定＋draft 追記のタイミング（内容とタスクを同時に残す）
- **誰が起票するか**: DevRev Computer（プラットフォーム上の AI）。Cursor は依頼・検証のみ
- **起票しないもの**: Cursor からの ISS 新規作成（プロジェクトルール）
- スキル／ガードレール: 実走後に固定した「書く AI 用スキル」の ISS 起票境界（DA-9 末尾）を 1 段落で参照
- スクショ候補（執筆時）: DevRev Issue 一覧、Timeline、Part 紐付け、Stage 遷移 — **取得は Cursor、UI に ISS 番号が写る場合はマスク**

---

**§6 DA-9 との接続 — パイプライン全体像（再掲）

- DA-9 のフロー図を **Issue 用語付き** で再掲（短く）
- 「Issue の説明（DA-10）→ 公開の実践（DA-9）」の順で読むと全体がつながる — PLUS で DA-9 へリンク

---

**HACK+PLUS（案）

- **HACK**: DevRev Issue = 作業＋伝言板＋GitHub 連動の三役；Computer 起票で Cursor は実装に集中
- **PLUS**: 親子 ISS の付け方はまだ手探り；記事執筆 ISS も Computer 起票；連載は DA-10 で一区切り or サイト機能ネタは別 ISS で続く

---

#### Computer への引き渡し（ISS 起票判断）

Cursor は本骨子を `blog-ideas.md` に記録した。**以下は Computer 判断に委ねる**:

| 判断項目 | Cursor の提案（参考） | 決定者 |
| --- | --- | --- |
| DA-10 記事執筆 ISS を起票するか | DA-9（ISS-78）と同様、親 ISS-73 配下で起票 | **Computer** |
| 起票タイミング | DA-9 下書き FC 前後、または DA-9 公開後 | **Computer** |
| タイトル確定 | 「DevRev Issueの使い方」vs「DevRev ComputerでISSを起票する」 | **Computer / オーナー** |
| ISS 本文に載せる acceptance | 骨子 §1〜§5 をカバー、匿名化、voice-check-try、前回 DA-9 リンク | **Computer** |

起票後: Cursor は `blog-ideas.md` の `(未起票)` を ISS 番号に更新し、hack-plus `drafts/` に下書き執筆を開始する。
