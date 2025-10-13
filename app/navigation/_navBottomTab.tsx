import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import NavHomeTab from './_navHomeTab';
import { HeaderHome, HeaderSub } from '../components/layout';
import { IconAbout, IconHome, IconWork } from '../components/svg';
import { AboutScreen } from '../features/about';
import { WorkScreen } from '../features/work';

import type { TypeRootList } from '../lib/types';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type React from 'react';

/* --------------------------------------------------
 * bottomTab 各画面追加
 * ----------------------------------------------- */

const NavBottomTab: React.FC = () => {
  const BottomTab = createBottomTabNavigator<TypeRootList>();
  const NestStack = createNativeStackNavigator<TypeRootList>();

  /* --------------------------------------
   * bottomTab 各画面
   * -------------------------------------- */
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        ...bottomTabStyles, // bottomTabスタイル
      })}
    >
      {/* Home 画面 */}
      <BottomTab.Screen
        name='home'
        options={{
          title: 'Home',
          header: (props) => <HeaderHome {...props} />, // 共通ヘッダー（Home用）
          tabBarIcon: ({ color }) => <IconHome color={color} />,
          tabBarBadge: undefined,
        }}
      >
        {
          /* --------------------------------------
           * Home配下（およびhomeTab） 各画面追加
           * -------------------------------------- */
          () => (
            <NestStack.Navigator>
              <NestStack.Screen name='homeTab' options={{ headerShown: false }}>
                {
                  /* homeTab 各画面 */
                  () => <NavHomeTab />
                }
              </NestStack.Screen>
            </NestStack.Navigator>
          )
        }
      </BottomTab.Screen>

      {/* About 画面 */}
      <BottomTab.Screen
        name='about'
        options={{
          title: 'About',
          header: (props) => <HeaderSub {...props} />, // 共通ヘッダー（サブ用）
          tabBarIcon: ({ color }) => <IconAbout color={color} />,
          tabBarBadge: 3,
        }}
      >
        {(props) => <AboutScreen {...props} />}
      </BottomTab.Screen>

      {/* Work 画面 */}
      <BottomTab.Screen
        name='work'
        options={{
          title: 'Work',
          header: (props) => <HeaderSub {...props} />, // 共通ヘッダー（サブ用）
          tabBarIcon: ({ color }) => <IconWork color={color} />,
          tabBarBadge: undefined,
          ...tabBarItemLastChild, // :last-childスタイル
        }}
      >
        {(props) => <WorkScreen {...props} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

/* bottomTabスタイル */
const bottomTabStyles: BottomTabNavigationOptions = {
  tabBarActiveTintColor: '#0ea5e9', // アクティブカラー
  tabBarInactiveTintColor: '#fff', // 非アクティブカラー
  tabBarStyle: {
    backgroundColor: '#0b1220',
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 1,
    elevation: 12,
    height: 58,
    paddingBottom: 8,
    paddingTop: 6,
  }, // タブバーのViewラッパースタイル（全体背景色など）
  tabBarItemStyle: {
    borderRightColor: 'white',
    borderRightWidth: StyleSheet.hairlineWidth,
  }, // タブバーのTextラッパースタイル
  tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }, // タブバーのTextスタイル
};

/* :last-childスタイル */
const tabBarItemLastChild: BottomTabNavigationOptions = {
  tabBarItemStyle: { borderRightWidth: 0 },
};

export default NavBottomTab;
