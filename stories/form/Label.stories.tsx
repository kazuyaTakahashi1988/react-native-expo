import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import Label from '../../app/components/form/_label.tsx';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Form/Label',
  component: Label,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Label>;

const styles = StyleSheet.create({
  container: { alignItems: 'flex-start', flex: 1 },
});

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'ラベルテキスト - Default',
  },
};

export const Required: Story = {
  args: {
    label: 'ラベルテキスト - Required',
    rules: { required: true },
  },
};
