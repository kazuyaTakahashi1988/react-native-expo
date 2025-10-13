import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderSub } from '../components/layout';
import { InformationScreen } from '../features/others';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* --------------------------------------------------
 * その他 各画面追加
 * ----------------------------------------------- */

const NavOthers: React.FC = () => {
  const RootStack = createNativeStackNavigator<TypeRootList>();

  /* --------------------------------------
   * その他 各画面
   * -------------------------------------- */
  return (
    <RootStack.Navigator>
      {/* information 画面 */}
      <RootStack.Screen
        name='information'
        options={{
          title: 'Information',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
          headerShown: true,
        }}
      >
        {(props) => <InformationScreen {...props} />}
      </RootStack.Screen>

      {/* xxxx 画面 */}
      {/* <RootStack.Screen
        name='xxxx'
        options={{
          title: 'xxxxx',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
          headerShown: true,
        }}
      >
        {(props) => <XXXX {...props} />}
      </RootStack.Screen> */}
    </RootStack.Navigator>
  );
};

export default NavOthers;
