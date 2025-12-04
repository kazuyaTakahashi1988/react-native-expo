import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { styles } from '../../.storybook/styles.ts';
import Button from '../../app/components/button/_button.tsx';
import Dialog from '../../app/components/dialog/_dialog.tsx';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Dialog/Dialog',
  component: Dialog,
  decorators: [
    (Story) => (
      <View style={[styles.container, styles.center]}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'ダイアログタイトル',
    },
    description: {
      description: '本文テキスト',
    },
    confirmText: {
      description: '確定ボタン文言',
    },
    cancelText: {
      description: 'キャンセルボタン文言',
    },
    hideCancelButton: {
      description: 'キャンセルボタンの表示/非表示を切り替える',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const dialogPreviewStyles = StyleSheet.create({
  customContent: {
    gap: 6,
  },
  preview: {
    rowGap: 12,
    width: '100%',
  },
});

const baseArgs = {
  onCancel: () => {},
  onConfirm: () => {},
  visible: false,
};

const DialogPreview = (args: Story['args']) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={dialogPreviewStyles.preview}>
      <Button
        onPress={() => {
          setVisible(true);
        }}
        title='Dialog を開く'
      />
      <Dialog
        {...args}
        onCancel={() => {
          setVisible(false);
        }}
        onConfirm={() => {
          alert('確認しました');
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
};

export const Basic: Story = {
  args: {
    ...baseArgs,
    title: 'Dialog タイトル',
    description:
      'この内容で実行しますか？この操作は元に戻すことができないため、十分にご注意ください。',
  },
  render: (args) => <DialogPreview {...args} />,
};

export const WithoutCancel: Story = {
  args: {
    ...baseArgs,
    title: 'キャンセルを表示しない例',
    description: '確認のみのケースに使用します。',
    hideCancelButton: true,
  },
  render: (args) => <DialogPreview {...args} />,
};

export const CustomContent: Story = {
  args: {
    ...baseArgs,
    title: 'カスタムコンテンツ',
    children: (
      <View style={dialogPreviewStyles.customContent}>
        <Text>・チェック項目１</Text>
        <Text>・チェック項目２</Text>
        <Text>・チェック項目３</Text>
      </View>
    ),
  },
  render: (args) => <DialogPreview {...args} />,
};
