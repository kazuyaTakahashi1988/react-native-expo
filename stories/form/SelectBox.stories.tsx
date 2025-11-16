import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import SelectBox from '../../app/components/form/_selectBox';

import type { TypeSelectBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { address: string };

type SelectBoxStoryProps = Omit<TypeSelectBox<FormValues>, 'control' | 'name' | 'options'> & {
  options?: TypeSelectBox<FormValues>['options'];
};

const addressOptions: TypeSelectBox<FormValues>['options'] = [
  { label: '東京都', value: 'tokyo' },
  { label: '大阪府', value: 'osaka' },
  { label: '愛知県', value: 'aichi' },
];

const SelectBoxStoryComponent = ({ options = addressOptions, ...props }: SelectBoxStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      address: '',
    },
  });

  return <SelectBox<FormValues> {...props} control={control} name='address' options={options} />;
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
    containerStyle: {
      control: { type: 'object' },
      description:
        'SelectBox を包むコンテナ（View）スタイル \n\n 例 ：\n { "padding": 20, "backgroundColor": "red" }',
    },
    triggerStyle: {
      control: { type: 'object' },
      description: 'SelectBox のスタイル \n\n 例 ：\n  { "padding": 20, "borderRadius": 50 }',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
  },
} satisfies Meta<typeof SelectBoxStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `
        type FormValues = { address: string };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            address: '',
          },
        });
        
        <SelectBox
          control={control}
          name='address'
          options={[
            { label: '東京都', value: 'tokyo' },
            { label: '大阪府', value: 'osaka' },
            { label: '愛知県', value: 'aichi' },
          ]}
        />
        `,
      },
    },
  },
};

export const LabelAndPlaceholder: Story = {
  args: {
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <SelectBox
          control={control}
          label='都道府県'
          name='address'
          options={[
            { label: '東京都', value: 'tokyo' },
            { label: '大阪府', value: 'osaka' },
            { label: '愛知県', value: 'aichi' },
          ]}
          placeholder='お住まいの地域を選択'
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
    rules: { required: '必須項目です' },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <SelectBox
          control={control}
          errorText={errors.address?.message}
          label='都道府県'
          name='address'
          options={[
            { label: '東京都', value: 'tokyo' },
            { label: '大阪府', value: 'osaka' },
            { label: '愛知県', value: 'aichi' },
          ]}
          placeholder='お住まいの地域を選択'
          rules={{ required: '必須項目です' }}
        />
        `,
      },
    },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: '都道府県',
    placeholder: 'お住まいの地域を選択',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <SelectBox
          control={control}
          errorText='必須項目です'
          label='都道府県'
          name='address'
          options={[
            { label: '東京都', value: 'tokyo' },
            { label: '大阪府', value: 'osaka' },
            { label: '愛知県', value: 'aichi' },
          ]}
          placeholder='お住まいの地域を選択'
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
  },
  parameters: {
    docs: {
      source: {
        code: `
        <SelectBox
          control={control}
          disabled
          name='address'
          options={[
            { label: '東京都', value: 'tokyo' },
            { label: '大阪府', value: 'osaka' },
            { label: '愛知県', value: 'aichi' },
          ]}
        />
        `,
      },
    },
  },
};
