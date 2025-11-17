import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import * as Form from '../../app/components/form';

import type { TypeTextArea } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { description: string };

type TextAreaStoryProps = TypeTextArea<FormValues>;

const TextArea = (props: TextAreaStoryProps) => {
  return <Form.TextArea<FormValues> {...props} />;
};

const meta = {
  title: 'Form/TextArea',
  component: TextArea,
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
        'TextArea を包むコンテナ（View）スタイル \n\n Set例：{ "padding": 20, "backgroundColor": "red" }',
    },
    style: {
      control: { type: 'object' },
      description: 'TextInput 自体のスタイル \n\n Set例：{ "padding": 20, "borderRadius": 50 }',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LabelAndPlaceholder: Story = {
  args: {
    label: 'ご相談の内容',
    placeholder: 'ご要望やご質問をご記入ください',
  },
};

export const Required: Story = {
  args: {
    label: 'ご相談の内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: '必須項目です' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'ご相談の内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
