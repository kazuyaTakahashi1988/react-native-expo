import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AboutScreen, HomeScreen } from '../features';

import type { StackScreenType } from '../lib/types';

const stackScreenList = [
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

const Navigation: React.FC = () => {
  const Stack = createNativeStackNavigator();

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
