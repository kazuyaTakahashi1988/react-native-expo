import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import RadioBox from '../../app/components/form/_radioBox';

import type { TypeRadioBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { payment: string };

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
      payment: '',
    },
  });

  return <RadioBox<FormValues> {...props} control={control} name='payment' options={options} />;
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
    containerStyle: {
      control: { type: 'object' },
      description:
        'RadioBox を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
    },
    optionListStyle: {
      control: { type: 'object' },
      description:
        'オプション のスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "yellow" }',
    },
    optionRowStyle: {
      control: { type: 'object' },
      description:
        'オプション各行 のスタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "white" }',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
  },
} satisfies Meta<typeof RadioBoxStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        // react-hook-form 使用必須
        type FormValues = { payment: string };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            payment: '',
          },
        });
        
        <RadioBox
          control={control}
          name='payment'
          options={[
            { label: 'クレジットカード', value: 'card' },
            { label: '銀行振込', value: 'bank' },
            { label: '電子マネー', value: 'wallet' },
          ]}
        />
        `,
      },
    },
  },
};

export const Label: Story = {
  args: {
    label: 'お支払い方法',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBox
          control={control}
          label='お支払い方法'
          name='payment'
          options={[
            { label: 'クレジットカード', value: 'card' },
            { label: '銀行振込', value: 'bank' },
            { label: '電子マネー', value: 'wallet' },
          ]}
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'お支払い方法',
    rules: { required: '必須項目です' },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBox
          control={control}
          errorText={errors.payment?.message}
          label='お支払い方法'
          name='payment'
          options={[
            { label: 'クレジットカード', value: 'card' },
            { label: '銀行振込', value: 'bank' },
            { label: '電子マネー', value: 'wallet' },
          ]}
          rules={{ required: '必須項目です' }}
        />
        `,
      },
    },
  },
};

export const ErrorOccurred: Story = {
  args: {
    label: 'お支払い方法',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBox
          control={control}
          errorText='必須項目です'
          label='お支払い方法'
          name='payment'
          options={[
            { label: 'クレジットカード', value: 'card' },
            { label: '銀行振込', value: 'bank' },
            { label: '電子マネー', value: 'wallet' },
          ]}
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
    label: '',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBox
          control={control}
          disabled
          name='payment'
          options={[
            { label: 'クレジットカード', value: 'card' },
            { label: '銀行振込', value: 'bank' },
            { label: '電子マネー', value: 'wallet' },
          ]}
        />
        `,
      },
    },
  },
};
