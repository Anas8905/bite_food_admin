import React from 'react';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDrawer } from '../hooks/useDrawer';
import CustomDrawer from './ui/CustomDrawer';
import { useAuth } from '@/hooks/useAuth';
import { ThemedText } from './ThemedText';
import ProfileIcon from '@/assets/images/profile.svg';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function AppDrawer(): React.JSX.Element {
  const { isOpen, closeDrawer } = useDrawer();
  const { user, logout } = useAuth();
  const colors = useThemeColors();

  const handleLogout = async () => {
    await logout();
    closeDrawer();
    router.replace('/login');
  };

  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      width="75%"
      side="left"
      duration={300}
      renderHeader={() => (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity onPress={closeDrawer} style={[styles.closeBtn, { backgroundColor: colors.greyIconBg }]}>
            <ThemedText>✕</ThemedText>
          </TouchableOpacity>

          <View style={{ marginTop: 16, gap: 3 }}>
            <ThemedText type='subtitle' colorName='accentPrimary'>{user?.email}</ThemedText>
            {/* <ThemedText style={[styles.phone, { color: colors.textTertiary}]}>+9230024620401</ThemedText> */}
          </View>
        </View>
      )}
      renderContent={({ close }) => (
        <View style={{ marginTop: 10, gap: 22 }}>
          <DrawerItem
            label="Profile"
            icon={<ProfileIcon width={20} height={20} color={colors.text} />}
            onPress={() => {
              router.navigate('/profile');
              close();
            }}
          />
          <DrawerItem label="Dark Mode" icon={<Feather name="moon" size={20} color={colors.text} />} />
          <DrawerItem label="Settings" icon={<Ionicons name="settings-outline" size={20} color={colors.text} />} />
        </View>
      )}
      renderFooter={() => (
        <View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Feather name="log-out" size={20} color={colors.text} />
            <ThemedText style={styles.drawerItemText}>Logout</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const DrawerItem = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      {icon ? <View>{icon}</View> : null}
      <ThemedText style={styles.drawerItemText}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drawerItemText: {
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6
  },
  logoutText: {
    fontSize: 16,
  },
});
