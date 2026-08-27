# 脆弱性管理シート

実務では Critical / High を優先して潰してください（Moderate を即時ゼロにする必要はありません）。

<br />

## 監査概要

| 項目         | 内容                                                    |
| ------------ | ------------------------------------------------------- |
| 監査実施日   | 2026-08-27                                              |
| 監査対象     | `package.json` の `dependencies` およびその間接依存関係 |
| 対象外       | `devDependencies`                                       |
| 監査コマンド | `yarn audit --groups dependencies --level moderate`     |
| 検出結果     | Moderate: 25件 / High: 78件 / Critical: 1件             |

<br />

## 検出された脆弱性

Moderate、High、Critical に該当する脆弱性が検出されました。依存経路ごとの重複は、モジュール名とバージョンごとにまとめています。

| モジュール名      | バージョン                   | 深刻度                     | 脆弱性ID                                                                                                           | 概要                                                           | 対応状況                                                                      |
| ----------------- | ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `postcss`         | `8.4.49`                     | Moderate / High            | CVE-2026-41305<br />CVE-2026-45623<br />CVE-2026-69153<br />CVE-2026-73646                                         | CSS文字列化時のXSS、source map参照を介した任意ファイル読み取り | 未対応（`expo` の間接依存。`8.5.23` 以上へ更新）                              |
| `brace-expansion` | `1.1.15` / `2.1.1` / `5.0.6` | High                       | CVE-2026-13149<br />CVE-2026-14257<br />CVE-2026-69152                                                             | 細工したbraceパターンによるCPU・メモリ枯渇DoS                  | 未対応（`expo` / `react-native` の間接依存。各修正版へ更新）                  |
| `js-yaml`         | `3.14.2` / `4.1.1`           | Moderate / High            | CVE-2026-53550<br />CVE-2026-59869<br />GHSA-5p4m-2wfm-xmqj                                                        | YAMLのmerge key・`!!omap`処理によるCPU枯渇DoS                  | 未対応（`expo` / `react-native` の間接依存。`3.15.1` / `4.3.1` 以上へ更新）   |
| `tar`             | `7.5.15`                     | Moderate / High / Critical | CVE-2026-53655<br />CVE-2026-59871<br />CVE-2026-59873<br />CVE-2026-59874<br />CVE-2026-59875<br />CVE-2026-73566 | 細工したtarによるファイル混入、クラッシュ、無限ループ、DoS     | 未対応（`expo` の間接依存。`7.5.21` 以上へ更新）                              |
| `undici`          | `6.26.0`                     | Moderate / High            | CVE-2026-9679<br />CVE-2026-12151<br />CVE-2026-16728<br />CVE-2026-15157<br />CVE-2026-16729                      | HTTPヘッダー注入、WebSocket DoS、レスポンス不整合など          | 未対応（`expo` の間接依存。`6.28.0` 以上へ更新）                              |
| `shell-quote`     | `1.8.4`                      | High                       | CVE-2026-13311<br />GHSA-395f-4hp3-45gv                                                                            | `parse()` の二次時間処理によるDoS                              | 未対応（`react-native` の間接依存。`1.9.0` 以上へ更新）                       |
| `fast-uri`        | `3.1.2`                      | High                       | CVE-2026-16221<br />CVE-2026-18446<br />CVE-2026-13676                                                             | URI authority解析の不備によるホスト混同                        | 未対応（`expo-dev-client` の間接依存。`3.1.5` 以上へ更新）                    |
| `nanoid`          | `3.3.12`                     | High                       | CVE-2026-67214<br />CVE-2026-67213                                                                                 | 不正なsize指定による無限ループDoS                              | 未対応（`@react-navigation/native` / `expo` の間接依存。`3.3.18` 以上へ更新） |
| `uuid`            | `7.0.3`                      | Moderate                   | CVE-2026-41907<br />GHSA-w5hq-g745-h8pq                                                                            | v3/v5/v6生成時の出力バッファ境界チェック不足                   | 未対応（`expo` の間接依存。`11.1.1` 以上へ更新）                              |
| `image-size`      | `1.2.1`                      | High                       | CVE-2025-71330<br />CVE-2025-71329                                                                                 | 細工したICNS/JXL/HEIF画像による無限ループDoS                   | 未対応（`expo` の間接依存。監査情報上は修正版なし）                           |

