import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { IconAbout, IconHome, IconWork } from '../components/svg';
import { AboutScreen } from '../features/about';
import { HomeChildScreen } from '../features/home/homeChild';
import { HomeChild02Screen } from '../features/home/homeChild02';
import { WorkScreen } from '../features/work';

import type { RootStackParamList } from '../lib/types';

/* --------------------------------------------------
 * Navigation 設定
 * ----------------------------------------------- */
// --- Top Tabs（スワイプで切替え）---
type HomeTopTabsParamList = {
  HomeChild: undefined;
  HomeChild02: undefined;
};
const HomeTopTabs = createMaterialTopTabNavigator<HomeTopTabsParamList>();

function HomeSwipeTabs() {
  return (
    <HomeTopTabs.Navigator
      // タブを下に置きたい場合は 'bottom' に（デフォルトは 'top'）
      // tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true, // 横スワイプ切替え
        tabBarIndicatorStyle: { height: 3 }, // 下線などはお好みで
        // 見た目の微調整（任意）
        // tabBarActiveTintColor: '#fff',
        // tabBarInactiveTintColor: '#9ca3af',
        // tabBarStyle: { backgroundColor: '#0b1220' },
      }}
    >
      <HomeTopTabs.Screen
        name='HomeChild'
        component={HomeChildScreen}
        options={{ title: 'Child 1' }}
      />
      <HomeTopTabs.Screen
        name='HomeChild02'
        component={HomeChild02Screen}
        options={{ title: 'Child 2' }}
      />
    </HomeTopTabs.Navigator>
  );
}

// --- Home配下は Stack（将来 Detail など増やしやすい）---
type HomeStackParamList = {
  HomeTabs: undefined; // ← これが上のスワイプタブ
  HomeDetail: { id: string }; // 例：詳細画面（任意）
};
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeTabs'
        component={HomeSwipeTabs}
        options={{ headerShown: false }} // ヘッダーはタブに任せるなら非表示
      />
      {/* 例：詳細画面を足したいとき */}
      {/* <HomeStack.Screen name="HomeDetail" component={HomeDetail} /> */}
    </HomeStack.Navigator>
  );
}

const Navigation: React.FC = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: '#0ea5e9', // アクティブ文字/アイコン
          tabBarInactiveTintColor: '#fff', // 非アクティブ文字/アイコン
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          tabBarStyle: {
            height: 58,
            paddingTop: 6,
            paddingBottom: 8, // iPhoneのセーフエリアでも読みやすく
            backgroundColor: '#0b1220',
            borderTopColor: 'rgba(255,255,255,0.08)',
            borderTopWidth: 1,
            // Androidの影感
            elevation: 12,
            // iOSの影感
            // boxShadowColor: '#000',
            // boxShadowOpacity: 0.08,
            // boxShadowRadius: 10,
          },
          // ★ 各タブの右側に白線
          tabBarItemStyle: {
            borderRightColor: 'white',
            borderRightWidth: StyleSheet.hairlineWidth, // 物理1px相当
          },
        })}
      >
        <Tab.Screen
          name='home'
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <IconHome size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name='about'
          component={AboutScreen}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({ color, size }) => <IconAbout size={size} color={color} />,
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name='work'
          component={WorkScreen}
          options={{
            tabBarLabel: 'Work',
            tabBarItemStyle: { borderRightWidth: 0 },
            tabBarIcon: ({ color, size }) => <IconWork size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
