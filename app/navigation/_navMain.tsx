import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import NavHomeNest from './_navHomeNest';
import { HeaderHome, HeaderSub } from '../components/layouts/header';
import { IconAbout, IconHome, IconWork } from '../components/svg/icon';
import { AboutScreen } from '../features/main/about/';
import { WorkScreen } from '../features/main/work/';
import { color, useSafeAreaConst } from '../lib/mixin';

import type { TypeRootList } from '../lib/types/typeNavigation';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

/* -----------------------------------------------
 * メイン 各画面追加
 * ----------------------------------------------- */

const BottomTab = createBottomTabNavigator<TypeRootList>();
const NativeStack = createNativeStackNavigator<TypeRootList>();

const NavMain: React.FC = () => {
  const { safeAreaBottom } = useSafeAreaConst(); // デバイス固有のセーフエリアBottom値

  /*
   * BottomTabスタイル 呼び出し
   */
  const bottomTabStyles = React.useMemo(
    () => bottomTabStylesCalled(safeAreaBottom),
    [safeAreaBottom],
  );

  /* ---------------------------------------------
   * メイン 各画面
   * --------------------------------------------- */
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        ...bottomTabStyles, // BottomTabスタイル
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
          tabBarItemStyle: { borderRightWidth: 0 }, // last-childに対するスタイル
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
          tabBarItemStyle: { borderRightWidth: 0 }, // last-childに対するスタイル
        }}
      >
        {(props) => <XxxxScreen {...props} />}
      </BottomTab.Screen> */}
    </BottomTab.Navigator>
  );
};

/*
 * BottomTabスタイル
 */
const bottomTabStylesCalled = (safeAreaBottom: number): BottomTabNavigationOptions => {
  return {
    // アイコンアクティブカラー
    tabBarActiveTintColor: color.primary,
    // アイコン非アクティブカラー
    tabBarInactiveTintColor: color.white,
    // BottomTabのViewラッパースタイル（全体背景色など）
    tabBarStyle: {
      backgroundColor: color.black,
      borderTopColor: color.black,
      borderTopWidth: 1,
      elevation: 12,
      height: 50 + safeAreaBottom,
      paddingBottom: 8,
      paddingTop: 6,
    },
    // BottomTabのTextラッパースタイル
    tabBarItemStyle: {
      borderRightColor: color.white,
      borderRightWidth: 1,
    },
    // BottomTabのTextスタイル
    tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
  };
};

export default NavMain;
