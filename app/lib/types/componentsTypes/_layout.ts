import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

export type TypeHeaderHome = NativeStackHeaderProps;

export type TypeHeaderSub = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  goBack?: string | boolean;
};

export type TypeLayout = {
  children?: React.ReactNode;
};
