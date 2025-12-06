import { StyleSheet, View } from 'react-native';

import { styles } from '../../.storybook/styles.ts';
import Button from '../../app/components/button/_button.tsx';
import { showToast, ToastProvider } from '../../app/components/toast';

import type { TypeToastOptions } from '../../app/lib/types/typeComponents';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const escapeSingleQuotes = (text: string | undefined | null): string => {
  const isText = text === 'string' && Boolean(text);
  if (!isText) {
    return '';
  }

  return text.replace("'", "\\'");
};

const normalizeStringOption = (value: string | undefined, fallback: string): string =>
  typeof value === 'string' ? value : fallback;

const normalizeDuration = (value: number | undefined): string | null => {
  if (typeof value !== 'number') {
    return null;
  }

  return value.toString();
};

const formatToastOptions = (args: Partial<TypeToastOptions> | undefined): string => {
  const safeArgs = args ?? {};
  const safeArgsMessage = typeof safeArgs.message === 'string' ? safeArgs.message : '<></>';
  const normalizedMessage = escapeSingleQuotes(normalizeStringOption(safeArgsMessage, ''));
  const normalizedPosition = normalizeStringOption(safeArgs.position, 'bottom');
  const normalizedVariant = normalizeStringOption(safeArgs.variant, 'default');
  const normalizedDuration = normalizeDuration(safeArgs.duration);

  const options = [
    `message: '${normalizedMessage}'`,
    `position: '${normalizedPosition}'`,
    `variant: '${normalizedVariant}'`,
  ];

  const isNormalizedDuration = Boolean(normalizedDuration);

  if (isNormalizedDuration) {
    options.push(`duration: ${normalizedDuration ?? ''}`);
  }

  return options.join(', ');
};

type DocsTransformContext = {
  args?: Partial<TypeToastOptions>;
};

const transformSource = (_: string, context: DocsTransformContext): string => {
  const options = formatToastOptions(context.args);

  return `
import { showToast } from '../../app/components/toast';

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
