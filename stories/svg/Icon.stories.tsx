import { View } from 'react-native';

import { styles } from '../../.storybook/styles';
import { IconAbout } from '../../app/components/svg/icon';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const meta = {
  title: 'Svg/Icon',
  component: IconAbout,
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
