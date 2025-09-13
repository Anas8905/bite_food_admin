import MenuIcon from '@/assets/images/menu.svg';
import LogoIcon from '@/assets/images/Ratatouille.svg';
import { useDrawer } from '@/hooks/useDrawer';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { createThemedStyles } from '@/utils/styles';

export default function Navbar(): React.JSX.Element{
  const styles = useThemedStyles();
  const { textPrimary } = useThemeColors();
  const { openDrawer } = useDrawer();
  const segments = useSegments();
  const screenName = segments[segments.length - 1]?.toUpperCase() ?? "";

  return (
    <ThemedView style={styles.navbar}>
      {/* Left side */}
      <ThemedView style={styles.leftSide}>
        <TouchableOpacity onPress={openDrawer} style={styles.circleButton}>
          <MenuIcon width={46} height={46} color={textPrimary} />
        </TouchableOpacity>
        <ThemedText type='defaultSemiBold' colorName='accentPrimary'>{screenName}</ThemedText>
      </ThemedView>

      {/* Right side */}
      <LogoIcon width={100} height={100} color={textPrimary} />
    </ThemedView>
  );
};

const useThemedStyles = createThemedStyles(({ bgGray }) => ({
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
    backgroundColor: bgGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    alignItems: 'center',
    minWidth: 94,
  },
}));
