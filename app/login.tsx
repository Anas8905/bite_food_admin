import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} colorName="bgSecondary">
        <ThemedText type="title" colorName="accentPrimary">
          Login
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
