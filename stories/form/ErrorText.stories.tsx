import { StyleSheet, View } from 'react-native';

import ErrorText from '../../app/components/form/_errorText';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Form/ErrorText',
  component: ErrorText,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorText>;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 16,
  },
});

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'dummy',
    message: '入力内容を確認してください',
  },
};

export const LongMessage: Story = {
  args: {
    type: 'dummy',
    message: '複数行になるような長いエラーメッセージをここに表示します。',
  },
};

export const NoError: Story = {
  args: {
    type: 'dummy',
    message: undefined,
  },
};
