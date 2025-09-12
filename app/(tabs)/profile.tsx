import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} colorName="bgPrimary">
        <ThemedText type="title" colorName="accentPrimary">
          Profile
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
