import { Text, View } from 'react-native';

import { styles } from '../../.storybook/styles.ts';
import Button from '../../app/components/button/_button.tsx';
import { IconInfo } from '../../app/components/svg/icon';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Button/Button',
  component: Button,
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
      description: 'ボタンタイトル',
    },
    onPress: {
      description: 'onPress イベント',
    },
    pattern: {
      description: 'デザインパターン',
    },
    size: {
      description: 'テキストサイズ',
    },
    containerStyle: {
      control: { type: 'object' },
      description:
        'Button を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
    },
    style: {
      control: { type: 'object' },
      description: 'Button 自体のスタイル \n\n Set 例：{ "padding": 20, "borderRadius": 50 }',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Primary ボタン',
    onPress() {
      alert('Primary Event!!');
    },
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary ボタン',
    pattern: 'secondary',
    onPress() {
      alert('Secondary Event!!');
    },
  },
};

export const Icon: Story = {
  args: {
    title: (
      <>
        <IconInfo color='#fff' />
        <Text> ボタン</Text>
      </>
    ),
    onPress() {
      alert('Icon Event!!');
    },
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled ボタン',
    disabled: true,
  },
};
