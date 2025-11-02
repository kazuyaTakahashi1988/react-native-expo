import { Pressable, StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type React from 'react';

type ButtonVariant = 'primary' | 'secondary';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const AppButton: React.FC<Props> = (props) => {
  const {
    label,
    onPress,
    variant = 'primary',
    disabled = false,
    accessibilityLabel,
    style,
  } = props;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole='button'
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' ? styles.secondary : styles.primary,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  secondary: {
    backgroundColor: '#4b5563',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
});

export default AppButton;
