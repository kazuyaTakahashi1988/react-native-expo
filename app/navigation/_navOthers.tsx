import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

import { HeaderSub } from '../components/layouts/header';
import { IconInfo } from '../components/svg/icon';
import { AuthScreen } from '../features/others/auth';
import { InformationScreen } from '../features/others/information';

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
          header: (props) => {
            const rightItem = (
              <Pressable
                onPress={() => {
                  props.navigation.navigate('information');
                }}
              >
                <IconInfo />
              </Pressable>
            );
            return <HeaderSub {...props} goBack='戻る' rightItem={rightItem} />; // 共通ヘッダー（サブ用）
          },
        }}
      >
        {() => <AuthScreen />}
      </NativeStack.Screen>

      {/* Information 画面 */}
      <NativeStack.Screen
        name='information'
        options={{
          title: 'Information',
          header: (props) => <HeaderSub {...props} goBack={true} />, // 共通ヘッダー（サブ用）
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
