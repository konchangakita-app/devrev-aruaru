# あるあるサイト: タブアイコン改修案（Cursor引き継ぎ）

## 現状と原因候補

- サイトの `web/src/layouts/BaseLayout.astro` には `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` があり、`web/public/favicon.svg` も存在する。アイコンは「無設定」ではない。
- 既存SVGは `<text>` で「A」を描き、外部フォント Space Grotesk に依存している。ブラウザのSVG faviconではフォントが使えず文字が欠落・代替表示される可能性がある。
- 既存 `web/public/favicon.ico` は拡張子に反して32×32のPNGデータ。ブラウザのフォールバックやキャッシュの影響で期待通り表示されない可能性がある。
- したがって「原因を特定した」とは断定しない。まずDevToolsの `/favicon.svg` リクエスト（200/Content-Type）、ブラウザタブ、プライベートウィンドウ、キャッシュを確認してから実装する。

## 新案（Computer作成・サイト未適用）

**2026-09-24 変更**: 当初の英字「A」は Aruaru の頭文字だが、日本語サイトの識別子として伝わりにくいとのフィードバックを受けて不採用。下の2案を新しい比較対象とする。

1. **「あ」案** `devrev-aruaru-favicon-a.svg`: 黄色 `#FFE600` の角丸四角＋黒 `#161616` の太いひらがな「あ」。文字はSVG path化済みでフォントの読み込み不要。32px/16pxの比較: `devrev-aruaru-favicon-a-options.png`。シンプルでタブサイズでも読みやすいため推奨。
2. **吹き出し案** `devrev-aruaru-favicon-chat.svg`: 黒地＋黄色い吹き出しの中に黒い「あ」。会話・共有したくなる「あるある」のニュアンスを足す。16pxでは図形がやや込み入るため要実機確認。

両案ともDevRev公式ロゴ・専用フォントは使わず、DevRevらしい黄/黒の配色で関連性を示す。**承認までは本番ファイルを変更しない。**

旧A案 (`devrev-aruaru-favicon-proposal.svg` / `.ico` / `devrev-aruaru-favicon-preview.png`) は比較履歴であり、実装には使わない。

## Cursorの実装・検証（オーナー承認後）

1. 新しい「あ」/吹き出しの比較画像をオーナーと確認。選んだSVGを `web/public/favicon.svg` に適用し、同じ形の正しいICO形式を16/32/48/64pxで生成して `web/public/favicon.ico` に適用。旧A案のICOを流用しない。プレビューPNGは公開不要。
2. `BaseLayout.astro` でSVGとICOのフォールバック、必要ならApple touch iconを設定。既存のリンク指定を確認し、二重登録や不要な拡張は避ける。
3. Astroビルド後の `dist/favicon.svg` / `dist/favicon.ico` とMIME・内容を確認。16/32pxのブラウザタブ（ライト/ダーク）で確認。既存サイトとキャッシュを切り分ける。
4. Git/PRとデプロイはCursor担当。Issueが必要ならComputerがkon-jpのPROD-11配下に起票し、PRに対応IDを入れる。

## ブログネタ

「アイコンを作ったのにタブに出ない」→ 既存SVG内の文字がフォント依存、さらに.icoの実体がPNGだったと調査で判明。英字A案はユーザーのフィードバックで不採用となり、サイトの言語に合う「あ」に方向転換。**表示不具合の真因はブラウザ未検証のため未確定**。小さく検証してからWebサイトに適用する回として、構築ログに事実を追記できる。外部公開時は実リポジトリ・組織・Issue IDなどを匿名化。
