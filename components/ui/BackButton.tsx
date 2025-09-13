import { useThemeColors } from '@/hooks/useThemeColors';
import { createThemedStyles } from '@/utils/styles';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const BackButton = ({ onPress }: { onPress: () => void }): React.JSX.Element => {
  const styles = useThemedStyles();
    const { textSecondary } = useThemeColors();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="chevron-back" size={24} color={textSecondary} />
    </TouchableOpacity>
  );
};

const useThemedStyles = createThemedStyles(({ bgGray  }) => ({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgGray,
    borderRadius: 20,
  },
}));

export default BackButton;