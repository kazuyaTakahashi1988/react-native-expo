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
    children: {
      description: 'コンテンツ',
    },
    notBackGroundPress: {
      description: '背景タップで閉じるかどうか',
      control: 'boolean',
    },
    closeText: {
      description: 'クローズボタンテキスト',
    },
    onEvent: {
      description: 'イベントボタン処理',
    },
    eventText: {
      description: 'イベントボタンテキスト。',
    },
    onClose: {
      description: 'クローズボタン & 背景タップ処理 ',
    },
  },
} satisfies Meta<typeof DialogComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const dialogStyles = StyleSheet.create({
  preview: {
    rowGap: 12,
    width: '100%',
  },
  longHeight: {
    height: 600,
  },
});

const Dialog = (args: Story['args']) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={dialogStyles.preview}>
      <Button
        onPress={() => {
          setVisible(true);
        }}
        title='ダイアログを開く'
      />
      <DialogComponent
        {...args}
        onClose={() => {
          setVisible(false);
        }}
        onEvent={() => {
          alert('Thanks to Tap!!');
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
};

export const Basic: Story = {
  args: {
    title: 'Basic ダイアログ',
    children: (
      <Text>
        ダミーテキスト{'\n'}
        ------------{'\n'}
        ------------{'\n'}
        ------------{'\n'}
      </Text>
    ),
    eventText: 'イベントボタン',
    closeText: '閉じるボタン',
    onClose: () => {},
    onEvent: () => {},
    visible: true,
  },
  render: (args) => <Dialog {...args} />,
};

export const WithoutClose: Story = {
  args: {
    title: 'WithOut Close ダイアログ',
    children: (
      <Text>
        閉じるボタンなし ＆ 背景タップでも閉じれないダイアログです。{'\n'}
        {'\n'}
        イベントボタンを押して閉じてください。
      </Text>
    ),
    eventText: 'イベントボタン',
    onEvent: () => {},
    notBackGroundPress: true,
    visible: true,
  },
  render: (args) => <Dialog {...args} />,
};

export const LongContents: Story = {
  args: {
    title: 'Long Contents ダイアログ',
    eventText: 'イベントボタン',
    closeText: '閉じるボタン',
    onClose: () => {},
    onEvent: () => {},
    children: (
      <View>
        <Text style={dialogStyles.longHeight}>・スクロールできます。</Text>
        <Text style={dialogStyles.longHeight}>・ダミーテキスト</Text>
        <Text style={dialogStyles.longHeight}>・ダミーテキスト</Text>
      </View>
    ),
    visible: true,
  },
  render: (args) => <Dialog {...args} />,
};

export const LongContentsOnly: Story = {
  args: {
    onClose: () => {},
    children: (
      <View>
        <Text style={dialogStyles.longHeight}>
          ・Long Contents Only ダイアログ{'\n'}
          ・ロングコンテンツのみのダイアログです。{'\n'}
          ・スクロールできます。
        </Text>
        <Text style={dialogStyles.longHeight}>・ダミーテキスト</Text>
        <Text style={dialogStyles.longHeight}>・ダミーテキスト</Text>
      </View>
    ),
    visible: true,
  },
  render: (args) => <Dialog {...args} />,
};
