import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderSub } from '../components/layout';
import { InformationScreen } from '../features/others/information/';

import type { TypeRootList } from '../lib/types/typeNavigation';
import type React from 'react';

/* -----------------------------------------------
 * その他 各画面追加
 * ----------------------------------------------- */

const NativeStack = createNativeStackNavigator<TypeRootList>();

const NavOthers: React.FC = () => {
  /* ---------------------------------------------
   * その他 各画面
   * --------------------------------------------- */
  return (
    <NativeStack.Navigator>
      {/* Information 画面 */}
      <NativeStack.Screen
        name='information'
        options={{
          title: 'Information',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
        }}
      >
        {(props) => <InformationScreen {...props} />}
      </NativeStack.Screen>

      {/* Xxxx 画面 */}
      {/* <NativeStack.Screen
        name='xxxx'
        options={{
          title: 'Xxxx',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
        }}
      >
        {(props) => <XxxxScreen {...props} />}
      </NativeStack.Screen> */}
    </NativeStack.Navigator>
  );
};

export default NavOthers;
