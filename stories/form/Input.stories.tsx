import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

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
    containerStyle: { control: false },
    style: { control: false },
    errorText: { control: false },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof InputStoryComponent>;

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 16,
  },
});

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `
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
    placeholder: 'プレイスホルダー テキスト',
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

export const RequiredAndError: Story = {
  args: {
    label: 'ラベル テキスト',
    errorText: {
      type: 'dummyName',
      message: '必須項目です。',
    },
    placeholder: 'プレイスホルダー テキスト',
    rules: { required: '必須項目です。' },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          autoCapitalize='words'
          control={control}
          errorText={errors.dummyName}
          // errorText={{
          //  type: 'dummyName',
          //  message: '必須項目です。',
          // }}
          label='ラベル テキスト'
          name='dummyName'
          placeholder='プレイスホルダー テキスト'
          rules={{ required: '必須項目です。' }}
        />
        `,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'ラベル テキスト',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          control={control}
          disabled
          label='ラベル テキスト'
          name='dummyName'
        />
        `,
      },
    },
  },
};

export const ForEmailInput: Story = {
  args: {
    autoCapitalize: 'none',
    label: 'メール入力 項目',
    placeholder: 'dummy@example.com',
    keyboardType: 'ascii-capable',
    rules: {
      pattern: {
        message: 'Emailアドレスを入力してください.',
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
      },
      required: '必須項目です。',
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          autoCapitalize='none'
          control={control}
          errorText={errors.dummyName}
          keyboardType='ascii-capable'
          label='メール入力 項目'
          name='dummyName'
          placeholder='dummy@example.com'
          rules={{
            pattern: {
              message: 'Emailアドレスを入力してください.',
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
            },
            required: '必須項目です。',
          }}
        />
        `,
      },
    },
  },
};

export const ForPasswordInput: Story = {
  args: {
    autoCapitalize: 'none',
    label: 'パスワード入力 項目',
    placeholder: 'パスワード は6文字以上で入力してください。',
    rules: {
      minLength: {
        message: 'Password は6文字以上で入力してください。',
        value: 6,
      },
      required: '必須項目です。',
    },
    secureTextEntry: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
        <Input
          autoCapitalize='none'
          control={control}
          errorText={errors.dummyName}
          label='パスワード入力 項目'
          name='dummyName'
          placeholder='6文字以上のパスワードを入力してください'
          rules={{
            minLength: {
              message: 'Password は6文字以上で入力してください。',
              value: 6,
            },
            required: '必須項目です。',
          }}
          secureTextEntry
        />
        `,
      },
    },
  },
};
