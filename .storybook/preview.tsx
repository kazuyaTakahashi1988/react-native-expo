import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import type { Decorator } from '@storybook/react';
import type { Preview } from '@storybook/react-native-web-vite';

import 'react-native-gesture-handler';
import 'react-native-reanimated';

const gestureHandlerDecorator: Decorator = (Story) => (
  <GestureHandlerRootView style={styles.gestureWrapper}>
    <Story />
  </GestureHandlerRootView>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [gestureHandlerDecorator],
};

const styles = StyleSheet.create({
  gestureWrapper: {
    flex: 1,
  },
});

export default preview;
