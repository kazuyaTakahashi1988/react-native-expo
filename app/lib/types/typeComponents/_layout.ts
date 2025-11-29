import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

/* -----------------------------------------------
 * [ app/components/layout ] 用 type
 * ----------------------------------------------- */

export type TypeHeaderHome = NativeStackHeaderProps | BottomTabHeaderProps;

export type TypeHeaderSub = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  goBack?: string | boolean;
  rightButton?: React.ReactNode;
};

export type TypeLayout = {
  children?: React.ReactNode;
};
