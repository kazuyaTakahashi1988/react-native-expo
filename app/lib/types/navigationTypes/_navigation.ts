import type { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FC } from 'react';

export type RootStackParamList = Record<string, undefined | { [key: string]: string | object }>;

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type StackScreenType = {
  name: string;
  component: FC<{
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase, string>;
  }>;
  options: object;
  deepLink?: string | null;
};
