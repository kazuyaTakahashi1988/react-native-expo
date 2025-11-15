import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mergeConfig } from 'vite';

import type { TransformOptions } from '@babel/core';
import type { StorybookConfig } from '@storybook/react-native-web-vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          'react-native-reanimated': resolve(
            __dirname,
            '../node_modules/react-native-reanimated/mock.js',
          ),
        },
      },
    }),
};

export default config;
