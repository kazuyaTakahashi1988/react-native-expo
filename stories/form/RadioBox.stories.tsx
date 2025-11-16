import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import RadioBox from '../../app/components/form/_radioBox';

import type { TypeRadioBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { paymentMethod: string };

type RadioBoxStoryProps = Omit<TypeRadioBox<FormValues>, 'control' | 'name' | 'options'> & {
  options?: TypeRadioBox<FormValues>['options'];
};

const defaultOptions: TypeRadioBox<FormValues>['options'] = [
  { label: 'クレジットカード', value: 'card' },
  { label: '銀行振込', value: 'bank' },
  { label: '電子マネー', value: 'wallet' },
];

const RadioBoxStoryComponent = ({ options = defaultOptions, ...props }: RadioBoxStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      paymentMethod: '',
    },
  });

  return (
    <RadioBox<FormValues>
      {...props}
      control={control}
      name='paymentMethod'
      options={options}
    />
  );
};

const meta = {
  title: 'Form/RadioBox',
  component: RadioBoxStoryComponent,
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
    optionListStyle: { control: { type: 'object' } },
    optionRowStyle: { control: { type: 'object' } },
  },
} satisfies Meta<typeof RadioBoxStoryComponent>;

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
    label: '支払い方法',
  },
};

export const Required: Story = {
  args: {
    label: '必須項目',
    rules: { required: 'いずれかを選択してください' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'エラーあり',
    rules: { required: 'いずれかを選択してください' },
    errorText: 'いずれかを選択してください',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '選択不可',
  },
};
