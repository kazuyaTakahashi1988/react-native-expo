import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeChild00Screen, HomeChild01Screen, HomeChild02Screen } from '../features/home';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* --------------------------------------------------
 * Home（およびhomeTab）配下の各画面追加
 * ----------------------------------------------- */

const HomeTabNav: React.FC = () => {
  const NestTab = createMaterialTopTabNavigator<TypeRootList>();
  const NestStack = createNativeStackNavigator<TypeRootList>();

  return (
    <NestStack.Navigator>
      <NestStack.Screen name='homeTab' options={{ headerShown: false }}>
        {() => (
          <NestTab.Navigator screenOptions={{ swipeEnabled: true }}>
            {/* --------------------------------------
             * Home（およびhomeTab）配下の各画面
             * -------------------------------------- */}
            <NestTab.Screen name='homeChild00' options={{ title: 'HomeChild00' }}>
              {(props) => <HomeChild00Screen {...props} />}
            </NestTab.Screen>
            <NestTab.Screen name='homeChild01' options={{ title: 'HomeChild01' }}>
              {(props) => <HomeChild01Screen {...props} />}
            </NestTab.Screen>
            <NestTab.Screen name='homeChild02' options={{ title: 'HomeChild02' }}>
              {(props) => <HomeChild02Screen {...props} />}
            </NestTab.Screen>
          </NestTab.Navigator>
        )}
      </NestStack.Screen>
    </NestStack.Navigator>
  );
};

export default HomeTabNav;
