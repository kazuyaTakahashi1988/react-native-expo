import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

export type Typelayout = {
  children?: React.ReactNode;
};

export type TypeHeaderSub = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  isBack?: boolean;
};
