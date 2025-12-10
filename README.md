※ Iosデバイスにて<a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank">TestFlight</a>（無料アプリ）インストール済みの方は、こちらの<a href="https://testflight.apple.com/join/2nKnQhAD" target="_blank">リンク</a>からテストアプリDL可<br>
<br>
※ Androidデバイスは、こちらの<a href="https://kazuya631130.moo.jp/download/empty_service.apk" target="_blank">リンク</a>からテストアプリDL可<br>
<sub>
　Google Play ストア公認アプリではないため、提供元不明アプリのインストールを許可および承認しないとインストールできません<br>
　また Google Play プロテクトが ON の方は、Play ストアアプリ内でOFFの設定をしないとインストールできません（<a href="https://support.google.com/googleplay/answer/2812853?hl=ja" target="_blank">OFFの設定方法</a>）</sub>
<br>

# ① node v22.x 下で yarn install & yarn start

```
$ node -v
v22.x

$ yarn install
$ cp .env.sample .env
$ yarn start
~~~
› Press w │ open web
~~~

※ EXPO GO （無料アプリ）インストール済みの方は、表示されたQRコード読み込みでスマホ確認可
```

↓↓↓↓<br>

Open <a href="http://localhost:8081" target="_blank">http://localhost:8081</a> in your browser<br>
<br>

# ② storybook を利用する場合

```
$ yarn install // ←上述①の手順を終えてるなら必要なし
$ yarn storybook
```

↓↓↓↓<br>

Open <a href="http://localhost:6006" target="_blank">http://localhost:6006</a> in your browser<br>
<br>

```
$ yarn build-storybook // ビルドコマンド
```

↓↓↓↓ ビルド成果物（GitHub Actionsでビルド・ホスティングしたもの）<br>
<br>
Open <a href="https://storybook-for-expo.empty-service.com" target="_blank">https://storybook-for-expo.empty-service.com</a><br>
<br>

# ③ EAS Build する場合

以下、要必要<br>
・ローカルに eas-cli インストール済み<br>
・Expoアカウント取得済み（かつ eas login コマンドでログイン済み）<br>
・Ios： Apple ID（←有償のApple Developer Programと紐付いたもの）取得済み<br>
<br>

```
$ eas init // 自分のExpoアカウント用のプロジェクトを作成

Iosの場合（Apple IDの認証など求められます）
$ eas build --platform ios --profile development

Androidの場合
$ eas build --platform android --profile development
```
