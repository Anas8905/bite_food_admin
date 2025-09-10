import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const BackButton = ({ onPress }: { onPress: () => void }): React.JSX.Element => {
    const colors = useThemeColors();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors.greyIconBg }]} onPress={onPress}>
      <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;