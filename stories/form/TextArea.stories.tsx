import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

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
    containerStyle: { control: { type: 'object' } },
    style: { control: { type: 'object' } },
  },
} satisfies Meta<typeof TextAreaStoryComponent>;

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
  args: {
    label: 'お問い合わせ内容',
  },
};

export const LabelAndPlaceholder: Story = {
  args: {
    label: 'お問い合わせ内容',
    placeholder: 'ご要望やご質問をご記入ください',
  },
};

export const Required: Story = {
  args: {
    label: 'お問い合わせ内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: '必須項目です' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'お問い合わせ内容',
    placeholder: 'ご要望やご質問をご記入ください',
    rules: { required: '必須項目です' },
    errorText: {
      type: 'description',
      message: '必須項目です',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '入力不可',
    placeholder: '入力できません',
  },
};
