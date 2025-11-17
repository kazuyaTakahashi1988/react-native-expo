import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import * as Form from '../../app/components/form/';

import type { TypeCheckBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { inquiry: string[] };

type CheckBoxCustomStoryProps = TypeCheckBoxCustom<FormValues> & {
  options?: TypeCheckBoxCustom<FormValues>['options'];
};

const defaultOptions: TypeCheckBoxCustom<FormValues>['options'] = [
  { label: 'メール', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'アプリ通知', value: 'push' },
];

const CheckBoxCustom = ({ ...props }: CheckBoxCustomStoryProps) => {
  return <Form.CheckBoxCustom<FormValues> {...props} />;
};

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
    },
    errorText: {
      control: { type: 'text' },
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
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
    options: {
      control: { type: 'object' },
      description: 'オプション',
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
    rules: { required: false },
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
