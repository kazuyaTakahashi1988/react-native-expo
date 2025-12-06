import React from 'react';
import { StyleSheet, View } from 'react-native';

import { styles } from '../../.storybook/styles.ts';
import Button from '../../app/components/button/_button.tsx';
import ToastComponent from '../../app/components/toast/_toast.tsx';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Toast/Toast',
  component: ToastComponent,
  decorators: [
    (Story) => (
      <View style={[styles.container, styles.center]}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    message: {
      description: 'トーストに表示するメッセージ',
    },
    duration: {
      description: '表示継続時間（ms）',
      control: { type: 'number', min: 1000, step: 500 },
    },
    position: {
      control: 'radio',
      options: ['top', 'center', 'bottom'],
      description: '表示位置',
    },
    variant: {
      control: 'radio',
      options: ['default', 'success', 'error'],
      description: 'バリエーション',
    },
  },
} satisfies Meta<typeof ToastComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  visible: false,
  message: 'Toast Message',
  position: 'bottom' as const,
  duration: 2000,
};

const ToastPreview = (args: Story['args']) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={gapStyles.gap}>
      <Button
        onPress={() => {
          setVisible(true);
        }}
        title='Show Toast'
      />
      <ToastComponent
        {...args}
        onHide={() => {
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
};

export const BasicToast: Story = {
  args: {
    ...baseArgs,
    message: 'Basic Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const TopToast: Story = {
  args: {
    ...baseArgs,
    position: 'top',
    message: 'Top Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const CenterToast: Story = {
  args: {
    ...baseArgs,
    position: 'center',
    message: 'Center Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const SuccessToast: Story = {
  args: {
    ...baseArgs,
    variant: 'success',
    message: 'Success Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const ErrorToast: Story = {
  args: {
    ...baseArgs,
    variant: 'error',
    message: 'Error Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

const gapStyles = StyleSheet.create({
  gap: { gap: 12, width: '100%' },
});
