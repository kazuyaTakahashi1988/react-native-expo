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
      {/* Information 画面 */}
      <RootStack.Screen
        name='information'
        options={{
          title: 'Information',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
        }}
      >
        {(props) => <InformationScreen {...props} />}
      </RootStack.Screen>

      {/* Xxxx 画面 */}
      {/* <RootStack.Screen
        name='xxxx'
        options={{
          title: 'Xxxx',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
        }}
      >
        {(props) => <XxxxScreen {...props} />}
      </RootStack.Screen> */}
    </RootStack.Navigator>
  );
};

export default NavOthers;
