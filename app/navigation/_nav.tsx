import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavMain from './_navMain';
import NavOthers from './_navOthers';

import type { TypeRootList } from '../lib/types/typeNavigation';
import type React from 'react';

/* -----------------------------------------------
 * Navigation & 共通レイアウト 設定
 * ----------------------------------------------- */

const NativeStack = createNativeStackNavigator<TypeRootList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        {/* --------------------------------------
         * メイン 各画面追加
         *（ Home / About / Work / ネスト画面など）
         * --------------------------------------- */}
        <NativeStack.Screen name='main' options={{ headerShown: false }}>
          {
            /* メイン 各画面 */
            () => <NavMain />
          }
        </NativeStack.Screen>

        {/* --------------------------------------
         * その他 各画面追加（Information画面など）
         * --------------------------------------- */}
        <NativeStack.Screen name='others' options={{ headerShown: false }}>
          {
            /* その他 各画面 */
            () => <NavOthers />
          }
        </NativeStack.Screen>
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
