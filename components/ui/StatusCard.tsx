import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet } from 'react-native';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

export default function StatusCard({
  statusText,
  status,
  isLoading,
}: {
  statusText: string;
  status: number;
  isLoading: boolean;
}): React.JSX.Element {
  const displayValue = useCounterAnimation(status, isLoading);

  return (
    <ThemedView style={styles.statusCard} colorName="bgSecondary">
      <ThemedText type="title" style={styles.status}>
        {displayValue}
      </ThemedText>
      <ThemedText colorName="textSecondary" style={styles.staticText}>
        {statusText}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    flex: 1,
    height: 128,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'flex-end'
  },
  status: {
    fontSize: 52,
  },
  staticText: {
    fontSize: 13,
    textTransform: 'uppercase',
    fontFamily: 'Sen_600SemiBold',
  }
});