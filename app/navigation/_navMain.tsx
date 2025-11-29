import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import NavHomeNest from './_navHomeNest';
import { HeaderHome, HeaderSub } from '../components/layout';
import { IconAbout, IconHome, IconWork } from '../components/svg/icon';
import { AboutScreen } from '../features/main/about/';
import { WorkScreen } from '../features/main/work/';
import { color } from '../lib/mixin';

import type { TypeRootList } from '../lib/types/typeNavigation';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type React from 'react';

/* -----------------------------------------------
 * メイン 各画面追加
 * ----------------------------------------------- */

const BottomTab = createBottomTabNavigator<TypeRootList>();
const NativeStack = createNativeStackNavigator<TypeRootList>();

const NavMain: React.FC = () => {
  /* ---------------------------------------------
   * メイン 各画面
   * --------------------------------------------- */
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
          /* -------------------------------------
           * homeNest（Home配下） 各画面追加
           * ------------------------------------- */
          () => (
            <NativeStack.Navigator>
              <NativeStack.Screen name='homeNest' options={{ headerShown: false }}>
                {
                  /* homeNest（Home配下） 各画面 */
                  () => <NavHomeNest />
                }
              </NativeStack.Screen>
            </NativeStack.Navigator>
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

      {/* Xxxx 画面 */}
      {/* <BottomTab.Screen
        name='xxxx'
        options={{
          title: 'Xxxx',
          header: (props) => <HeaderSub {...props} />, // 共通ヘッダー（サブ用）
          tabBarIcon: ({ color }) => <IconXxxx color={color} />,
          tabBarBadge: undefined,
          ...tabBarItemLastChild, // :last-childスタイル
        }}
      >
        {(props) => <XxxxScreen {...props} />}
      </BottomTab.Screen> */}
    </BottomTab.Navigator>
  );
};

/* bottomTabスタイル */
const bottomTabStyles: BottomTabNavigationOptions = {
  tabBarActiveTintColor: color.primary, // アクティブカラー
  tabBarInactiveTintColor: color.white, // 非アクティブカラー
  tabBarStyle: {
    backgroundColor: '#0b1220',
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 1,
    elevation: 12,
    height: 88,
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

export default NavMain;
