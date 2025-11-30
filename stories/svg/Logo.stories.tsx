import { StyleSheet, Text, View } from 'react-native';

import { styles as storyStyles } from '../../.storybook/styles';
import * as Logos from '../../app/components/svg/logo';
import { color } from '../../app/lib/mixin';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type React from 'react';

const logoEntries = Object.entries(Logos).sort(([a], [b]) => a.localeCompare(b));

const LogoCatalog: React.FC = () => (
  <View style={[catalogStyles.grid, storyStyles.container]}>
    {logoEntries.map(([name, LogoComponent]) => (
      <View key={name} style={catalogStyles.item}>
        <LogoComponent />
        <Text style={catalogStyles.label}>{name}</Text>
      </View>
    ))}
  </View>
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
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  item: {
    alignItems: 'center',
    backgroundColor: color.white,
    margin: 1,
    padding: 12,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    color: color.black,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 8,
  },
});
