import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import { HeaderHome, HeaderSub } from '../components/layout';
import { IconAbout, IconHome, IconWork } from '../components/svg';
import { AboutScreen } from '../features/about';
import {
  HomeChild00Screen,
  HomeChild01Screen,
  HomeChild02Screen,
  HomeOthersScreen,
} from '../features/home';
import { WorkScreen } from '../features/work';

import type { TypeRootList } from '../lib/types';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type React from 'react';

/* --------------------------------------------------
 * Navigation & 共通レイアウト 設定
 * ----------------------------------------------- */

const Navigation: React.FC = () => {
  const BottomTab = createBottomTabNavigator<TypeRootList>();
  const NestTab = createMaterialTopTabNavigator<TypeRootList>();
  const NestStack = createNativeStackNavigator<TypeRootList>();

  /* BottomTab非表示処理 */
  const bottomTabNone = (navigation: NativeStackNavigationProp<TypeRootList>) => {
    return {
      focus: () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'none' },
        });
      },
      beforeRemove: () => {
        navigation.getParent()?.setOptions({
          ...bottomTabStyles,
        });
      },
    };
  };

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={() => ({
          ...bottomTabStyles, // BottomTabスタイル
        })}
      >
        {/* --------------------------------------------------
         * BottomTabの各画面追加
         * -------------------------------------------------- */}
        {/* Home 画面 */}
        <BottomTab.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <IconHome color={color} />,
            tabBarBadge: undefined,
          }}
        >
          {() => (
            <NestStack.Navigator>
              {/* --------------------------------------
               * Home配下（およびhomeTab配下）の画面追加
               * -------------------------------------- */}
              <NestStack.Screen
                name='homeTab'
                options={{
                  header: (props) => <HeaderHome {...props} />, // 共通ヘッダー（Home用）
                }}
              >
                {() => (
                  <NestTab.Navigator screenOptions={{ swipeEnabled: true }}>
                    <NestTab.Screen name='homeChild00' options={{ title: 'HomeChild00' }}>
                      {(props) => <HomeChild00Screen {...props} />}
                    </NestTab.Screen>
                    <NestTab.Screen name='homeChild01' options={{ title: 'HomeChild01' }}>
                      {(props) => <HomeChild01Screen {...props} />}
                    </NestTab.Screen>
                    <NestTab.Screen name='homeChild02' options={{ title: 'HomeChild02' }}>
                      {(props) => <HomeChild02Screen {...props} />}
                    </NestTab.Screen>
                  </NestTab.Navigator>
                )}
              </NestStack.Screen>

              {/* --------------------------------------
               * Home配下（かつhomeTab外）の画面追加
               * -------------------------------------- */}
              <NestStack.Screen
                name='homeOthers'
                options={{
                  title: 'HomeOthers',
                  header: (props) => <HeaderSub {...props} />, // 共通ヘッダー（サブ用）
                }}
                listeners={({ navigation }) => bottomTabNone(navigation)} // BottomTab非表示
              >
                {(props) => <HomeOthersScreen {...props} />}
              </NestStack.Screen>
            </NestStack.Navigator>
          )}
        </BottomTab.Screen>

        {/* About 画面 */}
        <BottomTab.Screen
          name='about'
          options={{
            title: 'About',
            header: (props) => <HeaderSub {...props} isBack={false} />, // 共通ヘッダー（サブ用）
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
            header: (props) => <HeaderSub {...props} isBack={false} />, // 共通ヘッダー（サブ用）
            tabBarIcon: ({ color }) => <IconWork color={color} />,
            tabBarBadge: undefined,
            ...tabBarItemLastChild, // :last-childスタイル
          }}
        >
          {(props) => <WorkScreen {...props} />}
        </BottomTab.Screen>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

/* BottomTabスタイル */
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

export default Navigation;
