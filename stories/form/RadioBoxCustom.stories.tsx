import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import RadioBoxCustom from '../../app/components/form/_radioBoxCustom';

import type { TypeRadioBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { themeMode: string };

type RadioBoxCustomStoryProps = Omit<
  TypeRadioBoxCustom<FormValues>,
  'control' | 'name' | 'options'
> & {
  options?: TypeRadioBoxCustom<FormValues>['options'];
};

const defaultOptions: TypeRadioBoxCustom<FormValues>['options'] = [
  { label: 'ライト', value: 'light' },
  { label: 'ダーク', value: 'dark' },
];

const RadioBoxCustomStoryComponent = ({
  options = defaultOptions,
  ...props
}: RadioBoxCustomStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      themeMode: '',
    },
  });

  return (
    <RadioBoxCustom<FormValues>
      {...props}
      control={control}
      name='themeMode'
      options={options}
    />
  );
};

const meta = {
  title: 'Form/RadioBoxCustom',
  component: RadioBoxCustomStoryComponent,
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
} satisfies Meta<typeof RadioBoxCustomStoryComponent>;

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
    label: 'テーマ設定',
  },
};

export const CustomColors: Story = {
  args: {
    label: 'カスタムカラー',
    activeColor: '#f97316',
    inactiveColor: '#fed7aa',
    knobColor: '#7c2d12',
  },
};

export const Required: Story = {
  args: {
    label: '必須項目',
    rules: { required: 'テーマを選択してください' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'エラーあり',
    rules: { required: 'テーマを選択してください' },
    errorText: {
      type: 'themeMode',
      message: 'テーマを選択してください',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '選択不可',
  },
};
