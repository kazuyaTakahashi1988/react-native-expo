import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import Input from '../../../app/components/form/_input';

import type { TypeInput } from '../../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native';
import type { FieldError } from 'react-hook-form';

interface StoryFormValues {
  username: string;
}

type InputStoryProps = Pick<
  TypeInput<StoryFormValues>,
  'label' | 'disabled' | 'placeholder' | 'secureTextEntry'
> & {
  errorMessage?: string;
};

const buildFieldError = (message: string): FieldError => ({
  message,
  type: 'manual',
});

const InputStoryWrapper = ({ errorMessage, ...props }: InputStoryProps) => {
  const { control } = useForm<StoryFormValues>({
    defaultValues: { username: '' },
  });

  const errorProps: FieldError | undefined =
    errorMessage != null && errorMessage.trim().length > 0
      ? buildFieldError(errorMessage)
      : undefined;

  return (
    <View style={styles.storyContainer}>
      <Input<StoryFormValues>
        {...props}
        control={control}
        errorText={errorProps}
        name='username'
      />
    </View>
  );
};

const meta = {
  title: 'Components/Form/Input',
  args: {
    label: '氏名',
    placeholder: '山田 太郎',
  },
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'エラー表示に利用する任意のメッセージ',
    },
  },
  decorators: [
    (StoryComponent) => (
      <View style={styles.screen}>
        <StoryComponent />
      </View>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
} satisfies Meta;

type Story = StoryObj<InputStoryProps>;

const renderStory = (args: InputStoryProps) => <InputStoryWrapper {...args} />;

export const Default: Story = {
  render: renderStory,
};

export const Disabled: Story = {
  render: renderStory,
  args: {
    disabled: true,
    placeholder: '入力は無効です',
  },
};

export const WithError: Story = {
  render: renderStory,
  args: {
    errorMessage: '必須項目です',
  },
};

export const Password: Story = {
  render: renderStory,
  args: {
    label: 'パスワード',
    placeholder: '8文字以上',
    secureTextEntry: true,
  },
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  storyContainer: {
    width: '100%',
  },
});

export default meta;
