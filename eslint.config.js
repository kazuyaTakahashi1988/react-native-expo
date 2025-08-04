/* eslint-disable */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier'; // ← 追加！

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: pluginPrettier, // ← 追加！
    },
    rules: {
      'prettier/prettier': 'error', // ← 有効化
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    ignores: ['node_modules', '.expo'],
  },
];
