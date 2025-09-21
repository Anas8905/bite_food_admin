import AddIcon from '@/assets/images/add.svg';
import ForkIcon from '@/assets/images/fork.svg';
import GridIcon from '@/assets/images/grid.svg';
import OrderIcon from '@/assets/images/order.svg';
import ProfileIcon from '@/assets/images/profile.svg';
import { TabBarIcon } from '@/components/ui/TabBarIcon';
import { useAddCategory } from '@/hooks/useAddCategory';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColors } from '@/hooks/useThemeColors';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Redirect, Tabs, usePathname } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout(): React.JSX.Element | null {
  const { user, hydrated } = useAuth();
  const { tint, icon, iconActive, bgSecondary } = useThemeColors();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const showAddButton = pathname === '/menu';
  const { handleAddCategory } = useAddCategory();

  if (!hydrated) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

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
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={OrderIcon} color={color} focused={focused} />
          ),
        }}
      />

        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleAddCategory();
            },
          }}
          options={{
            ...(showAddButton
              ? {
                  tabBarButton: ({ onPress }: BottomTabBarButtonProps) => (
                    <TouchableOpacity
                      onPress={onPress}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AddIcon width={50} height={50} color={tint} />
                    </TouchableOpacity>
                  ),
                }
              : { href: null }),
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
