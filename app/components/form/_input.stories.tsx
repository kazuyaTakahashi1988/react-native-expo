import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import Input from './_input';
import type { TypeInput } from '../../lib/types/typeComponents';

interface FormValues {
  sample: string;
}

type InputBaseProps = Omit<TypeInput<FormValues>, 'control' | 'name' | 'errorText'>;

type InputStoryProps = InputBaseProps & {
  defaultValue?: string;
  errorMessage?: string;
};

const InputStory = ({ defaultValue = '', errorMessage, ...rest }: InputStoryProps) => {
  const { control, clearErrors, formState, setError, setValue } = useForm<FormValues>({
    defaultValues: { sample: defaultValue },
  });

  useEffect(() => {
    setValue('sample', defaultValue);
  }, [defaultValue, setValue]);

  useEffect(() => {
    if (errorMessage) {
      setError('sample', { type: 'manual', message: errorMessage });
    } else {
      clearErrors('sample');
    }
  }, [clearErrors, errorMessage, setError]);

  return (
    <View style={{ width: '100%' }}>
      <Input<FormValues>
        {...rest}
        control={control}
        name="sample"
        errorText={errorMessage ? formState.errors.sample : undefined}
      />
    </View>
  );
};

const meta: Meta<typeof InputStory> = {
  title: 'Components/Form/Input',
  component: InputStory,
  tags: ['autodocs'],
  args: {
    label: '氏名',
    placeholder: '山田太郎',
  },
  argTypes: {
    errorMessage: {
      control: 'text',
      description: '表示するエラーメッセージ',
    },
    defaultValue: {
      control: 'text',
      description: '初期値',
    },
    control: { table: { disable: true } },
    name: { table: { disable: true } },
    errorText: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'react-hook-form と連携した入力コンポーネント。Storybook 上では useForm を利用してコントロールしています。',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputStory>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@example.com',
    defaultValue: 'sample@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: '電話番号',
    placeholder: '090-1234-5678',
    errorMessage: '必須項目です',
  },
};

export const Disabled: Story = {
  args: {
    label: 'ユーザー名',
    defaultValue: 'storybook-user',
    disabled: true,
  },
};
