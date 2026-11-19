import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Linking from './_linking';
import { NavMain } from './_main';
import { NavOthers } from './_others';

import type { TypeRootList } from '../lib/types/typeNavigation';
import type React from 'react';

/* -----------------------------------------------
 * Navigation & 共通ヘッダー・フッター（BottomTab） 設定
 * ----------------------------------------------- */

const NativeStack = createNativeStackNavigator<TypeRootList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer linking={Linking}>
      <NativeStack.Navigator>
        {/* --------------------------------------
         * main 各画面追加
         *（ Home / About / Work / ネスト画面など）
         * --------------------------------------- */}
        <NativeStack.Screen name='main' options={{ headerShown: false }}>
          {
            /* main 各画面 */
            () => <NavMain />
          }
        </NativeStack.Screen>

        {/* --------------------------------------
         * others 各画面追加
         *（ Auth / Information 画面など）
         * --------------------------------------- */}
        <NativeStack.Screen name='others' options={{ headerShown: false }}>
          {
            /* others 各画面 */
            () => <NavOthers />
          }
        </NativeStack.Screen>
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
