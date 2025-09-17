import { createThemedStyles } from '@/utils/styles';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import BackButton from './ui/BackButton';

type PizzaFormNavbarProps = {
  title: string;
  onReset: () => void;
};

export default function LocalNavbar({ title, onReset }: PizzaFormNavbarProps): React.JSX.Element {
  const styles = useThemedStyles();
  return (
    <ThemedView style={styles.navbar}>
      {/* Left side */}
      <ThemedView style={styles.leftSide}>
        <BackButton />
        <ThemedText type="defaultSemiBold" colorName="accentPrimary">{title}</ThemedText>
      </ThemedView>

      {/* Right side */}
      <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
        <ThemedText style={styles.resetBtnText}>RESET</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const useThemedStyles = createThemedStyles(({ bgGray, accentPrimary }) => ({
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
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: accentPrimary,
  },
  resetBtnText: {
    fontSize: 12,
    color: accentPrimary,
  },
}));
