import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import CheckBox from '../../app/components/form/_checkBox';

import type { TypeCheckBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { favoriteGenres: string[] };

type CheckBoxStoryProps = Omit<TypeCheckBox<FormValues>, 'control' | 'name' | 'options'> & {
  options?: TypeCheckBox<FormValues>['options'];
};

const defaultOptions: TypeCheckBox<FormValues>['options'] = [
  { label: 'アクション', value: 'action' },
  { label: 'コメディ', value: 'comedy' },
  { label: 'ドラマ', value: 'drama' },
];

const CheckBoxStoryComponent = ({ options = defaultOptions, ...props }: CheckBoxStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      favoriteGenres: [],
    },
  });

  return (
    <CheckBox<FormValues>
      {...props}
      control={control}
      name='favoriteGenres'
      options={options}
    />
  );
};

const meta = {
  title: 'Form/CheckBox',
  component: CheckBoxStoryComponent,
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
} satisfies Meta<typeof CheckBoxStoryComponent>;

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
    label: 'よく視聴するジャンル',
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
    errorText: '1つ以上選択してください',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '選択不可',
  },
};
