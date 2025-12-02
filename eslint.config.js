// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

const restrictedImportPaths = [
  {
    name: 'react-native',
    importNames: ['Button'],
    message: 'Use app/components/button/_button.tsx instead of react-native Button.',
  },
  {
    name: 'react-native',
    importNames: ['TextInput'],
    message: 'Use app/components/form/_input.tsx instead of react-native TextInput.',
  },
  {
    name: 'axios',
    importNames: ['default'],
    message: 'Use app/services/apiHelper/_execute.ts instead of importing axios directly.',
  },
];

const baseRestrictedImportPatterns = [
  {
    group: ['**/features/**', '!**/features/**/', '!**/features/**/index.*'],
    message:
      'Screenパスの末尾には /（スラッシュ）を付与してください。また features 配下の実装は index.{tsx/ts} しか、features 外に import できません',
  },
  {
    group: ['**/_*', '!./_*'],
    message:
      '先頭にハイフンが付くファイル（例：_iconXXXX.tsx）はそのファイルと同階層ディレクトリでのみ import 可能です。',
  },
];

const featureIndexRestrictedPatterns = [
  ...baseRestrictedImportPatterns,
  {
    group: ['./*', '../*', '!./_screen', '!./_screen.*'],
    message: 'features 配下の index.{tsx/ts} は ./_screen しか export できません。',
  },
];

const restrictedImportPathsWithoutButton = restrictedImportPaths.filter(
  (restriction) => !(restriction.name === 'react-native' && restriction.importNames?.includes('Button')),
);

const restrictedImportPathsWithoutTextInput = restrictedImportPaths.filter(
  (restriction) => !(restriction.name === 'react-native' && restriction.importNames?.includes('TextInput')),
);

const restrictedImportPathsWithoutAxios = restrictedImportPaths.filter(
  (restriction) => restriction.name !== 'axios',
);

const baseRestrictedImportOptions = {
  paths: restrictedImportPaths,
  patterns: baseRestrictedImportPatterns,
};

const featureIndexRestrictedImportOptions = {
  paths: restrictedImportPaths,
  patterns: featureIndexRestrictedPatterns,
};

const restrictedImportOptionsWithoutButton = {
  paths: restrictedImportPathsWithoutButton,
  patterns: baseRestrictedImportPatterns,
};

const restrictedImportOptionsWithoutTextInput = {
  paths: restrictedImportPathsWithoutTextInput,
  patterns: baseRestrictedImportPatterns,
};

const restrictedImportOptionsWithoutAxios = {
  paths: restrictedImportPathsWithoutAxios,
  patterns: baseRestrictedImportPatterns,
};

/** @type {import('eslint').ESLint.Plugin} */
const reactPlugin = react;
/** @type {import('eslint').ESLint.Plugin} */
const reactNativePlugin = reactNative;

export default [
  {
    ignores: ['babel.config.*'],
  },
  js.configs.recommended,
  sonarjs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    files: [
      'app/**/*.ts',
      'app/**/*.tsx',
      'index.ts',
      '.storybook/**/*.ts',
      '.storybook/**/*.tsx',
      'stories/**/*.ts',
      'stories/**/*.tsx',
      'vitest.config.ts',
      'vitest.shims.d.ts',
    ],
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

      /* propsのメンバーをアルファベット順に */
      'react/jsx-sort-props': [
        'error',
        {
          ignoreCase: true,
          callbacksLast: false,
          shorthandFirst: false,
          multiline: 'ignore',
          noSortAlphabetically: false,
          reservedFirst: false,
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
        baseRestrictedImportOptions,
      ],
    },
  },
  {
    files: ['app/features/**/*.ts', 'app/features/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        baseRestrictedImportOptions,
      ],
    },
  },
  {
    files: ['app/features/**/index.tsx', 'app/features/**/index.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        featureIndexRestrictedImportOptions,
      ],
    },
  },
  {
    files: ['app/components/button/**/*.ts', 'app/components/button/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        restrictedImportOptionsWithoutButton,
      ],
    },
  },
  {
    files: ['app/components/form/**/*.ts', 'app/components/form/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        restrictedImportOptionsWithoutTextInput,
      ],
    },
  },
  {
    files: ['app/services/apiHelper/**/*.ts', 'app/services/apiHelper/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        restrictedImportOptionsWithoutAxios,
      ],
    },
  },
  prettier, // ←prettierはこの位置（最後尾近く）に置いておくこと
  {
    ignores: ['node_modules', '.expo', 'ios', 'android', 'eslint.config.js'],
  },
  ...storybook.configs['flat/recommended'],
];
