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
        <BottomTab.Screen
          name='home'
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconHome color={color} />,
            tabBarBadge: undefined,
            headerShown: false,
          }}
        >
          {() => (
            <NestStack.Navigator>
              {/* --------------------------------------
               * home配下（およびhomeTab配下）の画面追加
               * -------------------------------------- */}
              <NestStack.Screen
                name='homeTab'
                options={{
                  header: (props) => <HeaderHome {...props} />, // 共通ヘッダー（Home用）
                }}
              >
                {() => (
                  <NestTab.Navigator screenOptions={{ swipeEnabled: true }}>
                    <NestTab.Screen
                      name='homeChild00'
                      component={HomeChild00Screen}
                      options={{ title: 'HomeChild00' }}
                    />
                    <NestTab.Screen
                      name='homeChild01'
                      component={HomeChild01Screen}
                      options={{ title: 'HomeChild01' }}
                    />
                    <NestTab.Screen
                      name='homeChild02'
                      component={HomeChild02Screen}
                      options={{ title: 'HomeChild02' }}
                    />
                  </NestTab.Navigator>
                )}
              </NestStack.Screen>

              {/* --------------------------------------
               * home配下（かつhomeTab外）の画面追加
               * -------------------------------------- */}
              <NestStack.Screen
                name='homeOthers'
                component={HomeOthersScreen}
                options={{
                  title: 'HomeOthers',
                  header: (props) => <HeaderSub {...props} />, // 共通ヘッダー（サブ用）
                }}
                listeners={({ navigation }) => bottomTabNone(navigation)} // BottomTab非表示処理
              />
            </NestStack.Navigator>
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name='about'
          component={AboutScreen}
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <IconAbout color={color} />,
            tabBarBadge: 3,
            header: (props) => <HeaderSub {...props} isBack={false} />, // 共通ヘッダー（サブ用）
          }}
        />

        <BottomTab.Screen
          name='work'
          component={WorkScreen}
          options={{
            title: 'Work',
            tabBarIcon: ({ color }) => <IconWork color={color} />,
            tabBarBadge: undefined,
            header: (props) => <HeaderSub {...props} isBack={false} />, // 共通ヘッダー（サブ用）
            ...tabBarItemLastChild, // :last-childスタイル
          }}
        />
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
