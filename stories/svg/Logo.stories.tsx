import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import { Logo } from '../../app/components/svg/logo';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Svg/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
