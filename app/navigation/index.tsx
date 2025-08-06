import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AboutScreen from '../features/about';
import HomeScreen from '../features/home';

import type { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FC } from 'react';

const Stack = createNativeStackNavigator();
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

export type StackScreenType = {
  name: string;
  component: FC<{
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase, string>;
  }>;
  options: object;
};

export type ScreenNavigationProp = NativeStackNavigationProp<{
  home: undefined;
  about: undefined;
}>;

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {stackScreenList.map((stackScreen: StackScreenType, index: number) => (
          <Stack.Screen
            key={index}
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
