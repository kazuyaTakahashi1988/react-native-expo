# Architecture Review by Codex - 2026/6/29

このコードベースは、**小〜中規模の Expo / React Native アプリを素早く・一定の品質で作るための土台としてはかなり実用的**です。特に、`app/features`、`app/components`、`app/services`、`app/navigation`、`app/lib` に責務を分ける構成が README にも明示されており、画面・共通 UI・サービス・ナビゲーション・静的定義を分離する意図が読み取りやすいです。

一方で、**大規模プロジェクトまでそのまま拡張するには弱い部分もあります**。特に、ナビゲーション型が `Record<string, ...>` で緩いこと、API 層が 1 ファイルに集まりやすいこと、Redux store が単一 slice で始まっていること、feature 内の `_screen / _service / _type / _component` 分割が形式先行になりやすいことが、規模拡大時の主なボトルネックです。

---

## 現在のアーキテクチャの特徴

### 1. ルート構成

`App.tsx` はかなりシンプルで、アプリ起動時の screen 有効化、Splash 制御、Provider 群、GlobalLoading、Navigation、StatusBar を配置しています。ルートが薄く保たれている点は良いです。

また、`AppRootProvider` に `GestureHandlerRootView`、`SafeAreaProvider`、`AuthProvider`、`StoreProvider`、`ToastProvider`、`DialogProvider` が集約されています。これは「アプリ全体で必要な Provider を一箇所で確認できる」という点で、読みやすく保守しやすい構成です。

### 2. ディレクトリ分割

README 上では、以下のように役割が分けられています。

- `app/components`: 各コンポーネント
- `app/features`: 各画面、コロケーション
- `app/lib`: 静的な値・処理
- `app/navigation`: ナビゲーション
- `app/services`: 動的な処理
- `app/App.tsx`: アプリルート

この構成は、**小〜中規模アプリでは理解しやすく、チームにも説明しやすい**です。

### 3. ESLint による境界制御

このコードベースのかなり良い点は、単にディレクトリを分けているだけでなく、ESLint で依存方向や private file 的なルールをある程度強制している点です。

例えば、`_` から始まるファイルを同階層以外から import しにくくするルールがあります。

また、`app/features` 配下の実装を `app/navigation` 配下以外から import できないようにする制約もあります。

これは、**feature の内部実装が無秩序に他の feature や共通層から参照されることを防ぐ**ため、アーキテクチャとして非常に良い設計意図です。

---

## 良い点

### 1. App Root が薄く、Provider 集約が明確

`App.tsx` は起動処理とトップレベル構成に集中しており、画面ロジックや API ロジックを持っていません。

Provider 群も `AppRootProvider` にまとめられているため、アプリ全体の横断関心事を把握しやすいです。

これは、以下の点で良いです。

- 新規参加者がアプリ全体の構成を追いやすい
- Provider の追加・削除箇所が明確
- `App.tsx` が肥大化しにくい
- 横断的な機能、例: 認証、Store、Toast、Dialog、SafeArea を一箇所で管理できる

### 2. `features` と `components` の分離ができている

画面固有の実装は `app/features` に置かれ、共通 UI は `app/components` に置かれています。README でもこの意図が明記されています。

例えば `WorkScreen` は、共通の `Button` と `Layout` を利用する画面として実装されており、画面側は画面の振る舞いに集中しています。

この分離は、以下のようなメリットがあります。

- 共通 UI と画面固有 UI の境界がわかりやすい
- Storybook で共通コンポーネントを育てやすい
- 画面追加時の配置ルールが明確
- 小〜中規模チームで迷いにくい

### 3. ESLint / TypeScript の品質ゲートが強い

`package.json` の `lint` は `eslint . --max-warnings=0 && tsc --noEmit` になっており、ESLint と TypeScript 型検査をセットで走らせる設計です。

ESLint では、TypeScript の recommended / recommendedTypeChecked / strictTypeChecked、React Hooks、React Native、SonarJS、import order、props sort、複雑度制限などが導入されています。

特に以下は良いです。

- `@typescript-eslint/consistent-type-imports`
- `@typescript-eslint/strict-boolean-expressions`
- `sonarjs/cognitive-complexity`
- `complexity`
- `max-depth`
- `import/order`
- `react/jsx-sort-props`

これにより、**コード品質を人間のレビューだけに依存しない状態**を作れています。

### 4. Global Loading の仕組みがシンプル

API 実行時に Redux の `loadingFlagCount` を increment / decrement し、`GlobalLoading` がその count を見て overlay を出す設計です。

