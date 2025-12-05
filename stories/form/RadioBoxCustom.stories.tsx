import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import { RadioBoxCustom } from '../../app/components/form';

import type { TypeRadioBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { theme: string };

const defaultOptions: TypeRadioBoxCustom<FormValues>['options'] = [
  { label: 'シアン', value: 'cyan' },
  { label: 'マゼンタ', value: 'magenta' },
  { label: 'イエロー', value: 'yellow' },
];
const meta = {
  title: 'Form/RadioBoxCustom',
  component: RadioBoxCustom,
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
      description: 'react-hook-form 用の バリデーションルール \n\n Set 例：{ "required": true }',
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
    control: {
      control: false,
      description: 'react-hook-form 用の props',
    },
  },
} satisfies Meta<typeof RadioBoxCustom>;

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
    label: 'テーマ色の選択',
  },
};

export const Required: Story = {
  args: {
    options: defaultOptions,
    label: 'テーマ色の選択',
    rules: { required: '必須項目です' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    options: defaultOptions,
    label: 'テーマ色の選択',
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
