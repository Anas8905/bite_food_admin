import { Tabs } from 'expo-router';
import GridIcon from '@/assets/images/grid.svg';
import OrderIcon from '@/assets/images/order.svg';
import ForkIcon from '@/assets/images/fork.svg';
import ProfileIcon from '@/assets/images/profile.svg';
import { TabBarIcon } from '@/components/ui/TabBarIcon';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from '@/hooks/useThemeColors';

export default function TabLayout(): React.JSX.Element {
  const { icon, iconActive, bgSecondary } = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: icon,
        tabBarActiveTintColor: iconActive,
        // tabBarBackground: () => (
        //   <View style={{ flex: 1, backgroundColor: bgPrimary }} />
        // ),
        tabBarStyle: {
          paddingTop: 10,
          height: 46 + insets.bottom,
          backgroundColor: bgSecondary,
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={GridIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={OrderIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={ForkIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={ProfileIcon} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
