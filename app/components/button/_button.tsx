import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color } from '../../lib/mixin';

import type { TypeButton } from '../../lib/types/typeComponents';

/* -----------------------------------------------
 * ボタン
 * ----------------------------------------------- */

const Button = ({
  pattern = 'primary',
  size = 'medium',
  title,
  onPress,
  containerStyle,
  style,
  disabled = false,
}: TypeButton) => {
  /*
   * 適用スタイル
   */
  const styleOption = {
    primary: {
      button: styles.primaryButton,
      text: styles.primaryText,
    },
    secondary: {
      button: styles.secondaryButton,
      text: styles.secondaryText,
    },
    disabled: {
      button: styles.disabledButton,
      text: styles.disabledText,
    },
  };
  const stylePattern = disabled ? 'disabled' : pattern;

  const sizeOption = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        accessibilityRole='button'
        activeOpacity={0.6}
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, styleOption[stylePattern].button, style]}
      >
        <Text style={[styles.text, styleOption[stylePattern].text, sizeOption[size]]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: color.primary,
    borderColor: color.primary,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 16,
    textAlign: 'center',
    width: 'auto',
  },
  text: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
  },
  small: {
    fontSize: 10,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 22,
  },
  primaryButton: {
    backgroundColor: color.primary,
  },
  primaryText: {
    color: color.white,
  },
  secondaryButton: {
    backgroundColor: color.white,
    borderColor: color.gray100,
    borderWidth: 1,
  },
  secondaryText: {
    color: color.black,
  },
  disabledButton: {
    backgroundColor: color.gray100,
    borderColor: color.gray100,
    borderWidth: 1,
  },
  disabledText: {
    color: color.white,
  },
});

export default Button;