`loadingFlagCount` を count 方式にしているため、複数 API が並列に走った場合でも、最後の API が終わるまで loading を維持できます。単純な boolean より堅い設計です。

### 5. Form 連携を共通化しようとしている

`useRHFController` によって、React Hook Form の `control` / `name` がある場合とない場合の両方に対応しようとしています。

これは、共通 form component を以下の両方で使えるようにする意図だと読めます。

- React Hook Form 管理下の入力
- 単体 UI としての入力

フォーム部品を Storybook や画面で再利用しやすくする設計として良いです。

### 6. Storybook / EAS / SonarCloud を意識している

`package.json` に Storybook 起動・ビルド script が用意されています。

README にも Storybook、EAS Build、SonarCloud への言及があり、単なるサンプルではなく、開発・確認・配布・分析まで意識しているプロジェクトだと評価できます。

---

## 改善できる点・悪い点

### 1. Navigation の型が緩すぎる

現在の root navigation type は以下です。

```ts
export type TypeRootList = Record<
  string,
  undefined | { [key: string]: string | object }
>;
```

これは柔軟ですが、React Navigation の型安全性をかなり捨てています。

問題点は以下です。

- `navigation.navigate('存在しない画面名')` を型で防ぎにくい
- route params の shape を画面ごとに厳密化できない
- nested navigator が増えたときに型の恩恵が薄い
- 大規模化すると navigation 周りのリファクタが危険になる

例えば `WorkScreen` は `navigation.navigate('about')` を呼んでいますが、`about` が本当に存在するか、params が必要かどうかを現在の `TypeRootList` では十分に保証できません。

#### 改善案

小〜中規模なら現状でも動きますが、中規模以上では以下のように明示型にした方が良いです。

```ts
export type RootStackParamList = {
  main: undefined;
  others: undefined;
};

export type MainTabParamList = {
  home: undefined;
  about: undefined;
  work: undefined;
};

export type HomeNestParamList = {
  homeChild00: undefined;
  homeChild01: { id: string };
};
```

特に、大規模案件では route name と params は仕様そのものなので、**型で守る価値が非常に高い**です。

### 2. API 層が 1 ファイル集中になりやすい

`app/services/apiService/_axios.ts` には、axios 実行基盤と個別 API 関数が同居しています。

現時点では問題ありませんが、API が増えると以下の問題が出やすいです。

- `_axios.ts` が巨大化する
- domain / feature ごとの API 所有者が不明確になる
- request / response 型が散らばる
- swagger / OpenAPI との対応関係が追いにくくなる
- mock / test がしにくくなる

#### 改善案

規模が上がるなら、以下の分割をおすすめします。

```txt
app/services/apiService/
  client.ts              # axios instance / interceptor
  types.ts               # 共通 API 型
  endpoints/
    articleApi.ts
    authApi.ts
    userApi.ts
```

もしくは feature co-location を強めるなら、

```txt
app/features/articles/
  api.ts
  types.ts
  screen.tsx
```

のように、**API を feature 側に寄せる設計**もありです。

現在の ESLint ルールでは `features` 配下の import を制限しているため、どちらの思想にするかは明確にした方が良いです。

### 3. API client が Redux store に直接依存している

`_axios.ts` は `store` を直接 import して loading action を dispatch しています。

これは簡単で便利ですが、規模が大きくなると結合が強くなります。

問題点は以下です。

- API client が UI loading 表示の都合を知っている
- test 時に store の副作用を考慮する必要がある
- API client を別環境、例: Node script、Storybook mock、unit test で使いにくい
- loading 表示の仕様変更が API 層に波及する

#### 改善案

中規模以上では、以下のいずれかが望ましいです。

1. axios interceptor に loading 管理を閉じ込める
2. API 呼び出し hook 側で loading を管理する
3. TanStack Query / RTK Query などに寄せる
4. `ApiClient` に lifecycle callback を注入する

例:

```ts
createApiClient({
  onRequestStart: () => dispatch(loadingFlagUp()),
  onRequestEnd: () => dispatch(loadingFlagDown()),
});
```

これにより、API client 自体は store を知らずに済みます。

### 4. Redux store が単一 slice で、大規模化には未準備

現在の Redux store は `appSlice` 1 つだけで、`loadingFlagCount` を管理しています。

小規模なら十分ですが、大規模では以下が必要になります。

- slice 分割
- root reducer
- typed hooks
- selector の整理
- middleware 設計
- persistence 方針
- devtools 方針
- server state と client state の分離

#### 改善案

少なくとも中規模以上では以下のようにしたいです。

```txt
app/services/storeService/
  store.ts
  hooks.ts
  slices/
    appSlice.ts
    authSlice.ts
    settingsSlice.ts
```

