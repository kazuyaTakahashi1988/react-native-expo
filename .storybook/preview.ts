import type { Preview } from '@storybook/react';
import { View } from 'react-native';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 24,
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default preview;
