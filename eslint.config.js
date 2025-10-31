import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** @type {import('eslint').ESLint.Plugin} */
const reactPlugin = react;
/** @type {import('eslint').ESLint.Plugin} */
const reactNativePlugin = reactNative;

export default [
  js.configs.recommended,
  sonarjs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    files: ['app/**/*.ts', 'app/**/*.tsx', 'index.ts', 'eslint.config.js'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      'react-native': reactNativePlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.eslint.json',
        },
      },
    },
    rules: {
      ...reactNativePlugin.configs.all.rules,
      /* 色コードを直接書くことを禁止するルールを"off" */
      'react-native/no-color-literals': 'off',
      /* StyleSheet.create内スタイルのプロパティをソート */
      'react-native/sort-styles': ['error', 'asc', { ignoreClassNames: true }],
      /* 未定義の変数を使うことを禁止するルールを"off" */
      'no-undef': 'off',
      /* TypeScriptで型定義している場合は、PropTypesで重ねて型検証する意味がないので"off" */
      'react/prop-types': 'off',
      /* console.warn, error, info以外に警告。開発中のLog消し忘れ対策 */
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      /* async 関数なのに await を使ってない場合の警告は"off"、"error"とする */
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      /* require() を使うことを禁止するルール (0：許可, 1：警告, 2：エラー) */
      '@typescript-eslint/no-require-imports': 2,
      /* 配列や文字列に対して "indexOf(...) !== -1" よりも "includes(...)" を使うことを推奨するルール */
      '@typescript-eslint/prefer-includes': 'error',
      /* 型(type)だけをimportする場合は "import type ~~~" を使うことを強制 */
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      /* truthy/falsy 判定を厳格化し、`undefined` を見逃さない */
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
        },
      ],

      /* -------------------------------------------------------
        import並び順、自動補正
      ---------------------------------------------------------- */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default': 'off',

      /* インポートのメンバーをアルファベット順に */
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],

      /* -------------------------------------------------------
        認知的複雑度（sonarjs / total-functions / ESLintコア
      ---------------------------------------------------------- */
      'sonarjs/cognitive-complexity': ['error', 10],
      'sonarjs/no-small-switch': ['error'],
      complexity: ['error', { max: 5 }],
      'max-depth': ['error', 5],
      'no-else-return': ['error'],

      /* -------------------------------------------------------
        'total-functions/no-unsafe-type-assertion': 'error'
        が最新のESlintに対応してないため以下にて代替
      ---------------------------------------------------------- */
      /* <Type> スタイルは警告、object literal の場合は許容 */
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
      ],
      /* 型が"any"や"unknown"の値に対して、プロパティアクセスやメソッド呼び出しを行うと警告 */
      '@typescript-eslint/no-unsafe-member-access': 'error',
    },
  },
  /* -----------------------------------------------------------
    ・features 配下の実装は index.{tsx/ts} しか、features 外に import できない設定
    ・features 配下にある index.{tsx/ts} は _screen.tsx しか export できない設定
    ・先頭にハイフンが付くファイル（例：_iconXXXX.tsx）はそのファイルと同階層ディレクトリでしか import できない設定
    ※ 以下に重複記述があるのは override（上書き設定）を防ぐため
  -------------------------------------------------------------- */
  {
    files: ['app/**/*.ts', 'app/**/*.tsx', 'index.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/features/**', '!**/features/**/', '!**/features/**/index.*'],
              message:
                'features 配下の実装は index.{tsx/ts} しか、features 外に import できません。またパスの末尾には [ / ] or [ /index.{tsx/ts} ] を付与してください',
            },
            {
              group: ['**/_*', '!./_*'],
              message:
                '先頭にハイフンが付くファイル（例：_iconXXXX.tsx）はそのファイルと同階層ディレクトリでのみ import 可能です。',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['app/features/**/*.ts', 'app/features/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/_*', '!./_*'],
              message:
                '先頭にハイフンが付くファイル（例：_iconXXXX.tsx）はそのファイルと同階層ディレクトリでのみ import 可能です。',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['app/features/**/index.tsx', 'app/features/**/index.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/_*', '!./_*'],
              message:
                '先頭にハイフンが付くファイル（例：_iconXXXX.tsx）はそのファイルと同階層ディレクトリでのみ import 可能です。',
            },
            {
              group: ['./*', '!./_screen', '!./_screen.*'],
              message: 'features 配下の index.{tsx/ts} は ./_screen しか export できません。',
            },
          ],
        },
      ],
    },
  },
  prettier, // ←prettierはこの位置（最後尾近く）に置いておくこと
  {
    ignores: ['node_modules', '.expo', 'ios', 'android'],
  },
];
