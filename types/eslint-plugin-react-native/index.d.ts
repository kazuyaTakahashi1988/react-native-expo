import type { ESLint } from 'eslint';

declare module 'eslint-plugin-react-native' {
  const plugin: ESLint.Plugin;
  export default plugin;
}
