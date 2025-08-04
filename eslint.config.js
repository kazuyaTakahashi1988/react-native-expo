import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import totalFunctions from 'eslint-plugin-total-functions';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['./app/**/*.ts', './app/**/*.tsx', 'eslint.config.js'],
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
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      sonarjs: sonarjs,
      'total-functions': totalFunctions,
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
      'no-undef': 'off',
      'react/prop-types': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-restricted-imports': ['error', { patterns: ['@/????/**'] }],
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
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
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-small-switch': ['error'],
      // 'total-functions/no-unsafe-type-assertion': 'error',
      complexity: ['error', { max: 5 }],
      'max-depth': ['error', 5],
      'no-else-return': ['error'],
    },
  },
  {
    ignores: ['node_modules', '.expo'],
  },
];
