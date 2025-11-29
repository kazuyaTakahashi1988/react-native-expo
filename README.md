# ① node v22.x 下で yarn install & yarn web

```
$ node -v
v22.x

$ yarn install
$ cp .env.sample .env
$ yarn web
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
`yarn build-storybook`ビルド成果物 → <a href="http://storybook-for-expo.empty-service.com" target="_blank">http://storybook-for-expo.empty-service.com</a><br>
<br>

# ③ EAS Build する場合

以下、要必要<br>
・ローカルに eas-cli インストール済み<br>
・Expoアカウント取得済み（かつ eas login コマンドでログイン済み）<br>
・Apple ID（←有償のApple Developer Programと紐付いたもの）取得済み<br>
<br>

```
$ eas build --platform ios --profile development
```
