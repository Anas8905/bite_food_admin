import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDrawer } from '../hooks/useDrawer';
import CustomDrawer from './ui/CustomDrawer';
import { useAuth } from '@/hooks/useAuth';
import { ThemedText } from './ThemedText';
import ProfileIcon from '@/assets/images/profile.svg';
import { useThemeColors } from '@/hooks/useThemeColors';
import { capitalize } from '@/utils/common.utils';
import { useThemePreference } from '@/hooks/useThemePreference';

export default function AppDrawer(): React.JSX.Element {
  const { isOpen, closeDrawer } = useDrawer();
  const { preference, cyclePreference } = useThemePreference();
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
          <View style={styles.header}>
            <TouchableOpacity onPress={closeDrawer} style={[styles.closeBtn, { backgroundColor: colors.greyBg }]}>
              <Ionicons name="close" size={18} color={colors.textPrimary} />
            </TouchableOpacity>

            {user?.avatar && (
              <View style={styles.avatarCircle}>
                    <Image source={{ uri: user?.avatar }} style={styles.avatarImage} />
              </View>
            )}
          </View>

          <View style={{ marginTop: 30, gap: 2 }}>
            <ThemedText type='subtitle' colorName='accentPrimary'>{user?.fullName}</ThemedText>
            <ThemedText style={[styles.phone, { color: colors.textTertiary}]}>{user?.email}</ThemedText>
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

          <DrawerItem
            label={capitalize(preference)}
            icon={
              <Feather
                name={
                  preference === 'system'
                    ? 'smartphone'
                    : preference === 'light'
                    ? 'sun'
                    : 'moon'
                }
                size={20}
                color={colors.text}
              />
            }
            onPress={cyclePreference}
          />

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 54,
    height: 54,
    overflow: 'hidden',
    borderRadius: 62,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
