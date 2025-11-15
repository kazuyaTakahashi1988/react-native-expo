import React from 'react';
import { View } from 'react-native';

import Label from '../app/components/form/_label';

const meta = {
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

export const Default = {};

export const Required = {
  args: {
    label: 'メールアドレス',
    rules: { required: true },
  },
};
