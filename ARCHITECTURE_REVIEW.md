# Architecture Review by Codex - 2026/8/9

## 1. 総評

このコードベースは、**小規模から中規模前半の Expo / React Native アプリを、一定の規約と品質を保ちながら開発するための土台として実用的**です。

特に、`features`、`components`、`navigation`、`utils`、`lib` の責務分割、TypeScript と ESLint による強い静的検査、型付き Navigation、Provider の集約、Storybook・Vitest・EAS・GitHub Actions まで含めた開発基盤は高く評価できます。

一方、**大規模プロジェクトへ現在の構成のまま拡大することは推奨しません**。API client と Redux store の直接結合、server state 管理の不足、認証と API token 管理の未統合、画面コンポーネントへのユースケース集中、限定的なテスト対象などが、規模拡大時の主な課題になります。

### 実用規模の目安

| 規模       | 評価                 | 判断                                                             |
| ---------- | -------------------- | ---------------------------------------------------------------- |
| 小規模     | 非常に実用的         | 現状のままでも十分採用可能                                       |
| 中規模前半 | 実用的               | API・feature 境界・非同期処理を少し強化すればよい                |
| 中規模後半 | 条件付きで実用的     | server state、認証、テスト、モジュール分割の再設計が必要         |
| 大規模     | 現状のままでは非推奨 | domain 単位の境界、データ層、observability、E2E などの追加が必要 |

---

## 2. 現在のアーキテクチャ

README では、アプリ本体を次の領域へ分けています。

- `components`: 共通コンポーネント
- `features`: 画面と画面固有実装
- `lib`: 静的な値・型・処理
- `navigation`: Navigation 構成
- `utils`: API、認証、Store、App Root などの動的処理

実装上は、おおむね次の階層になっています。

```text
App
├─ AppRootProvider
│  ├─ GestureHandlerRootView
│  ├─ SafeAreaProvider
│  ├─ AuthProvider
│  ├─ StoreProvider
│  ├─ ToastProvider
│  └─ DialogProvider
├─ GlobalLoading
└─ Navigation
   ├─ main
   │  ├─ home
   │  ├─ about
   │  └─ work
   └─ others
      ├─ auth
      └─ information
```

`App.tsx` は Provider、Global Loading、Navigation、StatusBar の組み立てに集中しており、画面ロジックや API ロジックを持ちません。

---

## 3. アーキテクチャ的に良い点

### 3.1 App Root が薄い

`App.tsx` の責務は、React Native Screens の初期化、Splash 制御、Provider 群の配置、Global Loading、Navigation、StatusBar に限定されています。トップレベルが画面・認証・API の詳細を知らないため、ルートコンポーネントが肥大化しにくい構造です。

Provider 群も `AppRootProvider` へまとめられているため、追加・削除箇所と Provider の順序依存を一か所で確認できます。現在の Provider 数であれば、可読性と実用性のバランスが取れています。

### 3.2 feature と共通 UI が分離されている

画面固有実装は `app/features`、再利用可能な UI は `app/components` に配置されています。

この分離には次の利点があります。

- 共通 UI を Storybook で独立して確認できる
- feature 固有 UI とデザインシステムの境界が明確になる
- 新規画面の配置方法が分かりやすい
- 共通コンポーネントの再利用を促進できる
- 画面単位でコードを探しやすい

小規模から中規模では、非常に扱いやすい構成です。

### 3.3 React Navigation の型が適切に定義されている

Navigation 型は単なる `Record<string, unknown>` ではなく、Home Top Tab、Home Stack、About Top Tab、About Stack、Main Bottom Tab、Others Stack、Root Stack に分けて明示されています。

さらに `NavigatorScreenParams` を使い、ネストした Navigator の構造も型として表現しています。これにより、存在しない画面名、必須 parameter の渡し忘れ、誤った route params などを TypeScript で検出しやすくなっています。

画面側でも `BottomTabScreenProps` などから props 型を生成しており、中規模以上で重要になる Navigation のリファクタリング安全性を確保しています。

### 3.4 Deep Link が Navigation 構造に対応している

Expo Linking を利用し、Home、About、Work、Auth、Information の path が Navigator 構造に合わせて定義されています。Deep Link は後付けすると画面階層との不一致が発生しやすいため、初期段階から用意されている点は良好です。

