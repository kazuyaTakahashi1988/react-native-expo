import type { TransformOptions } from '@babel/core';
import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  babel: (options: TransformOptions = {}) => ({
    ...options,
    plugins: [...(options.plugins ?? []), 'react-native-reanimated/plugin'],
  }),
};

export default config;