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

const Navigation: React.FC = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  const Tabs = createMaterialTopTabNavigator<RootStackParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: '#0ea5e9', // アクティブ文字/アイコン
          tabBarInactiveTintColor: '#fff', // 非アクティブ文字/アイコン
          tabBarLabelStyle: TabNavigator.tabBarLabelStyle,
          tabBarStyle: TabNavigator.tabBarStyle,
          tabBarItemStyle: TabNavigator.tabBarItemStyle, // ★ 各タブの右側に白線
        })}
      >
        <Tab.Screen
          name='home'
          options={{
            headerShown: true,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <IconHome size={size} color={color} />,
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen name='homeTabs' options={{ headerShown: false }}>
                {() => (
                  <Tabs.Navigator
                    screenOptions={{
                      swipeEnabled: true,
                      tabBarIndicatorStyle: { height: 3 },
                    }}
                  >
                    <Tabs.Screen
                      name='homeChild'
                      component={HomeChildScreen}
                      options={{ title: 'HomeChildo1' }}
                    />
                    <Tabs.Screen
                      name='homeChild02'
                      component={HomeChild02Screen}
                      options={{ title: 'HomeChild02' }}
                    />
                  </Tabs.Navigator>
                )}
              </Stack.Screen>

              {/* 例：将来の詳細画面 */}
              {/* <Stack.Screen name="HomeDetail" component={HomeDetailScreen} /> */}
            </Stack.Navigator>
          )}
        </Tab.Screen>
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

const TabNavigator = StyleSheet.create({
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
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  tabBarItemStyle: {
    borderRightColor: 'white',
    borderRightWidth: StyleSheet.hairlineWidth, // 物理1px相当
  },
});

export default Navigation;
