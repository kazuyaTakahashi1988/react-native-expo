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
  const BottomTab = createBottomTabNavigator<RootStackParamList>();
  const NestTab = createMaterialTopTabNavigator<RootStackParamList>();
  const NestStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: '#0ea5e9', // アクティブ文字/アイコン
          tabBarInactiveTintColor: '#fff', // 非アクティブ文字/アイコン
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
        })}
      >
        <BottomTab.Screen
          name='home'
          options={{
            headerShown: true,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <IconHome size={size} color={color} />,
          }}
        >
          {() => (
            <NestStack.Navigator>
              <NestStack.Screen name='homeTabs' options={{ headerShown: false }}>
                {() => (
                  <NestTab.Navigator screenOptions={{ swipeEnabled: true }}>
                    <NestTab.Screen
                      name='homeChild'
                      component={HomeChildScreen}
                      options={{ title: 'HomeChildo1' }}
                    />
                    <NestTab.Screen
                      name='homeChild02'
                      component={HomeChild02Screen}
                      options={{ title: 'HomeChild02' }}
                    />
                  </NestTab.Navigator>
                )}
              </NestStack.Screen>

              {/* 例：将来の詳細画面 */}
              {/* <NestStack.Screen name="HomeDetail" component={HomeDetailScreen} /> */}
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
            tabBarItemStyle: styles.tabBarLastChildStyle,
            tabBarIcon: ({ color, size }) => <IconWork size={size} color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarItemStyle: {
    borderRightColor: 'white',
    borderRightWidth: StyleSheet.hairlineWidth, // 物理1px相当
  },
  tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
  tabBarLastChildStyle: { borderRightWidth: 0 },
  tabBarStyle: {
    backgroundColor: '#0b1220',
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 1,
    elevation: 12,
    height: 58,
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
});

export default Navigation;
