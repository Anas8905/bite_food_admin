import { Text, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { createThemedStyles } from '@/utils/styles';

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

export default function EmptyState({
  icon,
  title,
  message,
  buttonText,
  onButtonPress,
}: EmptyStateProps): React.JSX.Element {
  const styles = useThemedStyles();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.message}>{message}</ThemedText>
      {buttonText && (
        <TouchableOpacity
          style={styles.button}
          onPress={onButtonPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const useThemedStyles = createThemedStyles(({ accentPrimary, textSecondary }) => ({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: accentPrimary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}));
