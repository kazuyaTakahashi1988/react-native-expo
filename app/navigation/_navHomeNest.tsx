import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Child00Screen } from '../features/main/home/homeNest/child00';
import { Child01Screen } from '../features/main/home/homeNest/child01';
import { Child02Screen } from '../features/main/home/homeNest/child02';

import type { TypeRootList } from '../lib/types/typeNavigation';
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
      {/* Child00 画面 */}
      <MaterialTopTab.Screen name='child00' options={{ title: 'Child00' }}>
        {() => <Child00Screen />}
      </MaterialTopTab.Screen>

      {/* Child01 画面 */}
      <MaterialTopTab.Screen name='child01' options={{ title: 'Child01' }}>
        {() => <Child01Screen />}
      </MaterialTopTab.Screen>

      {/* Child02 画面 */}
      <MaterialTopTab.Screen name='child02' options={{ title: 'Child02' }}>
        {() => <Child02Screen />}
      </MaterialTopTab.Screen>

      {/* Childxx 画面 */}
      {/* <MaterialTopTab.Screen name='childxx' options={{ title: 'Childxx' }}>
        {(props) => <ChildxxScreen {...props} />}
      </MaterialTopTab.Screen> */}
    </MaterialTopTab.Navigator>
  );
};

export default NavHomeNest;
