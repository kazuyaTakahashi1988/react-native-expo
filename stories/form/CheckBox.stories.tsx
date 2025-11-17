import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import CheckBox from '../../app/components/form/_checkBox';

import type { TypeCheckBox } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { genres: string[] };

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
      genres: [],
    },
  });

  return <CheckBox<FormValues> {...props} control={control} name='genres' options={options} />;
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
    containerStyle: {
      control: { type: 'object' },
      description:
        'CheckBox を包むコンテナ（View）スタイル \n\n Set 例：{ "padding": 20, "backgroundColor": "red" }',
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
} satisfies Meta<typeof CheckBoxStoryComponent>;

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
        type FormValues = { genres: string[] };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            genres: [],
          },
        });

        <CheckBox
          control={control}
          name='genres'
          options={[
            { label: 'アクション', value: 'action' },
            { label: 'コメディ', value: 'comedy' },
            { label: 'ドラマ', value: 'drama' },
          ]}
        />
        `,
      },
    },
  },
};

export const Label: Story = {
  args: {
    label: 'よく視聴するジャンル',
    rules: { required: false },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBox
          control={control}
          label='よく視聴するジャンル'
          name='genres'
          options={[
            { label: 'アクション', value: 'action' },
            { label: 'コメディ', value: 'comedy' },
            { label: 'ドラマ', value: 'drama' },
          ]}
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'よく視聴するジャンル',
    rules: { required: '必須項目です' },
    errorText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBox
          control={control}
          errorText={errors.genres?.message}
          label='よく視聴するジャンル'
          name='genres'
          options={[
            { label: 'アクション', value: 'action' },
            { label: 'コメディ', value: 'comedy' },
            { label: 'ドラマ', value: 'drama' },
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
    label: 'よく視聴するジャンル',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <CheckBox
          control={control}
          errorText='必須項目です'
          label='よく視聴するジャンル'
          name='genres'
          options={[
            { label: 'アクション', value: 'action' },
            { label: 'コメディ', value: 'comedy' },
            { label: 'ドラマ', value: 'drama' },
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
        <CheckBox
          control={control}
          disabled
          name='genres'
          options={[
            { label: 'アクション', value: 'action' },
            { label: 'コメディ', value: 'comedy' },
            { label: 'ドラマ', value: 'drama' },
          ]}
        />
        `,
      },
    },
  },
};
