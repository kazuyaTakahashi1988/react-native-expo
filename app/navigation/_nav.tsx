import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavMain from './_navMain';
import NavOthers from './_navOthers';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* --------------------------------------------------
 * Navigation & 共通レイアウト 設定
 * ----------------------------------------------- */

const Navigation: React.FC = () => {
  const RootStack = createNativeStackNavigator<TypeRootList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* --------------------------------------------------
         * メイン 各画面追加
         * -------------------------------------------------- */}
        <RootStack.Screen name='main' options={{ headerShown: false }}>
          {
            /* メイン 各画面 */
            () => <NavMain />
          }
        </RootStack.Screen>

        {/* --------------------------------------------------
         * その他 各画面追加
         * -------------------------------------------------- */}
        <RootStack.Screen name='others' options={{ headerShown: false }}>
          {
            /* その他 各画面 */
            () => <NavOthers />
          }
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