さらに、API の server state は Redux に入れず、TanStack Query / RTK Query を使う設計も検討価値があります。

### 5. Feature 分割が形式的になりやすい

現在は画面ごとに `_screen.tsx`、`_type.ts`、`_service.ts`、`_component.tsx` のような構成が多くあります。

この規約は悪くありませんが、すべての画面で必ず `_service` や `_component` を置く運用にすると、以下のような弊害が出ます。

- 空ファイル・薄いファイルが増える
- ファイル数が増えすぎて追いにくい
- 実装より規約が先行する
- 小さい画面でも過剰分割になる

実際、`WorkScreen` は画面実装としては非常にシンプルで、現状では `_service.ts` が実質的に空に近い構成です。

#### 改善案

以下のような基準を決めると良いです。

- `_service.ts` は副作用・API・永続化・外部連携がある場合のみ作る
- `_component.tsx` は画面内 private component が複数ある場合のみ作る
- `_type.ts` は画面固有型が 2〜3 個以上になったら分ける
- 単純画面は `screen.tsx` + `index.ts` だけでも許容する

つまり、**規約は持ちつつ、過剰分割は避ける**のが良いです。

### 6. `services` の責務が広い

README では `services` は「動的な処理」とされています。

ただし、現在の `services` には以下のように性質の異なるものが入っています。

- API service
- Auth service
- Store service
- App root service
- Form service

この分類は小規模では問題ありませんが、中〜大規模では `services` が「何でも置き場」になりやすいです。

#### 改善案

責務ごとに分類をより明確化すると良いです。

```txt
app/core/
  appRoot/
  providers/
  config/

app/shared/
  ui/
  form/
  hooks/

app/features/
  auth/
  articles/
  settings/

app/infrastructure/
  api/
  auth/
  storage/
```

今すぐ大きく変える必要はありませんが、大規模化を見据えるなら、`services` の定義をもう少し絞ると安全です。

### 7. 認証状態の扱いはシンプルだが、実アプリでは追加設計が必要

`AuthProvider` は `fetchAuthSession()` で tokens の有無を確認し、`isSignedIn` を state に持っています。

これは初期実装として良いですが、実アプリでは以下が必要になりやすいです。

- token refresh
- sign-in / sign-out 後の navigation reset
- 起動時の認証チェック中 state
- 認証必須 route と guest route の分離
- Cognito error の標準化
- user profile の取得・キャッシュ
- multi tenant / role / permission

現状の `isSignedIn: boolean` だけでは、認証の状態遷移を表現するにはやや弱いです。

#### 改善案

例えば以下のような state にすると拡張しやすいです。

```ts
type AuthStatus = 'checking' | 'guest' | 'authenticated' | 'error';
```

大規模化するなら、`AuthProvider` は単なる boolean provider ではなく、**認証状態マシンに近い役割**にした方が良いです。

### 8. 環境変数・設定値の validation が見えない

API base URL や Cognito の設定値は `process.env.EXPO_PUBLIC_... ?? ''` で参照されています。

認証側でも userPoolId / clientId が空文字 fallback になっています。

これは起動時エラーを避けられる一方で、設定漏れに気づきにくいです。

#### 改善案

中規模以上では `config` 層を作り、必須 env がない場合は development で明確に落とす方が良いです。

```ts
const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }
  return value;
};
```

Expo の public env はクライアントに埋め込まれるため、秘匿情報を置かないルールも README などに明記すると良いです。

---

## 小規模・中規模・大規模での実用性

## 小規模プロジェクト

### 評価: かなり実用的

小規模、例えば以下のようなアプリでは十分に実用的です。

- 画面数: 5〜20 程度
- API 数: 10〜30 程度
- 開発者: 1〜5 人
- 認証・フォーム・一覧・詳細・簡単な設定画面が中心
- 複雑な offline / sync / 権限管理がない

理由は以下です。

- ルート構成が薄い
- Provider が集約されている
- components / features / services / navigation の分離がわかりやすい
- ESLint / TypeScript が強めに効いている
- Storybook も使える
- API / Auth / Store の最低限の基盤がある

小規模では、むしろ現在の構成は少し丁寧なくらいです。

---

## 中規模プロジェクト

### 評価: 実用的。ただし設計ルールの追加が必要

中規模、例えば以下のようなアプリでも使えます。

- 画面数: 20〜80 程度
- API 数: 30〜150 程度
- 開発者: 5〜15 人
- 認証、権限、フォーム、検索、通知、設定、複数 feature がある
- Storybook / CI / EAS Build を運用する

