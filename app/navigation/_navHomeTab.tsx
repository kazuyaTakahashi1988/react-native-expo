import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeChild00Screen, HomeChild01Screen, HomeChild02Screen } from '../features/main';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* --------------------------------------------------
 * Home配下（およびhomeTab） 各画面追加
 * ----------------------------------------------- */

const NavHomeTab: React.FC = () => {
  const NestTab = createMaterialTopTabNavigator<TypeRootList>();

  /* --------------------------------------
   * Home配下（およびhomeTab） 各画面
   * -------------------------------------- */
  return (
    <NestTab.Navigator screenOptions={{ swipeEnabled: true }}>
      {/* homeChild00 画面 */}
      <NestTab.Screen name='homeChild00' options={{ title: 'HomeChild00' }}>
        {(props) => <HomeChild00Screen {...props} />}
      </NestTab.Screen>

      {/* homeChild01 画面 */}
      <NestTab.Screen name='homeChild01' options={{ title: 'HomeChild01' }}>
        {(props) => <HomeChild01Screen {...props} />}
      </NestTab.Screen>

      {/* homeChild02 画面 */}
      <NestTab.Screen name='homeChild02' options={{ title: 'HomeChild02' }}>
        {(props) => <HomeChild02Screen {...props} />}
      </NestTab.Screen>
    </NestTab.Navigator>
  );
};

export default NavHomeTab;
