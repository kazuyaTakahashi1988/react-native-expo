import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderSub } from '../components/layout';
import { HomeOthersScreen } from '../features/others';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* --------------------------------------------------
 * その他 各画面追加
 * ----------------------------------------------- */

const OthersNav: React.FC = () => {
  const RootStack = createNativeStackNavigator<TypeRootList>();

  return (
    <RootStack.Navigator>
      {/* --------------------------------------
       * その他 各画面
       * -------------------------------------- */}

      {/* homeOthers 画面 */}
      <RootStack.Screen
        name='homeOthers'
        options={{
          title: 'HomeOthers',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
          headerShown: true,
        }}
      >
        {(props) => <HomeOthersScreen {...props} />}
      </RootStack.Screen>

      {/* homeOthers02 画面 */}
      <RootStack.Screen
        name='homeOthers02'
        options={{
          title: 'HomeOthers02',
          header: (props) => <HeaderSub {...props} goBack='戻る' />, // 共通ヘッダー（サブ用）
          headerShown: true,
        }}
      >
        {(props) => <HomeOthersScreen {...props} />}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default OthersNav;
