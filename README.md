※ Iosデバイスにて<a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank">TestFlight</a>（無料アプリ）インストール済みの方は、こちらの<a href="https://testflight.apple.com/join/2nKnQhAD" target="_blank">リンク</a>からテストアプリDL可<br>
<br>
※ Androidデバイスは、こちらの<a href="https://kazuya631130.moo.jp/download/empty_service.apk" target="_blank">リンク</a>からテストアプリDL可<br>
<sub>
　Google Play ストア公認アプリではないため、提供元不明アプリのインストールを許可および承認しないとインストールできません<br>
　また Google Play プロテクトが ON の方は、Play ストアアプリ内でOFFの設定をしないとインストールできません（<a href="https://support.google.com/googleplay/answer/2812853?hl=ja" target="_blank">OFFの設定方法</a>）</sub>
<br><br>
<img width="25%" height="auto" alt="0x0ss-1" src="https://github.com/user-attachments/assets/0021d4e8-32d7-4ac3-bc38-5a46a98b47e1" />　<img width="25%" height="auto" alt="0x0ss" src="https://github.com/user-attachments/assets/4ac9773c-752c-4a10-be5e-d8ae9fc80361" />
<br><br>

# ① 初回セットアップ ( node v24.x )

<sub># git clone でこのアプリのソースをダウンロードするコマンド</sub>

```bash
git clone https://github.com/kazuyaTakahashi1988/react-native-expo.git
```

<sub># このアプリのソースがある階層に移動するコマンド</sub>

```bash
cd react-native-expo
```

<sub># node バージョンを確認するコマンド</sub>

```bash
node -v
# v24.x であることを確認する
```

<sub># node モジュールをDLするコマンド</sub>

```bash
yarn install
```

<sub># 環境変数ファイル（サンプル用）をコピーするコマンド</sub>

```bash
cp .env.sample .env
```

<sub># アプリを起動するコマンド</sub>

```bash
yarn start
# EXPO GO （無料アプリ）インストール済みの方は、表示されたQRコード読み込みでスマホ確認可
```

↓↓↓↓<br>

Open <a href="http://localhost:8081" target="_blank">http://localhost:8081</a> in your browser<br>
<br>

# ② storybook を利用する場合

<sub># node モジュールをDLするコマンド</sub>

```bash
yarn install # 上述 ① の手順を終えてるなら必要なし
```

<sub># storybook を起動するコマンド</sub>

```bash
yarn storybook
```

↓↓↓↓<br>

Open <a href="http://localhost:6006" target="_blank">http://localhost:6006</a> in your browser
<br>

<sub>ビルド成果物（GitHub Actionsでホスティング済みのもの）
<br>
Open <a href="https://storybook-for-expo.empty-service.com" target="_blank">https://storybook-for-expo.empty-service.com</a></sub><br>
<br>

# ③ EAS Build する場合

以下、要必須<br>
・ローカルに eas-cli インストール済み<br>
・Expoアカウント取得済み（かつ eas login コマンドでログイン済み）<br>
・Ios： Apple ID（←有償のApple Developer Programと紐付いたもの）取得済み<br>

<sub># 自分のExpoアカウント用のプロジェクトを作成するコマンド</sub>

```bash
eas init
```

<sub># Ios で EAS Build するコマンド</sub>

```bash
# Apple IDの認証など求められます
eas build --platform ios --profile development
```

<sub># Android で EAS Build するコマンド</sub>

```bash
eas build --platform android --profile development
```

<br>

## Analysis with SonarQube

Link to <a href="https://sonarcloud.io/project/overview?id=kazuyaTakahashi1988_react-native-expo" target="_blank">SonarQube</a><br>
<br>

## Architecture Review by Codex

Link to <a href="https://github.com/kazuyaTakahashi1988/react-native-expo/blob/main/ARCHITECTURE_REVIEW.md" target="_blank">ARCHITECTURE_REVIEW.md</a><br>
<br>
※ プロンプトは以下

```
コードベースで全体を評価してください。
アーキテクチャ的に良い点と悪い点（改善できる余地）があれば詳しく解説お願いいたします。
特に小規模・中規模・大規模プロジェクト、どのレベルまで実用的なのかも解説をお願いいたします。
```

<br>

## Project Structure

```
react-native-expo/
├── .github
├── .husky
├── .storybook
├── .vscode
├── app/             # アプリ本体
│   ├── assets           # 静的なアセット
│   ├── components       # 各コンポーネント
│   ├── features         # 各画面（コロケーション）
│   ├── lib              # 静的な値・処理
│   ├── navigation       # ナビゲーション
│   ├── services         # 動的な処理
│   └── App.tsx          # アプリルートファイル
├── stories          # ストーリーブック
├── ...
├── ...
├── ...
└── README.md        # This file
```