ただし、現状のままだと徐々に以下が問題になります。

- navigation 型が緩い
- API 関数が `_axios.ts` に集まりやすい
- Redux slice が単一
- `services` が何でも置き場になりやすい
- feature の公開 API と private 実装の境界が曖昧になりやすい
- 認証 state が boolean だけでは不足する

中規模で使うなら、以下の改善は早めに入れたいです。

1. navigation param list を明示型にする
2. API endpoints を domain / feature ごとに分割する
3. store を slice 分割する
4. typed dispatch / selector hooks を導入する
5. config validation を入れる
6. feature ごとの公開 API、例えば `index.ts` のみ外部公開、を明文化する
7. API error / auth error / validation error の標準化を行う

---

## 大規模プロジェクト

### 評価: そのままでは厳しい。土台としては使えるが再設計が必要

大規模、例えば以下のようなアプリでは、現在の構成をそのまま拡張するのはおすすめしません。

- 画面数: 80〜200+
- API 数: 150+
- 開発者: 15〜50+
- 複数チームが feature を並行開発
- 権限、課金、通知、深い navigation、offline、複雑なフォームがある
- 長期運用、A/B test、多言語、監視、障害対応が必要

大規模で問題になる点は以下です。

- `TypeRootList = Record<string, ...>` では navigation の型安全性が不足する
- API 層と loading store が密結合している
- API endpoint が一箇所に増え続ける構造になりやすい
- Redux store が単一 slice で、domain ごとの状態管理に未対応
- Provider が増えると `AppRootProvider` が provider hell になりやすい
- `services` の抽象度が広く、責務境界が崩れやすい

大規模にするなら、以下のような追加設計が必要です。

```txt
app/
  core/
    app/
    config/
    providers/
    navigation/

  shared/
    ui/
    form/
    hooks/
    utils/
    types/

  features/
    auth/
    home/
    work/
    article/
    settings/

  entities/
    user/
    article/

  infrastructure/
    api/
    auth/
    storage/
    analytics/
```

また、以下も検討した方が良いです。

- OpenAPI から API client / 型を生成
- TanStack Query or RTK Query による server state 管理
- feature flag / remote config
- logging / monitoring / crash reporting
- i18n
- access control
- navigation schema の厳密化
- UI design system の強化
- package 分割、または monorepo 化

---

## 優先度別の改善提案

### 優先度 高

#### 1. Navigation 型を厳密化する

現在の `TypeRootList` は柔軟すぎます。

最優先で、navigator ごとに param list を定義することをおすすめします。

```ts
type RootStackParamList = {
  main: undefined;
  others: undefined;
};

type MainTabParamList = {
  home: undefined;
  about: undefined;
  work: undefined;
};
```

これにより、画面名・params の間違いを compile time に検出できます。

#### 2. API 層を分割する

`_axios.ts` は client と endpoint が同居しています。

まずは以下のように分けるのが良いです。

```txt
apiService/
  client.ts
  endpoints/
    article.ts
```

#### 3. Store を slice 分割できる構造にする

現在は単一 `appSlice` です。

今後の拡張を考えるなら、早めに `slices` ディレクトリを切った方が良いです。

---

### 優先度 中

#### 4. Config validation を追加する

env の空文字 fallback は設定漏れを隠します。

development / CI では必須 env の不足を明示的に検出した方が良いです。

#### 5. Auth state を boolean から状態モデルにする

現在は `isSignedIn` の boolean 管理です。

`checking / guest / authenticated / error` のように状態を分けると、起動時や token refresh 時に扱いやすくなります。

#### 6. API error の標準化

現在は axios error を console.error して再 throw しています。

UI に出す error、ログに送る error、リトライ可能な error、認証切れ error を分類すると運用しやすくなります。

---

### 優先度 低〜中

#### 7. Feature 内ファイル分割ルールを見直す

`_screen / _type / _service / _component` は悪くありませんが、過剰分割にならないように基準を決めると良いです。

#### 8. Provider 増加への備え

現状の `AppRootProvider` は見やすいですが、今後 Provider が増えると深くなります。

必要に応じて provider composition helper を使うとよいです。

---

## 結論

このコードベースは、**Expo / React Native の小〜中規模アプリ向けテンプレートとしては良い出来**です。特に、ディレクトリ責務、Provider 集約、ESLint による import 制約、TypeScript strict、Storybook 導入は高く評価できます。

ただし、**大規模化するには navigation 型、API 層、store 設計、認証状態、config validation の強化が必須**です。現状は「大規模でも使える完成形」ではなく、**中規模までは実用的、大規模には発展的な再設計が必要な土台**という評価です。
