import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
      'react-native/Libraries/Image/AssetSourceResolver': 'expo-asset/build/AssetSourceResolver',
      'react-native/Libraries/Image/AssetRegistry': 'react-native-web/dist/cjs/modules/AssetRegistry/index',
      '@': path.resolve(__dirname, '../app'),
    };

    config.resolve.extensions = [...(config.resolve.extensions ?? []), '.ts', '.tsx'];

    config.module?.rules?.push({
      test: /\.(png|jpg|jpeg|gif|bmp|ttf|otf)$/,
      type: 'asset/resource',
    });

    return config;
  },
  babel: async (options) => ({
    ...options,
    presets: [...(options?.presets ?? []), require.resolve('babel-preset-expo')],
  }),
};

export default config;
