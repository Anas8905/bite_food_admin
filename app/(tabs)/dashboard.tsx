import { ThemedView } from '@/components/ThemedView';
import ChartCard from '@/components/ui/ChartCard';
import PizzaCard from '@/components/ui/PizzaCard';
import ReviewCard from '@/components/ui/ReviewCard';
import StatusCard from '@/components/ui/StatusCard';
import { usePizzaStore } from '@/stores/pizza';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function DashboardScreen(): React.JSX.Element {
  const { getOrdersByStatus, getBulkOrdersCount } = usePizzaStore();
  const [allOrdersCount, setAllOrdersCount] = useState<number>(0);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [ongoing, setOngoing] = useState<Order[]>([]);
  const [incoming, setIncoming] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);

      try {
        const ordersCount = await getBulkOrdersCount();
        const reviewsCount = await getBulkOrdersCount();
        const ongoingOrders = await getOrdersByStatus("ongoing");
        const incomingOrders = await getOrdersByStatus("incoming");

        setAllOrdersCount(ordersCount);
        setReviewsCount(reviewsCount);
        setOngoing(ongoingOrders);
        setIncoming(incomingOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [getOrdersByStatus, getBulkOrdersCount]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} colorName="bgPrimary">

         {/* Status Cards */}
        <ThemedView style={styles.statusContainer}>
          <StatusCard
            statusText="Running Orders"
            status={ongoing.length}
            isLoading={isLoading}
          />
          <StatusCard
            statusText="Order Requests"
            status={incoming.length}
            isLoading={isLoading}
          />
        </ThemedView>

        {/* Graph Card */}
        <ChartCard count={allOrdersCount} isLoading={isLoading} />

        {/* Review Card */}
        <ReviewCard count={reviewsCount} isLoading={isLoading} />

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
