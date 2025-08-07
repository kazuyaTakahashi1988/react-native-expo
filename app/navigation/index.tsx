import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AboutScreen from '../features/about';
import HomeScreen from '../features/home';

import type { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FC } from 'react';

export const stackScreenList = [
  {
    name: 'home',
    component: HomeScreen,
    options: { title: 'ホーム画面' },
  },
  {
    name: 'about',
    component: AboutScreen,
    options: { title: 'アバウト画面', animation: 'slide_from_right' },
  },
];

export type ScreenNavigationProp = NativeStackNavigationProp<{
  home: undefined;
  about: undefined;
  // [x: string]: undefined;
}>;

const Navigation: React.FC = () => {
  const Stack = createNativeStackNavigator();

  type StackScreenType = {
    name: string;
    component: FC<{
      navigation: NavigationProp<ParamListBase>;
      route: RouteProp<ParamListBase, string>;
    }>;
    options: object;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {stackScreenList.map((stackScreen: StackScreenType, i: number) => (
          <Stack.Screen
            key={i}
            name={stackScreen.name}
            component={stackScreen.component}
            options={stackScreen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
