import type { StyleProp, ViewStyle } from 'react-native';

/* -----------------------------------------------
 * [ app/components/button ] 用 type
 * ----------------------------------------------- */

/*
 * ボタン
 */
export type TypeButton = {
  pattern?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  title?: string | React.ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};
