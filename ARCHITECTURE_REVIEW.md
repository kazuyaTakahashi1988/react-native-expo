# Architecture Review by Codex - 2026/09/01

## 1. 結論

このコードベースは、**小規模〜中規模前半の Expo / React Native アプリ向けのスターター／リファレンス実装として、かなり実用的**です。

特に、薄い App Root、画面と共通 UI の分離、型付き Navigation、認証状態の明示化、カウンター式 Global Loading、TypeScript・ESLint・Vitest・Storybook・GitHub Actions を含む開発基盤は高く評価できます。

一方、機能・人数・画面数を増やす場合は、API 層と Redux／UI 状態の直接結合、server state 管理の不足、認証 token と API client の未統合、画面への非同期ユースケース集中、曖昧になりやすい `lib`／`utils`、限定的な統合テストがボトルネックになります。

### 規模別の判断

| 規模       | 実用性             | 評価                                                           |
| ---------- | ------------------ | -------------------------------------------------------------- |
| 小規模     | 高い               | 現状の構成をほぼそのまま採用可能                               |
| 中規模前半 | 高い               | API hook、server state 管理、テストを補強すれば十分            |
| 中規模後半 | 条件付き           | feature 境界、データ層、認証、error 処理の再設計が必要         |
| 大規模     | 現状のままでは低い | domain 単位のモジュール化、依存方向、observability、E2E が必要 |

---

## 2. 現在のアーキテクチャ

アプリ本体は、主に次の領域へ整理されています。

- `assets`: 静的アセット
- `components`: 再利用可能な共通 UI
- `features`: 画面と画面固有実装
- `lib`: 型、定数、style など
- `navigation`: Navigation と Deep Link の構成
- `utils`: API、Store、認証、App Root 関連処理

実装上の大まかな構成は次のとおりです。

```text
App
├── AppRootProvider
│   ├── GestureHandlerRootView
│   ├── SafeAreaProvider
│   ├── AuthProvider
│   ├── StoreProvider
│   ├── ToastProvider
│   └── DialogProvider
├── GlobalLoading
├── Navigation
└── StatusBar
```

`App.tsx` は初期化、Splash 制御、Provider、Global Loading、Navigation、StatusBar の組み立てに集中し、画面や API の詳細を持ちません。

---

## 3. アーキテクチャ的に良い点

### 3.1 App Root が薄い

`App.tsx` が composition root として機能し、画面状態や業務処理を直接扱っていません。Provider 群も `AppRootProvider` に集約されているため、global provider の種類、適用範囲、順序を一か所で把握できます。

現在の Provider 数であれば、可読性と実用性のバランスは良好です。将来 Provider が大幅に増えた場合は、platform、infrastructure、UI のように分類すると順序依存を管理しやすくなります。

### 3.2 feature と共通 UI が分離されている

画面実装を `app/features`、再利用可能な UI を `app/components` に配置しており、次の利点があります。

- 共通 UI を Storybook で独立確認できる
- feature 固有 UI と汎用 UI を区別しやすい
- 新規画面の配置先を判断しやすい
- 共通 component の再利用を促進できる
- 画面単位でコードを探しやすい

ボタン、フォーム、Dialog、Toast、Loading、Layout、SVG も component 単位に整理されており、小規模〜中規模で扱いやすい構成です。

### 3.3 Navigation が型安全

Home、About、Main Tab、Others、Root などの route list が型として定義され、ネストした Navigator には `NavigatorScreenParams` が使われています。

これにより、存在しない route 名、必須 parameter の渡し忘れ、不正な route params を TypeScript で検出しやすくなります。画面数が増える中規模以上で特に価値があります。

### 3.4 Deep Link を初期段階から考慮している

Expo Linking を利用し、Home、About、Work、Auth、Information の path が Navigator 構造に合わせて定義されています。

本番運用では、次の自動テストを追加するとさらに堅牢になります。

