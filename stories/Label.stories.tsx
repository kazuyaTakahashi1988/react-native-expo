import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import Label from '../app/components/form/_label';

const meta: Meta<typeof Label> = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 320 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    label: 'お名前',
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    label: 'メールアドレス',
    rules: { required: true },
  },
};