将来的には、不正 URL、認証が必要な URL、cold start、warm start、notification 経由の Deep Link を自動テストするとさらに堅牢になります。

### 3.5 ESLint がスタイルチェックに留まっていない

TypeScript、React Hooks、React Native、SonarJS などを組み合わせ、型を考慮した Lint を有効化しています。

特に有効な規則は次のとおりです。

- strict boolean expression
- type-only import
- unsafe member access の禁止
- cognitive complexity の上限
- cyclomatic complexity の上限
- ネスト深度の上限
- import 順序
- JSX props 順序
- React Hooks の規則

これらは、コードレビュー時に人間が毎回指摘する必要がない問題を自動化します。ただし、複雑度の一律制限がルール回避のための細切れ関数を生まないよう、規模拡大時には対象領域ごとの調整も必要です。

### 3.6 ESLint でモジュール境界を強制している

ディレクトリを分けるだけでなく、ESLint で次を制限しています。

1. `_` で始まる内部ファイルを同じ階層以外から直接 import しない
2. `features` 配下を原則として `navigation` 以外から import しない

これにより、feature の内部実装への直接依存を防ぎ、`index.tsx` を public API として利用する習慣を付け、循環依存や無秩序な feature 間依存を抑制できます。

### 3.7 Global Loading がカウンター式である

Loading state を boolean ではなく count として管理し、リクエスト開始時に増加、終了時に減少させています。複数 API が並列実行された場合も、最後の API が終了するまで Loading が消えません。

```text
Request A start: count = 1
Request B start: count = 2
Request A end:   count = 1
Request B end:   count = 0
```

単純な boolean より堅牢で、実用的な設計です。また API client では `finally` で count を下げており、成功・失敗のどちらでもバランスが戻ります。

### 3.8 API 結果が判別可能な Union になっている

API 結果は `{ ok: true; response: ... }` と `{ ok: false; error: ... }` の判別可能 Union で表現されています。呼び出し側は `result.ok` によって成功・失敗を型安全に分岐できます。

API client は Base URL、header、Bearer token、query params、request body、Axios error の正規化、Global Loading との連携を共通化しています。通信基盤と個別 endpoint も別ファイルに分離されています。

### 3.9 認証状態が明示的である

認証状態を単純な boolean ではなく、次の 4 状態として表現しています。

- `checking`
- `guest`
- `authenticated`
- `error`

初期 session 確認中と未認証を区別できるため、画面のちらつきや誤表示を避けやすい設計です。`AuthProvider` は mount 時に session を確認し、状態と error を Context へ提供します。

### 3.10 CI とローカル品質ゲートがある

Prettier、ESLint、TypeScript、unit test、coverage、Storybook build の script が用意されています。pre-commit hook でも checker と unit test を実行します。

GitHub Actions では dependency install、Prettier / ESLint / TypeScript、coverage 付き unit test、main push 時の Storybook build・deploy が実行されます。単なるアプリコードだけでなく、開発・確認・配布まで意識した構成です。

---

## 4. 改善できる点

### 4.1 API client が Redux store に直接依存している

API client が `store`、`loadingFlagUp`、`loadingFlagDown` を直接 import しています。簡単で便利ですが、通信層が「画面全体の Loading 表示」という UI 上の都合を知る構造です。

この結合には次の問題があります。

- API client 単体の再利用性が下がる
- Node script や background task で利用しにくい
- UI Loading 仕様の変更が通信層に波及する
- test で global store の副作用を考慮する必要がある
- background fetch でも Global Loading を出しやすい

中規模以上では、lifecycle callback の注入、hook 側での Loading 管理、TanStack Query または RTK Query の導入を推奨します。特に server state 専用ライブラリへ移行すると、Loading、Error、Cache、Retry、Refetch を統一できます。

### 4.2 認証 token と API client が統合されていない

API header は、呼び出し側から渡された `accessToken`、または browser の `sessionStorage` から Bearer token を取得します。しかし iOS / Android 環境には通常 `sessionStorage` がなく、AWS Amplify の `fetchAuthSession()` と API client も接続されていません。

このままでは次の課題があります。

