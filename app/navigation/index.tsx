import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import Header from '../components/layout/layoutForPrimary/_header';
import { IconAbout, IconHome, IconWork } from '../components/svg';
import { AboutScreen } from '../features/about';
import { HomeChild00Screen, HomeChild01Screen, HomeChild02Screen } from '../features/home';
import { WorkScreen } from '../features/work';

import type { RootStackParamList } from '../lib/types';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

/* --------------------------------------------------
 * Navigation 設定
 * ----------------------------------------------- */

const Navigation: React.FC = () => {
  const BottomTab = createBottomTabNavigator<RootStackParamList>();
  const NestTab = createMaterialTopTabNavigator<RootStackParamList>();
  const NestStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={() => ({
          headerShown: false,
          ...bottomTabStyles, // BottomTabのスタイル設定
        })}
      >
        {/* --------------------------------------------------
         * BottomTabの各画面追加
         * -------------------------------------------------- */}
        <BottomTab.Screen
          name='home'
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <IconHome size={size} color={color} />,
            tabBarBadge: undefined,
          }}
        >
          {() => (
            <NestStack.Navigator>
              {/* --------------------------------------
               * home配下（およびhomeTab下）の画面追加
               * -------------------------------------- */}
              <NestStack.Screen
                name='homeTab'
                options={{
                  headerShown: true,
                  header: () => <Header />, // home用共通ヘッダー
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
               * home配下（およびhomeTab外）の画面追加
               * -------------------------------------- */}
              {/* <NestStack.Screen name="anotherDetail" component={AnotherScreen} /> */}
            </NestStack.Navigator>
          )}
        </BottomTab.Screen>

        <BottomTab.Screen
          name='about'
          component={AboutScreen}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({ color, size }) => <IconAbout size={size} color={color} />,
            tabBarBadge: 3,
          }}
        />

        <BottomTab.Screen
          name='work'
          component={WorkScreen}
          options={{
            tabBarLabel: 'Work',
            tabBarIcon: ({ color, size }) => <IconWork size={size} color={color} />,
            tabBarBadge: undefined,
            ...tabBarItemLastChild, // :last-child用スタイル
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

/* BottomTabのスタイル設定 */
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

/* :last-child用スタイル */
const tabBarItemLastChild: BottomTabNavigationOptions = {
  tabBarItemStyle: { borderRightWidth: 0 },
};

export default Navigation;
