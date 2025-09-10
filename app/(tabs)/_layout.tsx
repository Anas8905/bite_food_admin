import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import GridIcon from '../../assets/images/grid.svg';
import OrderIcon from '../../assets/images/order.svg';
import ForkIcon from '../../assets/images/fork.svg';
import ProfileIcon from '../../assets/images/profile.svg';


export default function TabLayout(): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].icon,
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? "light"].bgPrimary }} />
        ),
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <GridIcon width={20} height={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <OrderIcon width={20} height={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <ForkIcon width={20} height={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <ProfileIcon width={20} height={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
