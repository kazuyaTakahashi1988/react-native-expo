import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderSub } from '../components/layout';
import { AuthScreen } from '../features/others/auth/';

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
      {/* Auth 画面 */}
      <NativeStack.Screen
        name='auth'
        options={{
          title: 'Auth',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
        }}
      >
        {() => <AuthScreen />}
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
