import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

const withSafeArea = (Story) => (
  <SafeAreaProvider>
    <View style={{ padding: 16 }}>
      <Story />
    </View>
  </SafeAreaProvider>
);

const preview = {
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
