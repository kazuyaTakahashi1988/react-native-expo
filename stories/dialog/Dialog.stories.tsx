import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { styles } from '../../.storybook/styles.ts';
import Button from '../../app/components/button/_button.tsx';
import { Dialog as DialogComponent } from '../../app/components/dialog';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Dialog/Dialog',
  component: DialogComponent,
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
    closeOnBackdropPress: {
      description: '背景タップで閉じるかどうか',
      control: 'boolean',
    },
    eventText: {
      description: 'イベントボタン文言',
    },
    closeText: {
      description: 'クローズボタン文言。空または未指定で非表示',
    },
  },
} satisfies Meta<typeof DialogComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const dialogStyles = StyleSheet.create({
  customContent: {
    gap: 6,
  },
  preview: {
    rowGap: 12,
    width: '100%',
  },
});

const baseArgs = {
  onClose: () => {},
  onEvent: () => {},
  closeOnBackdropPress: true,
  visible: false,
};

const Dialog = (args: Story['args']) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={dialogStyles.preview}>
      <Button
        onPress={() => {
          setVisible(true);
        }}
        title='Dialog を開く'
      />
      <DialogComponent
        {...args}
        onClose={() => {
          setVisible(false);
        }}
        onEvent={() => {
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
    eventText: 'OK',
    closeText: 'キャンセル',
  },
  render: (args) => <Dialog {...args} />,
};

export const WithoutCancel: Story = {
  args: {
    ...baseArgs,
    title: 'キャンセルを表示しない例',
    description: '確認のみのケースに使用します。',
    closeText: '',
    eventText: 'OK',
    closeOnBackdropPress: false,
  },
  render: (args) => <Dialog {...args} />,
};

export const CustomContent: Story = {
  args: {
    ...baseArgs,
    title: 'カスタムコンテンツ',
    eventText: 'OK',
    closeText: 'キャンセル',
    children: (
      <View style={dialogStyles.customContent}>
        <Text>・チェック項目１</Text>
        <Text>・チェック項目２</Text>
        <Text>・チェック項目３</Text>
      </View>
    ),
  },
  render: (args) => <Dialog {...args} />,
};