- cold start／warm start
- 存在しない path や不正 params
- 未認証時の認証必須 URL
- Push 通知経由の遷移
- login 後の redirect 復元

### 3.5 認証状態が明示的

認証状態を単純な boolean ではなく、`checking`、`guest`、`authenticated`、`error` に分けています。初期 session 確認中と未認証を区別できるため、画面のちらつきや誤表示を避けやすい設計です。

`AuthProvider` は mount 時に `fetchAuthSession()` を実行し、状態、error、再取得処理を Context へ提供しています。

### 3.6 API 結果が判別可能な Union

API 結果は `success: true` と `success: false` の判別可能 Union です。呼び出し側は `result.success` で成功と失敗を型安全に分岐できます。

API client は Base URL、method、body、query、header、Bearer token、Axios error の正規化、Global Loading 連携を共通化しており、小規模アプリの通信基盤として分かりやすい実装です。

### 3.7 Global Loading がカウンター式

Loading state は boolean ではなく count で管理されています。

```text
Request A 開始: count = 1
Request B 開始: count = 2
Request A 終了: count = 1
Request B 終了: count = 0
```

複数 request が並行しても最後の処理が終わるまで Loading を表示できます。API client が `finally` で count を戻す点と、この挙動を unit test している点も良好です。

### 3.8 状態の性質に応じて管理方法を分けている

現在は概ね次の役割分担です。

| 状態                | 管理方法                |
| ------------------- | ----------------------- |
| Global Loading      | Redux Toolkit           |
| global client state | Redux Toolkit           |
| 認証 session        | React Context + Amplify |
| form                | React Hook Form         |
| 画面固有状態        | React state             |
| Toast／Dialog       | Provider + subscription |

すべてを Redux に集約しておらず、小規模〜中規模では妥当な使い分けです。

### 3.9 品質ゲートが一通り揃っている

Prettier、ESLint、TypeScript、Vitest、coverage、Storybook build の script があり、GitHub Actions でも checker、unit test、coverage、Storybook build／deploy が実行されます。

アプリコードだけでなく、品質確認と UI カタログの運用まで考慮されたスターターになっています。

---

## 4. 改善できる点

### 4.1 API client が Redux Store に直接依存している

API client が `store`、`loadingFlagUp`、`loadingFlagDown` を直接 import しています。これは簡単ですが、通信層が「全画面 Loading を表示する」という UI 上の都合を知る構造です。

主な問題は次のとおりです。

- background task や prefetch で再利用しにくい
- UI Loading の仕様変更が通信層へ波及する
- Store なしで API client をテストしにくい
- silent request と blocking request の区別が弱い
- test で global store の副作用を考慮する必要がある

中規模以降では、API client を純粋な通信処理に限定し、custom hook、TanStack Query、RTK Query、または注入した lifecycle callback で Loading を管理することを推奨します。

```text
HTTP Client
  └── 通信、header、timeout、error normalize

Repository
  └── endpoint、DTO、validation、mapping

Query Hook
  └── cache、loading、retry、refetch、cancel

Screen
  └── 表示とユーザー操作
```

### 4.2 server state 管理が不足している

API 結果を画面の local state へ直接格納する方式では、一覧、詳細、検索、更新画面が増えたときに次を各画面で再実装しやすくなります。

- Loading／Error／Retry
- Cache／stale 判定／background refetch
- Pagination
- request cancellation／deduplication
- optimistic update
- mutation 後の invalidation
- offline 復帰後の再取得

推奨する責務分担は次のとおりです。

| 状態                | 推奨                            |
| ------------------- | ------------------------------- |
| server state        | TanStack Query または RTK Query |
| global client state | Redux Toolkit                   |
| form state          | React Hook Form                 |
| 画面一時状態        | React state                     |
| 認証 session        | Amplify + AuthProvider          |
| Navigation state    | React Navigation                |

### 4.3 認証 token と API client が統合されていない

