import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import Input from '../../app/components/form/_input';

import type { TypeInput } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { dummyName: string };

type InputStoryProps = Omit<TypeInput<FormValues>, 'control' | 'name'>;

const InputStoryComponent = (props: InputStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      dummyName: '',
    },
  });

  return <Input<FormValues> {...props} control={control} name='dummyName' />;
};

const meta = {
  title: 'Form/Input',
  component: InputStoryComponent,
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
  },
} satisfies Meta<typeof InputStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '',
    errorText: '',
    placeholder: '',
    rules: { required: false },
  },
  parameters: {
    docs: {
      source: {
        code: `
        // react-hook-form 使用必須
        type FormValues = { dummyName: string };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            dummyName: '',
          },
        });

        <Input
          autoCapitalize='words'
          control={control}
          name='dummyName'
        />
        `,
      },
    },
  },
};

export const LabelAndPlaceholder: Story = {
  args: {
    label: 'ラベル テキスト',
    errorText: '',
    placeholder: 'プレイスホルダー テキスト',
    rules: { required: false },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          autoCapitalize='words'
          control={control}
          label='ラベル テキスト'
          name='dummyName'
          placeholder='プレイスホルダー テキスト'
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'ラベル テキスト',
    errorText: '',
    placeholder: 'プレイスホルダー テキスト',
    rules: { required: '必須項目です' },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          autoCapitalize='words'
          control={control}
          errorText={errors.dummyName?.message}
          label='ラベル テキスト'
          name='dummyName'
          placeholder='プレイスホルダー テキスト'
          rules={{ required: '必須項目です' }}
        />
        `,
      },
    },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'ラベル テキスト',
    errorText: '必須項目です',
    placeholder: 'プレイスホルダー テキスト',
    rules: { required: '必須項目です' },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          autoCapitalize='words'
          control={control}
          errorText='必須項目です'
          label='ラベル テキスト'
          name='dummyName'
          placeholder='プレイスホルダー テキスト'
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
    errorText: '',
    placeholder: '',
    rules: { required: false },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          control={control}
          disabled
          name='dummyName'
        />
        `,
      },
    },
  },
};
