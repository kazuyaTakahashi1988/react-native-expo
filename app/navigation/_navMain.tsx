import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavAboutNest from './_navAboutNest';
import NavHomeNest from './_navHomeNest';
import { HeaderHome, HeaderSub } from '../components/layouts/header';
import { IconAbout, IconHome, IconWork } from '../components/svg/icon';
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
  // デバイス固有のセーフエリアBottom値
  const { bottom } = useSafeAreaInsets();
  const bottomTabHeight = bottom + (Platform.OS === 'ios' ? 50 : 70);

  /* ---------------------------------------------
   * メイン 各画面
   * --------------------------------------------- */
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        // BottomTabスタイル
        ...bottomTabStyles,
        tabBarStyle: [bottomTabStyles.tabBarStyle, { height: bottomTabHeight }],
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
        {
          /* -------------------------------------
           * aboutNest（About配下） 各画面追加
           * ------------------------------------- */
          () => (
            <NativeStack.Navigator>
              <NativeStack.Screen name='aboutNest' options={{ headerShown: false }}>
                {
                  /* aboutNest（About配下） 各画面 */
                  () => <NavAboutNest />
                }
              </NativeStack.Screen>
            </NativeStack.Navigator>
          )
        }
      </BottomTab.Screen>

      {/* Work 画面 */}
      <BottomTab.Screen
        name='work'
        options={{
          title: 'Work',
          header: (props) => <HeaderSub {...props} />, // 共通ヘッダー（サブ用）
          tabBarIcon: ({ color }) => <IconWork color={color} />,
          tabBarBadge: undefined,
          tabBarItemStyle: tabBarItemStyleLastChild, // last-childに対するスタイル
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
          tabBarItemStyle: tabBarItemStyleLastChild, // last-childに対するスタイル
        }}
      >
        {(props) => <XxxxScreen {...props} />}
      </BottomTab.Screen> */}
    </BottomTab.Navigator>
  );
};

/*
 * bottomTabスタイル
 */
const bottomTabStyles: BottomTabNavigationOptions = {
  // アクティブカラー
  tabBarActiveTintColor: color.primary,
  // 非アクティブカラー
  tabBarInactiveTintColor: color.white,
  // タブバーのViewラッパースタイル（全体背景色など）
  tabBarStyle: {
    backgroundColor: color.black,
    elevation: 12,
    paddingBottom: 0,
    paddingTop: 6,
  },
  // タブバーのTextラッパースタイル
  tabBarItemStyle: {
    borderRightColor: color.white,
    borderRightWidth: 1,
    minHeight: 90,
  },
  // タブバーのTextスタイル
  tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
};
// last-childに対するスタイル
const tabBarItemStyleLastChild = [bottomTabStyles.tabBarItemStyle, { borderRightWidth: 0 }];

export default NavMain;
