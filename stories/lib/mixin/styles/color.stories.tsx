import { StyleSheet, Text, View } from 'react-native';

import { styles as storyStyles } from '../../../../.storybook/styles';
import { color } from '../../../../app/lib/mixin';

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type React from 'react';

const colorEntries = Object.entries(color);

const colorUsageSnippet = `import { color } from '../../../app/lib/mixin';\n\n${colorEntries
  .map(([name, value]) => `color.${name}; // ${String(value)}`)
  .join('\n')}`;

const ColorCatalog: React.FC = () => (
  <View style={[catalogStyles.grid, storyStyles.container]}>
    {colorEntries.map(([name, value]) => (
      <View key={name} style={catalogStyles.item}>
        <View style={[catalogStyles.swatch, { backgroundColor: value }]} />
        <Text style={catalogStyles.name}>{name}</Text>
        <Text style={catalogStyles.value}>{String(value)}</Text>
      </View>
    ))}
  </View>
);

const meta = {
  title: 'Lib/Mixin/Styles/Color',
  component: ColorCatalog,
  decorators: [
    (Story) => (
      <View style={storyStyles.container}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      source: {
        code: colorUsageSnippet,
      },
    },
  },
} satisfies Meta<typeof ColorCatalog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

const catalogStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 12,
  },
  item: {
    backgroundColor: color.white,
    borderColor: color.gray,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 132,
    padding: 10,
  },
  swatch: {
    borderColor: color.gray,
    borderRadius: 6,
    borderWidth: 1,
    height: 48,
    width: '100%',
  },
  name: {
    color: color.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  value: {
    color: color.gray50,
    fontSize: 12,
    marginTop: 4,
  },
});