> 深刻度は Moderate / High / Critical の3段階で管理します。<br />
> Low および Info はこのシートの対象外です。

<br />

## 直接依存モジュール一覧

| モジュール名                                | `package.json` の指定 | インストールバージョン | Moderate以上の検出状況                   |
| ------------------------------------------- | --------------------- | ---------------------- | ---------------------------------------- |
| `@aws-amplify/react-native`                 | `^1.3.0`              | `1.3.3`                | 検出なし                                 |
| `@expo/metro-runtime`                       | `~6.1.2`              | `6.1.2`                | 検出なし                                 |
| `@react-native-async-storage/async-storage` | `2.2.0`               | `2.2.0`                | 検出なし                                 |
| `@react-native-community/netinfo`           | `11.4.1`              | `11.4.1`               | 検出なし                                 |
| `@react-native-picker/picker`               | `2.11.1`              | `2.11.1`               | 検出なし                                 |
| `@react-navigation/bottom-tabs`             | `^7.4.6`              | `7.16.2`               | 検出なし                                 |
| `@react-navigation/material-top-tabs`       | `^7.3.6`              | `7.4.28`               | 検出なし                                 |
| `@react-navigation/native`                  | `^7.1.16`             | `7.2.5`                | 間接依存にHighあり                       |
| `@react-navigation/native-stack`            | `^7.3.23`             | `7.16.0`               | 検出なし                                 |
| `@reduxjs/toolkit`                          | `^2.9.1`              | `2.12.0`               | 検出なし                                 |
| `aws-amplify`                               | `^6.7.2`              | `6.17.0`               | 検出なし                                 |
| `axios`                                     | `^1.20.0`             | `1.20.0`               | 検出なし                                 |
| `expo`                                      | `54.0.23`             | `54.0.23`              | 間接依存にModerate / High / Criticalあり |
| `expo-dev-client`                           | `~6.0.17`             | `6.0.21`               | 間接依存にHighあり                       |
| `expo-linking`                              | `~8.0.8`              | `8.0.12`               | 検出なし                                 |
| `expo-splash-screen`                        | `~31.0.12`            | `31.0.13`              | 検出なし                                 |
| `expo-status-bar`                           | `~3.0.8`              | `3.0.9`                | 検出なし                                 |
| `react`                                     | `19.1.0`              | `19.1.0`               | 検出なし                                 |
| `react-hook-form`                           | `^7.66.0`             | `7.76.1`               | 検出なし                                 |
| `react-native`                              | `0.81.5`              | `0.81.5`               | 間接依存にModerate / Highあり            |
| `react-native-gesture-handler`              | `~2.28.0`             | `2.28.0`               | 検出なし                                 |
| `react-native-get-random-values`            | `~1.11.0`             | `1.11.0`               | 検出なし                                 |
| `react-native-pager-view`                   | `6.9.1`               | `6.9.1`                | 検出なし                                 |
| `react-native-picker-select`                | `^9.3.1`              | `9.3.1`                | 検出なし                                 |
| `react-native-reanimated`                   | `~4.1.1`              | `4.1.7`                | 検出なし                                 |
| `react-native-safe-area-context`            | `~5.6.0`              | `5.6.2`                | 検出なし                                 |
| `react-native-screens`                      | `~4.16.0`             | `4.16.0`               | 検出なし                                 |
| `react-native-svg`                          | `15.12.1`             | `15.12.1`              | 検出なし                                 |
| `react-native-worklets`                     | `0.5.1`               | `0.5.1`                | 検出なし                                 |
| `react-redux`                               | `^9.2.0`              | `9.3.0`                | 検出なし                                 |

<br />

## 更新ルール

- 依存モジュールの追加・更新時、または定期的に同じ条件で監査を実施します。
- 脆弱性が検出された場合は、モジュール名、影響バージョン、深刻度、脆弱性ID、概要、対応状況を追記します。
- バージョンは `yarn.lock` とインストール状態を基準とし、再監査時に一覧を更新します。
- 監査概要の件数は `yarn audit` の依存経路ごとの集計値です。検出一覧では同一脆弱性の依存経路による重複をまとめます。