認証側は Amplify の `fetchAuthSession()` を使いますが、API client は呼び出し側の `accessToken` または Web の `sessionStorage` から token を取得します。Native では通常 `sessionStorage` がないため、Amplify で認証済みでも自動的に Authorization header が付くわけではありません。

このままでは、token refresh、401 retry、sign-out 時の request cancel、複数 request の refresh 多重実行抑止、Web と Native の挙動統一が困難です。

次のような `TokenProvider` を抽象化し、Amplify 実装を注入すると test と将来の認証方式変更にも対応しやすくなります。

```ts
type TokenProvider = {
  getAccessToken(): Promise<string | null>;
};
```

### 4.4 AuthScreen にユースケース処理が集中している

Auth 画面には Sign In、Sign Up、Verify、Sign Out、tab state、result message、Loading dispatch、form reset、認証状態更新が集中しています。同様の「Loading 開始、処理、成功、失敗、Loading 終了」も繰り返されています。

MFA、password reset、social login、resend、timeout、cancel、analytics が加わると急速に肥大化します。中規模以降では `useSignIn`、`useSignUp`、`useVerify` などへユースケースを分け、画面を UI composition へ寄せるべきです。

### 4.5 API の型安全性が compile time に限定されている

TypeScript の generic や type assertion は server response を実行時に検証しません。不正な JSON を正しい型として扱うと、`contents.map()` のような箇所で runtime error が発生します。

中規模以降では、Zod、Valibot、OpenAPI generated client、JSON Schema validator などを外部境界へ導入し、必要に応じて API DTO と domain model を mapper で分けることを推奨します。

```text
HTTP response
    ↓
DTO schema validation
    ↓
DTO → Domain mapper
    ↓
Domain model
    ↓
UI
```

### 4.6 API client の本番運用機能が不足している

現在の API client には基本的な request と error 正規化がありますが、中規模以上では次も必要になりやすいです。

- timeout／AbortSignal／request cancellation
- retry policy／offline 判定
- 401 refresh
- request ID／correlation ID
- structured logging／tracing
- domain error への変換
- runtime schema validation
- multipart upload／progress
- idempotency key

「通信・業務 error は Result、プログラミング error は throw」のように error 契約も明文化すると、呼び出し側のばらつきを減らせます。

### 4.7 API key がソースコードに直接記述されている

サンプル API module の `X-MICROCMS-API-KEY` が文字列として直接記述されています。クライアント bundle に含まれる値は秘密情報として保護できず、`EXPO_PUBLIC_*` へ移すだけでも秘密にはなりません。

推奨対応は次のとおりです。

- 秘密鍵を必要とする API は Backend／BFF 経由にする
- 公開用途の key でも権限を最小化する
- repository 履歴に入った credential は失効・再発行する
- rotation を可能にする
- Secret scanning を CI に追加する

これは規模を問わず優先度の高い改善です。

### 4.8 `utils` と `lib` の責務が将来曖昧になりやすい

規模が大きくなると、認証 domain type、API DTO、entity、Store slice、汎用 hook を `lib`、`utils`、feature のどこへ置くか判断しにくくなります。その結果、`utils` と `lib` が「共通置き場」になる可能性があります。

中規模後半以降では技術分類だけでなく domain 分類を強めるとよいでしょう。

```text
app/
├── core/       # config、network、auth、observability
├── shared/     # domain 非依存 UI、hook、utility
├── entities/   # User、Article など
├── features/   # SignIn、FetchArticles などのユースケース
├── screens/    # route 単位の composition
└── navigation/
```

ただし小規模で最初から導入すると過剰設計になり得るため、`utils` が肥大化し始めた段階で移行するのが現実的です。

### 4.9 形式的なファイル分割が増えやすい

各画面を `_screen.tsx`、`_component.tsx`、`_type.ts`、`_util.ts`、`index.tsx` に揃える規則は分かりやすい一方、薄いファイルを増やし、IDE の tab や検索結果で対象 feature を判別しにくくします。

