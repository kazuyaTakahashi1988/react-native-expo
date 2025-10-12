import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderSub } from '../components/layout';
import { HomeOthersScreen } from '../features/home';

import type { TypeRootList } from '../lib/types';
import type React from 'react';

/* --------------------------------------------------
 * Home（およびhomeTab）配下の各画面追加
 * ----------------------------------------------- */

const RootStackNav: React.FC = () => {
  const RootStack = createNativeStackNavigator<TypeRootList>();

  return (
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
  );
};

export default RootStackNav;
