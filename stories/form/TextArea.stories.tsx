import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import TextArea from '../../app/components/form/_textarea';

import type { TypeTextArea } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { description: string };

type TextAreaStoryProps = Omit<TypeTextArea<FormValues>, 'control' | 'name'>;

const TextAreaStoryComponent = (props: TextAreaStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      description: '',
    },
  });

  return <TextArea<FormValues> {...props} control={control} name='description' />;
};

const meta = {
  title: 'Form/TextArea',
  component: TextAreaStoryComponent,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
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
} satisfies Meta<typeof TextAreaStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '',
    placeholder: '',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        type FormValues = { description: string };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            description: '',
          },
        });

        <TextArea control={control} name='description' />
        `,
      },
    },
  },
};

export const LabelAndPlaceholder: Story = {
  args: {
    label: 'ご相談の内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <TextArea
          control={control}
          label='ご相談の内容'
          name='description'
          placeholder='ご要望やご質問をご記入ください'
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'ご相談の内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: '必須項目です' },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <TextArea
          control={control}
          errorText={errors.description?.message}
          label='ご相談の内容'
          name='description'
          placeholder='ご要望やご質問をご記入ください'
          rules={{ required: '必須項目です' }}
        />
        `,
      },
    },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'ご相談の内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <TextArea
          control={control}
          errorText='必須項目です'
          label='ご相談の内容'
          name='description'
          placeholder='ご要望やご質問をご記入ください'
          rules={{ required: '必須項目です' }}
        />
        `,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '',
    placeholder: '',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <TextArea control={control} disabled name='description' />
        `,
      },
    },
  },
};
