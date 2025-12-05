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
    closeOnBackGround: {
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
  closeOnBackGround: true,
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
        title='Dialog Open'
      />
      <DialogComponent
        {...args}
        onClose={() => {
          setVisible(false);
        }}
        onEvent={() => {
          alert('Thanks to Tap');
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
};

export const BasicDialog: Story = {
  args: {
    ...baseArgs,
    title: 'Basic Dialog',
    children: (
      <Text>
        description：Dummy Text。----------------------------------------------------------------
      </Text>
    ),
    eventText: 'Event Button',
    closeText: 'Close Button',
  },
  render: (args) => <Dialog {...args} />,
};

export const WithoutCloseButton: Story = {
  args: {
    ...baseArgs,
    title: 'Close Buttonを表示しない例',
    children: <Text>OKボタンを押さないと閉じれません。</Text>,
    eventText: 'OK',
    closeOnBackGround: false,
  },
  render: (args) => <Dialog {...args} />,
};

export const WithoutEventAndCloseButton: Story = {
  args: {
    ...baseArgs,
    title: 'Event & Close Buttonを表示しない例',
    children: <Text>背景を押さないと閉じれません。</Text>,
  },
  render: (args) => <Dialog {...args} />,
};

export const CustomContentScrollView: Story = {
  args: {
    ...baseArgs,
    title: 'Custom Contents（ScrollView）',
    eventText: 'Event Button',
    closeText: 'Close Button',
    children: (
      <View style={dialogStyles.customContent}>
        <Text>
          ・Dummy Text１
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
        <Text>
          ・Dummy Text２
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
        <Text>
          ・Dummy Text３
          {[...Array(30).keys()].map((i) => (
            <Text key={i}>----- {'\n'}</Text>
          ))}
        </Text>
      </View>
    ),
  },
  render: (args) => <Dialog {...args} />,
};
