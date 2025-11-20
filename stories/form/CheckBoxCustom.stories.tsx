import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import { CheckBoxCustom } from '../../app/components/form/';

import type { TypeCheckBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { inquiry: string[] };

const defaultOptions: TypeCheckBoxCustom<FormValues>['options'] = [
  { label: 'メール', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'アプリ通知', value: 'push' },
];

const meta = {
  title: 'Form/CheckBoxCustom',
  component: CheckBoxCustom,
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
      description: 'ラベルテキスト',
    },
    errorText: {
      control: { type: 'text' },
      description: 'エラーテキスト',
    },
    name: {
      control: { type: 'text' },
      description: 'value ネーム',
    },
    rules: {
      control: { type: 'object' },
      description: 'バリデーションルール \n\n Set 例：{ "required": true }',
    },
    containerStyle: {
      control: { type: 'object' },
      description:
        'CheckBox を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
    },
    optionListStyle: {
      control: { type: 'object' },
      description:
        'オプション のスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "yellow" }',
    },
    optionRowStyle: {
      control: { type: 'object' },
      description:
        'オプション各行 のスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "white" }',
    },
    optionLabelStyle: {
      control: { type: 'object' },
      description:
        'オプション各行 のラベルスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "green" }',
    },
    trackStyle: {
      control: { type: 'object' },
      description:
        'オプション各行 のトラックスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "blue" }',
    },
    knobStyle: {
      control: { type: 'object' },
      description:
        'オプション各行 のノブスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "black" }',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
    options: {
      control: { type: 'object' },
      description: 'オプション',
    },
    control: {
      control: { type: 'object' },
      description: 'react-hook-form 用の props',
    },
    activeColor: {
      control: { type: 'text' },
      description: 'カスタムカラー \n\n Set 例：#0d9488',
    },
    inactiveColor: {
      control: { type: 'text' },
      description: 'カスタムカラー \n\n Set 例：#cbd5f5',
    },
    knobColor: {
      control: { type: 'text' },
      description: 'カスタムカラー \n\n Set 例：#042f2e',
    },
  },
} satisfies Meta<typeof CheckBoxCustom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

export const Label: Story = {
  args: {
    options: defaultOptions,
    label: 'お問い合わせ方法',
  },
};

export const Required: Story = {
  args: {
    options: defaultOptions,
    label: 'お問い合わせ方法',
    rules: { required: '必須項目です' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    options: defaultOptions,
    label: 'お問い合わせ方法',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
  },
};

export const CustomColors: Story = {
  args: {
    options: defaultOptions,
    label: 'カスタムカラー',
    activeColor: '#0d9488',
    inactiveColor: '#cbd5f5',
    knobColor: '#042f2e',
  },
};
