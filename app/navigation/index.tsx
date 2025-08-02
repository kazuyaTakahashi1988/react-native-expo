import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home';
import AboutScreen from '../features/about';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="about"
          component={AboutScreen}
          options={{ animation: 'slide_from_right', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;