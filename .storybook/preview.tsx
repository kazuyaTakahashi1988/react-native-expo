import React from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

const withSafeArea: Decorator = (Story) => (
  <SafeAreaProvider>
    <View style={{ padding: 16 }}>
      <Story />
    </View>
  </SafeAreaProvider>
);

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withSafeArea],
};

export default preview;
