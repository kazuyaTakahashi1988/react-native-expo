import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

export type TypeHeaderHomeProps = NativeStackHeaderProps;

export type TypeHeaderSubProps = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  isBack?: boolean;
};

export type TypeLayoutProps = {
  children?: React.ReactNode;
};
