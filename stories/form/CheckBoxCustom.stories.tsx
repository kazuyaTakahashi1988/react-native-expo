import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import CheckBoxCustom from '../../app/components/form/_checkBoxCustom';

import type { TypeCheckBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { inquiryWay: string[] };

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
      inquiryWay: [],
    },
  });

  return (
    <CheckBoxCustom<FormValues> {...props} control={control} name='inquiryWay' options={options} />
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
    containerStyle: {
      control: { type: 'object' },
      description:
        'CheckBoxCustom を包むコンテナ（View）スタイル \n\n 例 ：\n { "padding": 20, "backgroundColor": "red" }',
    },
    optionListStyle: {
      control: { type: 'object' },
      description:
        'オプション のスタイル \n\n 例 ：\n { "padding": 20, "backgroundColor": "yellow" }',
    },
    optionRowStyle: {
      control: { type: 'object' },
      description:
        'オプション各行 のスタイル \n\n 例 ：\n { "padding": 20, "backgroundColor": "white" }',
    },
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
  args: {},
  parameters: {
    docs: {
      source: {
        code: `
        type FormValues = { inquiryWay: string[] };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            inquiryWay: [],
          },
        });

        <CheckBoxCustom
          control={control}
          name='inquiryWay'
          options={[
            { label: 'メール', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'アプリ通知', value: 'push' },
          ]}
        />
        `,
      },
    },
  },
};

export const Label: Story = {
  args: {
    label: 'お問い合わせ方法',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBoxCustom
          control={control}
          label='お問い合わせ方法'
          name='inquiryWay'
          options={[
            { label: 'メール', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'アプリ通知', value: 'push' },
          ]}
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'お問い合わせ方法',
    rules: { required: '必須項目です' },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBoxCustom
          control={control}
          errorText={errors.inquiryWay?.message}
          label='お問い合わせ方法'
          name='inquiryWay'
          options={[
            { label: 'メール', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'アプリ通知', value: 'push' },
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
    label: 'お問い合わせ方法',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBoxCustom
          control={control}
          errorText='必須項目です'
          label='お問い合わせ方法'
          name='inquiryWay'
          options={[
            { label: 'メール', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'アプリ通知', value: 'push' },
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
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBoxCustom
          control={control}
          disabled
          name='inquiryWay'
          options={[
            { label: 'メール', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'アプリ通知', value: 'push' },
          ]}
        />
        `,
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    label: 'カスタムカラー',
    activeColor: '#0d9488',
    inactiveColor: '#cbd5f5',
    knobColor: '#042f2e',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBoxCustom
          activeColor='#0d9488'
          control={control}
          inactiveColor='#cbd5f5'
          knobColor='#042f2e'
          label='カスタムカラー'
          name='inquiryWay'
          options={[
            { label: 'メール', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'アプリ通知', value: 'push' },
          ]}
        />
        `,
      },
    },
  },
};