単純な画面は `WorkScreen.tsx` のような具体名の単一ファイルから始め、component、hook、型が実際に増えた時点で分割する方が保守しやすくなります。

### 4.10 Navigation が画面増加時に肥大化しやすい

現在の画面数では問題ありませんが、Bottom Tab、Stack、Top Tab、Deep Link の設定が増えると、route 追加時の変更箇所と重複が増えます。認証 guard や権限 guard も複雑になります。

中規模以降では Navigator を domain ごとに分割し、共通 screen options と guard 方針を明文化することを推奨します。ただし、過度な動的 route 定義は型推論を弱めるため、巨大化した段階で段階的に行うべきです。

### 4.11 テストの統合レベルがまだ弱い

API client、Redux slice、各 screen の test があり、request 生成、Axios error 正規化、予期しない error の再 throw、Loading counter などは検証されています。

一方、画面 test は依存を大きく mock しているため、実際の React Native UI、React Hook Form、Provider、Navigation、accessibility、iOS／Android 差異、Deep Link、実端末上の Cognito 認証までは保証しません。

推奨する test pyramid は次のとおりです。

1. reducer、mapper、validator の unit test
2. React Native Testing Library による component integration
3. API mock を用いた integration test
4. Storybook interaction／accessibility test
5. Maestro または Detox による主要導線 E2E
6. iOS／Android build smoke test

### 4.12 CI の build・security 確認を強化できる

checker、unit test、coverage、Storybook build はありますが、次を追加すると本番運用に近づきます。

- Yarn cache を利用した再現性の高い install
- Expo app 自体の export／build smoke test
- Android／iOS の定期 build
- Dependency review／Secret scanning
- coverage report の PR 表示
- Renovate／Dependabot
- EAS Update／Build の検証

### 4.13 設計判断の記録が弱い

`docs` には設計書の配置がありますが、全体設計書は雛形の段階です。中規模以降では、次のような ADR を残すと有効です。

- Redux に入れる状態／入れない状態
- server state library の選定
- API error を Result／throw のどちらで扱うか
- feature 間 import の規則
- token refresh の責務
- DTO と domain model の分離方針
- Deep Link と認証 guard の組み合わせ

大規模開発ではディレクトリ名よりも、依存方向と設計判断をチームで共有できることが重要です。

---

## 5. 規模別の実用性

### 5.1 小規模プロジェクト

#### 想定

- 1〜5 人程度
- 5〜20 画面程度
- API 数が少ない
- 認証フローが単純
- 複雑な offline 処理がない
- domain が 1〜3 個程度

#### 評価：非常に実用的

Navigation、Deep Link、Cognito 認証、API helper、Redux、React Hook Form、共通 UI、Toast／Dialog、Storybook、test、CI、EAS Build が揃っており、現状の構成は十分以上です。

小規模で複雑な Clean Architecture や多数の repository interface を最初から導入すると、抽象が実装量を上回る可能性があります。

最低限、API key の廃止、環境設定の validation、API timeout、重要画面の integration test、production error logging は追加したいところです。

### 5.2 中規模前半

#### 想定

- 5〜10 人程度
- 20〜50 画面程度
- endpoint、一覧、詳細、更新、検索が増える
- 複数 domain が存在する
- 認証必須画面が増える

#### 評価：実用的。ただしデータ層の補強が必要

現在の土台を十分利用できますが、次を追加することを推奨します。

1. TanStack Query または RTK Query
2. API client と Redux Loading の分離
3. Auth TokenProvider
4. feature ごとの custom hook／use case
5. runtime schema validation
6. React Native Testing Library
7. Deep Link と認証 guard の統合
8. structured error model

### 5.3 中規模後半

#### 想定

- 10〜20 人程度
- 50〜100 画面程度
- 複数チーム
- API、権限、業務ルールが複雑
- domain 間連携が増える
- リリース頻度が高い

#### 評価：条件付きで実用的

