import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import { SelectBox } from '../../app/components/form';

import type { TypeSelectBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { address: string };

const addressOptions: TypeSelectBox<FormValues>['options'] = [
  { label: '東京都', value: 'tokyo' },
  { label: '大阪府', value: 'osaka' },
  { label: '愛知県', value: 'aichi' },
];

const meta = {
  title: 'Form/SelectBox',
  component: SelectBox,
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
    placeholder: {
      control: { type: 'text' },
      description: 'プレイスホルダーテキスト',
    },
    errorText: {
      control: { type: 'text' },
      description: 'エラーテキスト',
    },
    name: {
      control: { type: 'text' },
      description: 'value ネーム',
    },
    doneText: {
      control: { type: 'text' },
      description: '選択エリア Closeボタンテキスト',
    },
    rules: {
      control: { type: 'object' },
      description: 'バリデーションルール \n\n Set 例：{ "required": true }',
    },
    containerStyle: {
      control: { type: 'object' },
      description:
        'SelectBox を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
    },
    triggerStyle: {
      control: { type: 'object' },
      description: 'SelectBox のスタイル \n\n Set 例： { "padding": 20, "borderRadius": 50 }',
    },
    valueTextStyle: {
      control: { type: 'object' },
      description:
        '選択したテキストのスタイル \n\n Set 例： { "color": "blue", "fontWeight": "bold" }',
    },
    placeholderTextStyle: {
      control: { type: 'object' },
      description:
        'プレイスホルダーテキストのスタイル \n\n Set 例： { "color": "red", "fontWeight": "bold" }',
    },
    pickerSelectStyles: {
      control: { type: 'object' },
      description: '基本使わない \n\n (web/スマホアプリ間でデザイン差を埋める際に使用 )',
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
  },
} satisfies Meta<typeof SelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: addressOptions,
  },
};

export const LabelAndPlaceholder: Story = {
  args: {
    options: addressOptions,
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
  },
};

export const Required: Story = {
  args: {
    options: addressOptions,
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
    rules: { required: '必須項目です' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    options: addressOptions,
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
};

export const Disabled: Story = {
  args: {
    options: addressOptions,
    disabled: true,
  },
};
