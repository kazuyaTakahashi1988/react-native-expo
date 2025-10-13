import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNav from './__bottomTabNav';
import OthersNav from './__othersNav';

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
         * BottomTab 各画面追加
         * -------------------------------------------------- */}
        <RootStack.Screen name='bottomTab' options={{ headerShown: false }}>
          {
            /* BottomTab 各画面 */
            () => <BottomTabNav />
          }
        </RootStack.Screen>

        {/* --------------------------------------------------
         * その他 各画面追加
         * -------------------------------------------------- */}
        <RootStack.Screen name='others' options={{ headerShown: false }}>
          {
            /* その他 各画面 */
            () => <OthersNav />
          }
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
