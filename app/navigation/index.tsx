import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createURL } from 'expo-linking';
import React from 'react';

import { AboutScreen } from '../features/about';
import { AboutChildScreen } from '../features/about/aboutChild';
import { HomeScreen } from '../features/home';

import type { StackScreenType } from '../lib/types';
import type { RootStackParamList } from '../lib/types';
import type { LinkingOptions } from '@react-navigation/native';

/* --------------------------------------------------
 * stackScreen 画面リスト
 * ----------------------------------------------- */
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
    component: AboutChildScreen,
    options: { title: 'アバウトチャイルド画面', animation: 'slide_from_right' },
    deepLink: 'about/aboutChild',
  },
];

/* --------------------------------------------------
 * DeepLink の設定
 * stackScreenListから、linkingおよびDeepLink設定を生成
 * ----------------------------------------------- */
const getLinkingConfig = () => {
  const screensConfig: Record<string, string> = {};
  for (const stackScreen of stackScreenList) {
    if (stackScreen.deepLink !== null) {
      screensConfig[stackScreen.name] = stackScreen.deepLink;
    }
  }
  return {
    prefixes: [createURL('/'), 'https://example.com'],
    config: { screens: screensConfig },
  };
};

const linking: LinkingOptions<RootStackParamList> = getLinkingConfig();

/* --------------------------------------------------
 * Navigation 設定
 * ----------------------------------------------- */
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
