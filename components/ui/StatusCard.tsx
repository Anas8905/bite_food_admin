import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet } from 'react-native';

export default function StatusCard({ statusText, status }: {
    statusText: string; status: number;
}): React.JSX.Element {
    return (
        <ThemedView style={styles.statusCard} colorName="bgSecondary">
            <ThemedText type='title' style={styles.status}>{status}</ThemedText>
            <ThemedText colorName='textSecondary' style={styles.staticText}>{statusText}</ThemedText>
        </ThemedView>
  )
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
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});