この段階では `components/features/lib/utils` だけでは責務が曖昧になり始めます。次が必要です。

- domain／entity 単位の module 境界
- feature public API の明確化
- API DTO、domain model、UI model の分離
- repository／gateway abstraction
- dependency rule の ESLint 強制
- server state 戦略の統一
- 認証、権限、route guard の共通化
- analytics、logging、crash reporting
- E2E と実端末 smoke test
- ADR と ownership の明文化

この規模では「動くか」だけでなく、「複数チームが同時に変更しても壊れにくいか」が重要です。

### 5.4 大規模プロジェクト

#### 想定

- 20 人以上
- 100 画面以上
- 複数の事業 domain／開発チーム
- 高度な権限管理
- offline、同期、監査、observability が必要

#### 評価：現状のままでは非推奨

大規模になると、API 変更の画面への波及、`utils` への集中、中央集権的な Store、feature 間連携、Navigation の肥大化、非同期処理のばらつき、共通 component の競合が問題になります。

domain ベースの構造に加え、次の非機能面が必要です。

- Crash reporting／Performance monitoring
- request correlation／tracing
- Feature flags／Remote config
- Secure storage
- Offline／sync 戦略
- API schema generation
- E2E／実端末 smoke test
- Release monitoring
- Module boundary lint
- ADR／CODEOWNERS

現在のコードベースは大規模アプリの完成形ではなく、大規模化する前段階のスターターとして評価すべきです。

---

## 6. 改善優先順位

### 優先度 A：早めに対応

1. ハードコードされた API key を廃止する
2. API client と Redux Loading を分離する
3. Amplify token と API client を統合する
4. API timeout／cancellation を追加する
5. environment variables の起動時 validation を追加する

### 優先度 B：中規模化する前に対応

1. TanStack Query または RTK Query を導入する
2. runtime schema validation を導入する
3. Auth use case を custom hook 化する
4. React Native Testing Library を導入する
5. Deep Link／認証 guard test を追加する
6. API error taxonomy を定義する
7. production logging／crash reporting を導入する

### 優先度 C：大規模化する場合

1. domain／entity 単位の module 構造へ発展させる
2. feature public API と依存方向を強制する
3. DTO／domain／UI model を分離する
4. Repository／Gateway abstraction を導入する
5. E2E と実端末 smoke test を整備する
6. ADR、CODEOWNERS、module ownership を整備する
7. feature flags、observability、release monitoring を導入する

---

## 7. 最終評価

### 採点の目安

| 観点                   | 評価 |
| ---------------------- | ---- |
| 小規模での開発しやすさ | 9/10 |
| 中規模前半での拡張性   | 8/10 |
| 中規模後半での拡張性   | 6/10 |
| 大規模での境界設計     | 4/10 |
| 型安全性               | 8/10 |
| UI 開発基盤            | 8/10 |
| API／データ層          | 5/10 |
| 認証基盤               | 6/10 |
| テスト基盤             | 6/10 |
| CI／開発体験           | 8/10 |
| セキュリティ設計       | 5/10 |
| ドキュメント／設計判断 | 5/10 |

### 総括

このコードベースは、何も決まっていない空の Expo project よりはるかに良い土台です。特に小規模〜中規模前半では、構造、型、共通 UI、認証、test、CI を一から整えるコストを大きく削減できます。

ただし、現在は画面中心の React Native application 構造であり、複雑な業務 domain を複数チームで開発するための domain architecture にはまだなっていません。

現実的な発展方針は次のとおりです。

1. 現在の分かりやすい feature 構造を維持する
2. API、Loading、認証 token の結合を先に解消する
3. server state 管理を導入する
4. feature 内の非同期ユースケースを hook へ移す
5. 規模が大きくなった段階で `core/shared/entities/features/screens` へ段階的に発展させる

つまり、**小規模にはそのまま実用的、中規模には補強すれば実用的、大規模には再設計の土台として実用的**という評価です。
