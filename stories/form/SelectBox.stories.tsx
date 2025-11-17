import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import * as Form from '../../app/components/form';

import type { TypeSelectBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { address: string };

type SelectBox = TypeSelectBox<FormValues> & {
  options?: TypeSelectBox<FormValues>['options'];
};

const addressOptions: TypeSelectBox<FormValues>['options'] = [
  { label: '東京都', value: 'tokyo' },
  { label: '大阪府', value: 'osaka' },
  { label: '愛知県', value: 'aichi' },
];

const SelectBox = ({ ...props }: SelectBox) => {
  return <Form.SelectBox<FormValues> {...props} />;
};

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
    },
    placeholder: {
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
        'SelectBox を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
    },
    triggerStyle: {
      control: { type: 'object' },
      description: 'SelectBox のスタイル \n\n Set 例： { "padding": 20, "borderRadius": 50 }',
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