- Native では明示的に token を渡さない限り Authorization header が付かない
- Amplify の token refresh と API client が連動しない
- 401 時の refresh / retry 戦略がない
- Web と Native で認証挙動が異なる

`TokenProvider` を抽象化し、Amplify session から非同期で token を取得する設計が適切です。大規模案件では、refresh の多重実行抑止、sign-out 時の request cancel、認証失敗時の画面遷移も必要です。

### 4.3 Auth 画面にユースケース処理が集中している

`AuthScreen` には Sign In、Sign Up、Verify、Sign Out、Loading dispatch、結果 message、tab state、form reset、認証状態更新が集まっています。

各処理で「Loading 開始、結果初期化、非同期処理、成功処理、失敗処理、Loading 終了」が繰り返されます。現在のサンプル規模では許容できますが、二重送信防止、cancel、timeout、追加認証などが入ると急速に肥大化します。

中規模以上では `useSignIn`、`useSignUp`、`useVerify` のような custom hook にユースケースを分け、画面を UI composition へ寄せるべきです。

### 4.4 feature の境界規則が画面中心である

`features` 配下を `navigation` 以外から import できない規則は、小〜中規模で無秩序な依存を防ぐには有効です。一方、大規模になると、別 feature の公開ユースケース利用、domain model の共有、複数 feature の組み合わせを表現しにくくなります。

その結果、`lib` や `utils` が「何でも置き場」になり、navigation が全画面の composition root として肥大化する可能性があります。

大規模化する場合は、feature を完全に参照禁止にするのではなく、feature の public API のみ参照可能にする構造へ発展させるべきです。

```text
app/
├─ core/       # 初期化、config、network、observability
├─ shared/     # domain 非依存 UI、汎用 hook、utility
├─ entities/   # User、Article などの domain entity
├─ features/   # SignIn、CreateArticle などのユースケース
├─ screens/    # route 単位の composition
└─ navigation/
```

### 4.5 ファイル分割が形式先行になりやすい

各画面を `_screen.tsx`、`_component.tsx`、`_type.ts`、`_utils.ts` に揃える規則は分かりやすい反面、実装がない空ファイルや薄いファイルを増やします。

問題は次のとおりです。

- 実装量に対してファイル数が増える
- 必要性より template 規約が優先される
- 同名ファイルが大量に並び、検索結果を判別しにくい
- IDE の tab や error 表示で対象 feature が分かりにくい

単純画面は `WorkScreen.tsx` のみとし、private component、hook、共有型が実際に増えた時点で分割する運用が適切です。具体的なファイル名は IDE 上の判別性も改善します。

### 4.6 server state 管理戦略がない

Redux Toolkit は client state の管理には適していますが、API data に必要な cache、deduplication、retry、background refetch、pagination、optimistic update、request cancellation、query invalidation は現在共通化されていません。

一覧、検索、詳細、更新画面が増えると、各画面で同様の処理を再実装することになります。

推奨する責務分担は次のとおりです。

- client state: Redux Toolkit
- server state: TanStack Query または RTK Query
- form state: React Hook Form
- authentication session: AuthProvider または認証 SDK

Redux にすべてを入れるのではなく、状態の性質に応じて管理手段を分けるべきです。

### 4.7 API client の本番運用機能が不足している

現在の request 関数には基本的な Axios 呼び出しと error 正規化がありますが、中規模以上で必要になりやすい次の機能は未整備です。

- timeout
- AbortSignal
- request ID / correlation ID
- 401 refresh
- retry 方針
- offline 判定
- domain error への変換
- schema validation
- logging / tracing
- endpoint 別の error 分類

Axios 以外の予期しない error は再 throw する契約になっています。この方針自体は妥当ですが、「通信・業務 error は Result、プログラミング error は throw」という契約を明文化すると呼び出し側の誤解を防げます。

### 4.8 API response の runtime 検証がない

TypeScript の generic は compile 時にしか存在しません。`request<Article[]>` と書いても、server が異なる JSON を返した場合に実行時検証は行われません。

中規模後半から大規模では、Zod、Valibot、OpenAPI generated client、JSON Schema validator などを外部境界へ導入すべきです。API DTO と domain model を分ける mapper 層も、API 仕様変更の影響を局所化します。

