import { ThemedView } from '@/components/ThemedView';
import ChartCard from '@/components/ui/ChartCard';
import PizzaCard from '@/components/ui/PizzaCard';
import ReviewCard from '@/components/ui/ReviewCard';
import StatusCard from '@/components/ui/StatusCard';
import { usePizzaStore } from '@/stores/pizza';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function DashboardScreen(): React.JSX.Element {
  const { getOrdersByStatus } = usePizzaStore();
  const [ongoing, setOngoing] = useState<Order[]>([]);
  const [incoming, setIncoming] = useState<Order[]>([]);

  useEffect(() => {
     setOngoing(getOrdersByStatus("ongoing"));
     setIncoming(getOrdersByStatus("incoming"));
  }, [getOrdersByStatus]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} colorName="bgPrimary">

         {/* Status Cards */}
        <ThemedView style={styles.statusContainer}>
          <StatusCard
            statusText="Running Orders"
            status={ongoing.length}
          />
          <StatusCard
            statusText="Order Requests"
            status={incoming.length}
          />
        </ThemedView>

        {/* Graph Card */}
        <ChartCard />

        {/* Review Card */}
        <ReviewCard />

        {/* Popular Pizza Card */}
        <PizzaCard />

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
    padding: 20,
    gap: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 16,
  },
});
