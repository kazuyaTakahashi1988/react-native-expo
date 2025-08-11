import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createURL } from 'expo-linking';
import React from 'react';

import { AboutScreen } from '../features/about';
import { HomeScreen } from '../features/home';

import type { StackScreenType } from '../lib/types';
import type { RootStackParamList } from '../lib/types';
import type { LinkingOptions } from '@react-navigation/native';

const stackScreenList = [
  {
    name: 'home',
    component: HomeScreen,
    options: { title: 'ホーム画面' },
    deepLink: '',
  },
  {
    name: 'about',
    component: AboutScreen,
    options: { title: 'アバウト画面', animation: 'slide_from_right' },
    deepLink: 'about',
  },
  {
    name: 'aboutChild',
    component: AboutScreen,
    options: { title: 'アバウトチャイルド画面', animation: 'slide_from_right' },
    deepLink: 'about/aboutChild',
  },
];

const prefixes = [
  createURL('/'), // myapp:// の形（dev時は exp+〜 の形になることも）
  'https://example.com', // 後述のUniversal/App Links用（任意）
];

// DeepLink設定をstackScreenListから生成
const generateScreensConfig = () => {
  const config: Record<string, string> = {};
  for (const stackScreen of stackScreenList) {
    if (stackScreen.deepLink != null) {
      config[stackScreen.name] = stackScreen.deepLink;
    }
  }
  return config;
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes,
  config: {
    screens: generateScreensConfig(),
  },
};

const Navigation: React.FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer linking={linking}>
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
