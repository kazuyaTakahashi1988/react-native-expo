import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import * as Logos from '../../app/components/svg/logo';
import { styles as storyStyles } from '../../.storybook/styles';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

const logoEntries = Object.entries(Logos).sort(([a], [b]) => a.localeCompare(b));

const LogoCatalog: React.FC = () => (
  <ScrollView style={storyStyles.container} contentContainerStyle={catalogStyles.grid}>
    {logoEntries.map(([name, LogoComponent]) => (
      <View key={name} style={catalogStyles.item}>
        <LogoComponent width={120} height={48} />
        <Text style={catalogStyles.label}>{name}</Text>
      </View>
    ))}
  </ScrollView>
);

const meta = {
  title: 'Svg/Logo',
  component: LogoCatalog,
  decorators: [
    (Story) => (
      <View style={storyStyles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LogoCatalog>;

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
