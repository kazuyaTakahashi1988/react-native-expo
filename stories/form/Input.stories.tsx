import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import { Input } from '../../app/components/form';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Form/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    errorText: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
    rules: {
      control: { type: 'object' },
      description: 'バリデーションルール \n\n Set 例：{ "required": true }',
    },
    containerStyle: {
      control: { type: 'object' },
      description:
        'Input を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
    },
    style: {
      control: { type: 'object' },
      description: 'TextInput 自体のスタイル \n\n Set 例：{ "padding": 20, "borderRadius": 50 }',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
    control: {
      control: { type: 'object' },
      description: 'react-hook-form 用の props',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LabelAndPlaceholder: Story = {
  args: {
    label: 'ラベル テキスト',
    placeholder: 'プレイスホルダー テキスト',
  },
};

export const Required: Story = {
  args: {
    label: 'ラベル テキスト',
    placeholder: 'プレイスホルダー テキスト',
    rules: { required: '必須項目です' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'ラベル テキスト',
    errorText: '必須項目です',
    placeholder: 'プレイスホルダー テキスト',
    rules: { required: '必須項目です' },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
