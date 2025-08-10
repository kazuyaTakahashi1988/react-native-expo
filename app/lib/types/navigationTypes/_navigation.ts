import type { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FC } from 'react';

export type ScreenNavigationProp = NativeStackNavigationProp<{
  [x: string]:
    | undefined
    | {
        [x: string]: undefined;
      }[];
}>;

export type StackScreenType = {
  name: string;
  component: FC<{
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase, string>;
  }>;
  options: object;
};
