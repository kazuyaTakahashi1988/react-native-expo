import type React from 'react';
import type { ViewStyle } from 'react-native';

export type TypeToast = {
  visible: boolean;
  message?: string | React.ReactNode;
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
  variant?: 'default' | 'success' | 'error';
  onHide?: () => void;
  onShow?: () => void;
};

export type TypeOffsetOption = Record<NonNullable<TypeToast['position']>, number>;
export type TypePositionStyle = Record<NonNullable<TypeToast['position']>, ViewStyle>;
export type TypeVariantStyle = Record<NonNullable<TypeToast['variant']>, ViewStyle | undefined>;
