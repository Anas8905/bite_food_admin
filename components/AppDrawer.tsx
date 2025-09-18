import ProfileIcon from '@/assets/images/profile.svg';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useThemePreference } from '@/hooks/useThemePreference';
import { isAndroid } from '@/utils/common.utils';
import { createThemedStyles } from '@/utils/styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDrawer } from '../hooks/useDrawer';
import { ThemedText } from './ThemedText';
import CustomDrawer from './ui/CustomDrawer';

const themeOptions: ThemeOption[] = [
  { label: 'Device', value: 'device', icon: 'smartphone' },
  { label: 'Light', value: 'light', icon: 'sun' },
  { label: 'Dark', value: 'dark', icon: 'moon' },
];

export default function AppDrawer(): React.JSX.Element {
  const styles = useThemedStyles();
  const { textPrimary, dropdownItemBg } = useThemeColors();
  const { preference, setPreference } = useThemePreference();
  const { isOpen, closeDrawer } = useDrawer();
  const { user, logout } = useAuth();

  const DrawerHeader = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={closeDrawer} style={styles.closeBtn}>
          <Ionicons name="close" size={18} color={textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        {user?.avatar && (
          <View style={styles.avatarCircle}>
                <Image source={{ uri: user?.avatar }} style={styles.avatarImage} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <ThemedText
            style={styles.userName}
            colorName='accentPrimary'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {user?.fullName}
          </ThemedText>
          <ThemedText
            style={styles.phone}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {user?.email}
          </ThemedText>
        </View>
      </View>
    </View>
  )

  const DrawerItem = ({ label, icon, onPress }: {
    label: string;
    icon?: React.ReactNode;
    onPress?: () => void;
  }) => {
    const styles = useThemedStyles();
    return (
      <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
        {icon ? <View>{icon}</View> : null}
        <ThemedText style={styles.drawerItemText}>{label}</ThemedText>
      </TouchableOpacity>
    );
  }

  const themeIcon = () => {
    const current = themeOptions.find(t => t.value === preference);
    return (
      <View style={{ marginRight: 8 }}>
        <Feather
          name={current?.icon ?? 'smartphone'}
          size={20}
          color={textPrimary}
        />
      </View>
    );
  }

  const renderThemeOptions = (item: ThemeOption) => (
    <View style={styles.dropdownItem}>
      <Feather
        name={item.icon}
        size={18}
        color={textPrimary}
        style={{ marginRight: 8 }}
      />
      <ThemedText style={{ color: textPrimary }}>{item.label}</ThemedText>
    </View>
  )

  const DrawerContent = ({ close }) => (
    <View style={styles.itemsWrapper}>

      <DrawerItem
        label="Profile"
        icon={<ProfileIcon width={18} height={18} color={textPrimary} />}
        onPress={() => {
          router.navigate('/profile');
          close();
        }}
      />

      <DrawerItem
        label="Reviews"
        icon={<Feather name="star" size={20} color={textPrimary} />}
        onPress={() => {
          router.navigate('/reviews');
          close();
        }}
      />

      <Dropdown
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.drawerItemText}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        activeColor={dropdownItemBg}
        data={themeOptions}
        labelField="label"
        valueField="value"
        value={preference}
        renderLeftIcon={themeIcon}
        renderItem={renderThemeOptions}
        onChange={(item) => {
          setPreference(item.value as 'device' | 'light' | 'dark');
        }}
      />
    </View>
  )

  const DrawerFooter = () => (
    <View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Feather name="log-out" size={20} color={textPrimary} />
        <ThemedText style={styles.drawerItemText}>Logout</ThemedText>
      </TouchableOpacity>
    </View>
  );

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
      duration={400}
      renderHeader={DrawerHeader}
      renderContent={DrawerContent}
      renderFooter={DrawerFooter}
    />
  );
}

const useThemedStyles = createThemedStyles(({
  bgGray,
  textPrimary,
  textTertiary,
  borderLight,
  dropdownBg,
}) => ({
  container: {
    marginTop: isAndroid ? 40 : 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeBtn: {
    backgroundColor: bgGray,
    width: 36,
    height: 36,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
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
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 600,
  },
  phone: {
    color: textTertiary,
    fontSize: 14,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drawerItemText: {
    color: textPrimary,
    fontWeight: '500',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  itemsWrapper: {
    marginTop: 10,
    gap: 36,
  },
  placeholder: {
    color: textTertiary,
  },
  dropdownContainer: {
    borderColor: borderLight,
  },
  itemContainer: {
    backgroundColor: dropdownBg,
  },
  itemText: {
    color: textPrimary,
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
}))
