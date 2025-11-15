import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import SelectBox from '../../app/components/form/_selectBox';

import type { TypeSelectBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { prefecture: string };

type SelectBoxStoryProps = Omit<TypeSelectBox<FormValues>, 'control' | 'name' | 'options'> & {
  options?: TypeSelectBox<FormValues>['options'];
};

const prefectureOptions: TypeSelectBox<FormValues>['options'] = [
  { label: '東京都', value: 'tokyo' },
  { label: '大阪府', value: 'osaka' },
  { label: '愛知県', value: 'aichi' },
  { label: '福岡県', value: 'fukuoka' },
];

const SelectBoxStoryComponent = ({ options = prefectureOptions, ...props }: SelectBoxStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      prefecture: '',
    },
  });

  return (
    <SelectBox<FormValues>
      {...props}
      control={control}
      name='prefecture'
      options={options}
    />
  );
};

const meta = {
  title: 'Form/SelectBox',
  component: SelectBoxStoryComponent,
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
    triggerStyle: { control: { type: 'object' } },
    labelStyle: { control: { type: 'object' } },
    valueTextStyle: { control: { type: 'object' } },
    placeholderTextStyle: { control: { type: 'object' } },
    pickerSelectStyles: { control: { type: 'object' } },
  },
} satisfies Meta<typeof SelectBoxStoryComponent>;

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
    label: '都道府県',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
  },
};

export const Required: Story = {
  args: {
    label: '必須項目',
    rules: { required: '選択してください' },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'エラーあり',
    rules: { required: '選択してください' },
    errorText: {
      type: 'prefecture',
      message: '選択してください',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '選択不可',
  },
};
