import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const sizeOption = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const stylePattern = disabled ? 'disabled' : pattern;
  const buttonStyle = [styles.button, styleOption[stylePattern].button, style];
  const textStyle = [styles.text, styleOption[stylePattern].text, sizeOption[size]];

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        accessibilityRole='button'
        activeOpacity={0.6}
        disabled={disabled}
        onPress={onPress}
        style={buttonStyle}
      >
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 40,
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
    fontSize: 8,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 24,
  },
  primaryButton: {
    backgroundColor: '#2196f3',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#9e9e9e',
    borderWidth: 1,
  },
  secondaryText: {
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#9e9e9e',
  },
  disabledText: {
    color: '#fff',
  },
});

export default Button;
