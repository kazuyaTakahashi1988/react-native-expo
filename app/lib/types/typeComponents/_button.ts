import type { StyleProp, ViewStyle } from 'react-native';

export type TypeButton = {
  pattern?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  title?: string | React.ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};
