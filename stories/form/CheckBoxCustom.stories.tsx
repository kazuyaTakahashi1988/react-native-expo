import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import CheckBoxCustom from '../../app/components/form/_checkBoxCustom';

import type { TypeCheckBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { notificationChannels: string[] };

type CheckBoxCustomStoryProps = Omit<
  TypeCheckBoxCustom<FormValues>,
  'control' | 'name' | 'options'
> & {
  options?: TypeCheckBoxCustom<FormValues>['options'];
};

const defaultOptions: TypeCheckBoxCustom<FormValues>['options'] = [
  { label: 'メール', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'アプリ通知', value: 'push' },
];

const CheckBoxCustomStoryComponent = ({
  options = defaultOptions,
  ...props
}: CheckBoxCustomStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      notificationChannels: [],
    },
  });

  return (
    <CheckBoxCustom<FormValues>
      {...props}
      control={control}
      name='notificationChannels'
      options={options}
    />
  );
};

const meta = {
  title: 'Form/CheckBoxCustom',
  component: CheckBoxCustomStoryComponent,
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
    optionLabelStyle: { control: { type: 'object' } },
    trackStyle: { control: { type: 'object' } },
    knobStyle: { control: { type: 'object' } },
  },
} satisfies Meta<typeof CheckBoxCustomStoryComponent>;

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
    label: '通知方法',
  },
};

export const CustomColors: Story = {
  args: {
    label: 'カスタムカラー',
    activeColor: '#0d9488',
    inactiveColor: '#cbd5f5',
    knobColor: '#042f2e',
  },
};

export const Required: Story = {
  args: {
    label: '必須項目',
    rules: { required: '1つ以上選択してください' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'エラーあり',
    rules: { required: '1つ以上選択してください' },
    errorText: {
      type: 'notificationChannels',
      message: '1つ以上選択してください',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '選択不可',
  },
};
