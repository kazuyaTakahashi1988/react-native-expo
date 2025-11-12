import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    if (config.resolve == null) {
      return config;
    }

    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
      'react-native/Libraries/Animated/NativeAnimatedHelper':
        'react-native-web/dist/cjs/exports/Animated/NativeAnimatedHelper',
    };

    config.resolve.extensions = Array.from(
      new Set([...(config.resolve.extensions ?? []), '.ts', '.tsx']),
    );

    return config;
  },
};

export default config;
