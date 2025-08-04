import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AboutScreen from '../features/about';
import HomeScreen from '../features/home';

export type RootStackParamList = {
  home: undefined;
  about: undefined; // 必要に応じてパラメータ
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='home' component={HomeScreen} options={{ animation: 'fade' }} />
        <Stack.Screen
          name='about'
          component={AboutScreen}
          options={{ animation: 'slide_from_right', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
