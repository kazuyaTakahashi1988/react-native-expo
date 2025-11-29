import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color } from '../app/lib/mixin';

import type { StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Primary UI component for user interaction */
export const Button = ({ primary = false, size = 'medium', label, onPress }: ButtonProps) => {
  const textModeStyle = primary ? styles.primaryText : styles.secondaryText;

  const textSizeStyle = textSizeStyles[size];

  return (
    <TouchableOpacity accessibilityRole='button' activeOpacity={0.6} onPress={onPress}>
      <View>
        <Text style={[textModeStyle, textSizeStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryText: {
    color: color.white,
  },
  secondaryText: {
    color: color.black,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

const textSizeStyles = {
  small: styles.smallText,
  medium: styles.mediumText,
  large: styles.largeText,
};
