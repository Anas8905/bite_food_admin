import { useDrawer } from '@/hooks/useDrawer';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MenuIcon from '@/assets/images/menu.svg';
import LogoIcon from '@/assets/images/Ratatouille.svg';
import { ThemedView } from '../ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from '../ThemedText';
import { useSegments } from 'expo-router';

export default function Navbar(): React.JSX.Element{
  const { openDrawer } = useDrawer();
  const colors = useThemeColors();
  const segments = useSegments();
  const screenName = segments[segments.length - 1]?.toUpperCase() ?? "";

  return (
    <ThemedView style={styles.navbar}>
      {/* Left side */}
      <ThemedView style={styles.leftSide}>
        <TouchableOpacity
          onPress={openDrawer}
          style={[
            styles.circleButton,
            { backgroundColor: colors.greyBg }
          ]}
        >
          <MenuIcon width={46} height={46} color={colors.textPrimary} />
        </TouchableOpacity>
        <ThemedText type='defaultSemiBold' colorName='accentPrimary'>
          {screenName}
        </ThemedText>
      </ThemedView>

      {/* Right side */}
      <LogoIcon width={100} height={100} color={colors.textPrimary} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerText: {
    alignItems: 'center',
    minWidth: 94,
  },
});

