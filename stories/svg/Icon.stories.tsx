import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import * as Icons from '../../app/components/svg/icon';
import { styles as storyStyles } from '../../.storybook/styles';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const iconEntries = Object.entries(Icons).sort(([a], [b]) => a.localeCompare(b));

const IconCatalog: React.FC = () => (
  <ScrollView style={storyStyles.container} contentContainerStyle={catalogStyles.grid}>
    {iconEntries.map(([name, IconComponent]) => (
      <View key={name} style={catalogStyles.item}>
        <IconComponent />
        <Text style={catalogStyles.label}>{name}</Text>
      </View>
    ))}
  </ScrollView>
);

const meta = {
  title: 'Svg/Icon',
  component: IconCatalog,
  decorators: [
    (Story) => (
      <View style={storyStyles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconCatalog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

const catalogStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#00000022',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});
