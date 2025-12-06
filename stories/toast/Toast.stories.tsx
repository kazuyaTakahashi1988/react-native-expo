import { StyleSheet, View } from 'react-native';

import { styles } from '../../.storybook/styles.ts';
import Button from '../../app/components/button/_button.tsx';
import ToastProvider from '../../app/components/toast/_toastProvider.tsx';
import { showToast } from '../../app/components/toast/_toastService.ts';

import type { TypeToastOptions } from '../../app/lib/types/typeComponents';
import type { Meta, StoryContext, StoryObj } from '@storybook/react-native-web-vite';

const escapeSingleQuotes = (text: string) => text.replaceAll("'", "\\'");

const formatToastOptions = (args: Partial<TypeToastOptions>) => {
  const { message, position, variant = 'default', duration } = args;
  const options = [
    `message: '${escapeSingleQuotes(String(message ?? ''))}'`,
    `position: '${String(position ?? 'bottom')}'`,
    `variant: '${String(variant)}'`,
  ];

  if (duration !== undefined) {
    options.push(`duration: ${String(duration)}`);
  }

  return options.join(', ');
};

const transformSource = (
  _: string,
  context: StoryContext<typeof ToastPreview, TypeToastOptions>,
) => {
  const options = formatToastOptions(context.args ?? {});

  return `
<Button
  onPress={() => {
    showToast({ ${options} });
  }}
  title='Show Toast'
/>`;
};

const ToastPreview = (args: TypeToastOptions) => {
  const handleShowToast = () => {
    showToast({ ...args });
  };

  return (
    <ToastProvider>
      <View style={buttonStyle.container}>
        <Button onPress={handleShowToast} title='Show Toast' />
      </View>
    </ToastProvider>
  );
};

const meta = {
  title: 'Toast/Toast',
  component: ToastPreview,
  decorators: [
    (Story) => (
      <View style={[styles.container, styles.center]}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: transformSource,
      },
    },
  },
  argTypes: {
    message: {
      description: 'トーストに表示するメッセージ',
    },
    duration: {
      description: '表示継続時間（ms）',
      control: { type: 'number', min: 1000, step: 500 },
    },
    position: {
      control: 'radio',
      options: ['top', 'center', 'bottom'],
      description: '表示位置',
    },
    variant: {
      control: 'radio',
      options: ['default', 'success', 'error'],
      description: 'バリエーション',
    },
  },
} satisfies Meta<typeof ToastPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  message: 'Toast Message',
  position: 'bottom' as const,
  duration: 2000,
};

export const BasicToast: Story = {
  args: {
    ...baseArgs,
    message: 'Basic Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const TopToast: Story = {
  args: {
    ...baseArgs,
    position: 'top',
    message: 'Top Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const CenterToast: Story = {
  args: {
    ...baseArgs,
    position: 'center',
    message: 'Center Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const SuccessToast: Story = {
  args: {
    ...baseArgs,
    variant: 'success',
    message: 'Success Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

export const ErrorToast: Story = {
  args: {
    ...baseArgs,
    variant: 'error',
    message: 'Error Toast',
  },
  render: (args) => <ToastPreview {...args} />,
};

const buttonStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    height: 300,
    justifyContent: 'center',
    width: '100%',
  },
});