### 4.9 テスト coverage の意味が限定的である

Vitest の coverage threshold は設定されていますが、coverage 対象は API client と一部 Redux slice に限定されています。高い coverage 数値がアプリ全体の coverage を意味するわけではありません。

また、画面 test では React hooks や React Native component を大きく mock しています。これは軽量な分岐確認には有効ですが、実際の再 render や effect lifecycle を検証しません。

今後は次の層を追加するとよいです。

1. pure function / reducer unit test
2. React Native Testing Library による component integration test
3. API mock を用いた integration test
4. Storybook interaction / accessibility test
5. Maestro または Detox による主要導線 E2E
6. iOS / Android の smoke test

### 4.10 package manager の再現性を明確にする必要がある

`package.json` の script は Yarn を前提としますが、利用する Yarn major versionを `packageManager` field で固定していません。開発環境と CI で別の Yarn major が選択されると、lockfile の解釈が変わる可能性があります。

Yarn Classic を継続する場合は `packageManager` で version を固定します。Yarn Berry へ移行する場合は `.yarnrc.yml`、release、更新した lockfile などをまとめて管理します。Node version も `.nvmrc`、`.node-version`、Volta などで固定すると、README と CI だけに依存しない環境再現性を得られます。

### 4.11 CI は良い出発点だが大規模向け品質ゲートではない

GitHub Actions で checker と coverage test が実行される点は良好です。一方、次の検証はまだありません。

- Expo export / bundle 確認
- Android / iOS build
- Storybook browser test
- E2E
- dependency audit
- secret scan
- license check
- bundle size 監視
- Expo Doctor
- native dependency の互換性確認

中規模後半以降では、最低でも Expo export または native build と主要導線の E2E を merge gate に含めるべきです。

### 4.12 認証状態と Navigation のアクセス制御が分離されていない

Root Navigator には `main` と `others` が常に登録され、Auth 画面も通常画面として扱われています。認証状態は保持していますが、保護画面へのアクセス制御には利用されていません。

本番アプリでは、次のように認証状態に応じて navigation tree を切り替える構成が適切です。

```text
checking      → Splash / Bootstrap
guest         → Auth Stack
authenticated → App Stack
error         → Recovery Screen
```

これにより、保護された Deep Link、sign-out、session expiration の挙動を一元化できます。

### 4.13 環境変数の起動時検証がない

API Base URL や Cognito 設定は未設定時に空文字へ fallback します。その場合、設定不備が初期化時ではなく API または認証操作時に発覚します。

環境変数を `core/config` などへ集約し、schema で起動時に検証するべきです。また `EXPO_PUBLIC_*` は client bundle に含まれ得るため、秘密鍵や private credential を配置してはいけません。

---

## 5. 規模別の実用性

### 5.1 小規模プロジェクト

#### 想定

- 画面数: 5〜20 程度
- 開発者: 1〜5 人程度
- API: 数個〜数十個
- 認証 flow: 1 種類
- 複雑な offline 同期なし
- 主要 domain: 1〜3 個程度

#### 評価

**非常に実用的です。**

Expo、TypeScript strict、Navigation、Redux Toolkit、React Hook Form、Axios、Amplify Auth、Storybook、Vitest、EAS、CI、pre-commit hook が揃っています。これ以上 interface や repository を増やすと、小規模では過剰設計になる可能性があります。

小規模で最低限改善すべき項目は次のとおりです。

1. package manager の固定
2. 環境変数の検証
3. API token と Amplify session の接続
4. Auth Navigator と App Navigator の分離
5. 空の `_utils.ts` などを必須にしない

### 5.2 中規模プロジェクト

#### 想定

- 画面数: 20〜60 程度
- 開発者: 5〜15 人程度
- 複数 domain
- API: 数十〜100 以上
- 一覧、検索、詳細、更新、通知
- role・権限管理
- 複数環境
- 継続的な機能追加

#### 評価

**中規模前半までは実用的ですが、データ層と feature 境界の強化が必要です。**

特に、次の対応が必要になります。

