import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeChild00Screen, HomeChild01Screen, HomeChild02Screen } from '../features/main';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* -----------------------------------------------
 * homeNest（Home配下） 各画面追加
 * ----------------------------------------------- */

const MaterialTopTab = createMaterialTopTabNavigator<TypeRootList>();

const NavHomeNest: React.FC = () => {
  /* ---------------------------------------------
   * homeNest（Home配下） 各画面
   * --------------------------------------------- */
  return (
    <MaterialTopTab.Navigator screenOptions={{ swipeEnabled: true }}>
      {/* homeChild00 画面 */}
      <MaterialTopTab.Screen name='homeChild00' options={{ title: 'HomeChild00' }}>
        {(props) => <HomeChild00Screen {...props} />}
      </MaterialTopTab.Screen>

      {/* homeChild01 画面 */}
      <MaterialTopTab.Screen name='homeChild01' options={{ title: 'HomeChild01' }}>
        {(props) => <HomeChild01Screen {...props} />}
      </MaterialTopTab.Screen>

      {/* homeChild02 画面 */}
      <MaterialTopTab.Screen name='homeChild02' options={{ title: 'HomeChild02' }}>
        {(props) => <HomeChild02Screen {...props} />}
      </MaterialTopTab.Screen>

      {/* homeChildxx 画面 */}
      {/* <MaterialTopTab.Screen name='homeChildxx' options={{ title: 'HomeChildxx' }}>
        {(props) => <HomeChildxxScreen {...props} />}
      </MaterialTopTab.Screen> */}
    </MaterialTopTab.Navigator>
  );
};

export default NavHomeNest;
