import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import RadioBoxCustom from '../../app/components/form/_radioBoxCustom';

import type { TypeRadioBoxCustom } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type FormValues = { theme: string };

type RadioBoxCustomStoryProps = Omit<
  TypeRadioBoxCustom<FormValues>,
  'control' | 'name' | 'options'
> & {
  options?: TypeRadioBoxCustom<FormValues>['options'];
};

const defaultOptions: TypeRadioBoxCustom<FormValues>['options'] = [
  { label: 'シアン', value: 'cyan' },
  { label: 'マゼンタ', value: 'magenta' },
  { label: 'イエロー', value: 'yellow' },
];

const RadioBoxCustomStoryComponent = ({
  options = defaultOptions,
  ...props
}: RadioBoxCustomStoryProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      theme: '',
    },
  });

  return <RadioBoxCustom<FormValues> {...props} control={control} name='theme' options={options} />;
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
    containerStyle: {
      control: { type: 'object' },
      description:
        'RadioBoxCustom を包むコンテナ（View）スタイル \n\n 例 ：\n { "padding": 20, "backgroundColor": "red" }',
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
    disabled: {
      control: { type: 'boolean' },
      description: '活性・非活性の制御',
    },
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
  args: {},
  parameters: {
    docs: {
      source: {
        code: `
        type FormValues = { theme: string };

        const { control, formState: { errors } } = useForm<FormValues>({
          defaultValues: {
            theme: '',
          },
        });
        
        <RadioBoxCustom
          control={control}
          name='theme'
          options={[
            { label: 'シアン', value: 'cyan' },
            { label: 'マゼンタ', value: 'magenta' },
            { label: 'イエロー', value: 'yellow' },
          ]}
        />
        `,
      },
    },
  },
};

export const Label: Story = {
  args: {
    label: 'テーマ色の選択',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBoxCustom
          control={control}
          label='テーマ色の選択'
          name='theme'
          options={[
            { label: 'シアン', value: 'cyan' },
            { label: 'マゼンタ', value: 'magenta' },
            { label: 'イエロー', value: 'yellow' },
          ]}
        />
        `,
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'テーマ色の選択',
    rules: { required: '必須項目です' },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBoxCustom
          control={control}
          errorText={errors.theme?.message}
          label='テーマ色の選択'
          name='theme'
          options={[
            { label: 'シアン', value: 'cyan' },
            { label: 'マゼンタ', value: 'magenta' },
            { label: 'イエロー', value: 'yellow' },
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
    label: 'テーマ色の選択',
    rules: { required: '必須項目です' },
    errorText: '必須項目です',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBoxCustom
          control={control}
          errorText='必須項目です'
          label='テーマ色の選択'
          name='theme'
          options={[
            { label: 'シアン', value: 'cyan' },
            { label: 'マゼンタ', value: 'magenta' },
            { label: 'イエロー', value: 'yellow' },
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
        <RadioBoxCustom
          control={control}
          disabled
          name='theme'
          options={[
            { label: 'シアン', value: 'cyan' },
            { label: 'マゼンタ', value: 'magenta' },
            { label: 'イエロー', value: 'yellow' },
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
    activeColor: '#f97316',
    inactiveColor: '#fed7aa',
    knobColor: '#7c2d12',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <RadioBoxCustom
          activeColor='#f97316'
          control={control}
          inactiveColor='#fed7aa'
          knobColor='#7c2d12'
          label='カスタムカラー'
          name='theme'
          options={[
            { label: 'シアン', value: 'cyan' },
            { label: 'マゼンタ', value: 'magenta' },
            { label: 'イエロー', value: 'yellow' },
          ]}
        />
        `,
      },
    },
  },
};