1. TanStack Query または RTK Query
2. API client から Redux 依存を除去
3. domain 別 endpoint 構成
4. Auth / Application Navigator の分離
5. token refresh 戦略
6. feature ごとの public API
7. typed Redux hooks / selector
8. React Native Testing Library
9. 主要導線の E2E
10. error reporting と observability
11. environment config の一元化
12. CI での Expo export または native build

現在の構成から段階的に移行することは十分可能です。

### 5.3 大規模プロジェクト

#### 想定

- 画面数: 60〜100 以上
- 開発者: 15〜数十人
- 複数 team・複数 domain
- 複雑な権限
- offline、同期、push、analytics
- 長期保守
- 複数 brand・地域
- 厳格な security・監査

#### 評価

**現状のままでは非推奨です。**

Expo や React Native 自体の問題ではなく、現在の module 境界とデータ層が数十人開発を前提としていないためです。

大規模化では、次の追加・再設計が必要です。

- domain / module 単位の ownership
- public API を介した依存
- dependency graph の自動検査
- OpenAPI client generation
- DTO / domain mapper
- runtime schema validation
- server state 専用層
- feature flag
- analytics abstraction
- crash / error reporting
- structured logging
- request tracing
- offline 方針
- E2E test
- release channel 戦略
- migration 方針
- Architecture Decision Records
- CODEOWNERS
- native build を含む CI

現在の構成は大規模化の出発点にはできますが、画面とファイルだけを増やす拡張方法は避けるべきです。

---

## 6. 改善の優先順位

### 優先度 S: 早急に対応

1. **package manager を固定する**
2. **API token 取得を Amplify へ統合する**
3. **環境変数を起動時検証する**

### 優先度 A: 中規模へ進む前に対応

4. **API client から Redux store 依存を外す**
5. **server state 管理を導入する**
6. **認証状態に応じて Navigator を分離する**
7. **Auth のユースケースを custom hook へ分割する**

### 優先度 B: 中規模後半までに対応

8. **feature public API を設計する**
9. **テストを実 render 寄りへ強化する**
10. **coverage 対象を段階的に広げる**
11. **API schema validation または OpenAPI 生成を導入する**

### 優先度 C: 大規模を目指す場合

- observability
- analytics abstraction
- structured logging
- feature flag
- ADR
- CODEOWNERS
- dependency graph check
- native build CI
- performance budget
- security / license scanning
- offline synchronization strategy

---

## 7. 総合評価

| 観点             | 評価     | コメント                                            |
| ---------------- | -------- | --------------------------------------------------- |
| ディレクトリ構成 | 8/10     | 小〜中規模で理解しやすい                            |
| 型安全性         | 8/10     | strict TypeScript と Navigation 型が良い            |
| モジュール境界   | 8/10     | ESLint 強制は優秀。大規模では規則を発展させたい     |
| UI 再利用性      | 8/10     | components と Storybook が整備されている            |
| 状態管理         | 6/10     | client state の基礎はあるが server state 戦略がない |
| API 設計         | 6/10     | 共通化は良いが Store 依存と認証 token 統合が弱い    |
| 認証設計         | 6/10     | 状態表現は良いが Navigation / API との統合が不足    |
| テスト           | 6/10     | unit test と CI はあるが実統合・E2E が弱い          |
| CI/CD            | 7/10     | 基本品質ゲートはあるが native / release 検証が不足  |
| 開発環境再現性   | 5/10     | package manager の明示的な固定が必要                |
| 大規模拡張性     | 5/10     | 現状のままでは不足。段階的な再設計は可能            |
| **総合**         | **7/10** | **良質な小〜中規模向けスターター**                  |

---

## 8. 最終所見

このリポジトリは、単なる Expo サンプルよりかなりよく整備されています。TypeScript strict、強い ESLint、import 境界、型付き Navigation、Provider 集約、共通 UI と feature の分離、Storybook、Vitest、coverage、CI、pre-commit、EAS、カウンター式 Global Loading は高く評価できます。

一方、現在はまだ**画面中心のアプリケーションテンプレート**であり、業務 domain 中心の大規模アプリケーション基盤ではありません。

最も適切な位置付けは次のとおりです。

> **小規模にはそのまま実用的、中規模にはデータ層・認証・テストを強化すれば実用的、大規模にはモジュール境界と運用基盤を再設計した上で利用可能。**
