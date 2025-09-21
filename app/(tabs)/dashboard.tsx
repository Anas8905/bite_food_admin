import { ThemedView } from '@/components/ThemedView';
import ChartCard from '@/components/ui/ChartCard';
import PizzaCarousel from '@/components/ui/PizzaCarousel';
import ReviewCard from '@/components/ui/ReviewCard';
import StatusCard from '@/components/ui/StatusCard';
import { useOrderStore } from '@/stores/order';
import { usePizzaStore } from '@/stores/pizza';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function DashboardScreen(): React.JSX.Element {
  const { getPopularPizzas } = usePizzaStore();
  const {
    getOrdersByStatus,
    getBulkOrdersCount,
    getReviewsCount,
    getHighestReviewValue,
  } = useOrderStore();
  const [data, setData] = useState<{
    popularPizzas: Pizza[];
    allOrdersCount: number;
    reviewsCount: number;
    highestReview: number;
    ongoing: Order[];
    incoming: Order[];
  }>({
    popularPizzas: [],
    allOrdersCount: 0,
    reviewsCount: 0,
    highestReview: 0,
    ongoing: [],
    incoming: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        popPizzas,
        ordersCount,
        reviewsCount,
        highestReview,
        ongoingOrders,
        incomingOrders,
      ] = await Promise.all([
        getPopularPizzas(),
        getBulkOrdersCount(),
        getReviewsCount(),
        getHighestReviewValue(),
        getOrdersByStatus("ongoing"),
        getOrdersByStatus("incoming"),
      ]);

      setData({
        popularPizzas: popPizzas,
        allOrdersCount: ordersCount,
        reviewsCount,
        highestReview,
        ongoing: ongoingOrders,
        incoming: incomingOrders,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
        setIsLoading(false);
    }
  }, [
    getOrdersByStatus,
    getBulkOrdersCount,
    getReviewsCount,
    getHighestReviewValue,
    getPopularPizzas,
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container} colorName="bgPrimary">

          {/* Status Cards */}
          <ThemedView style={styles.statusContainer}>
            <StatusCard
              statusText="Running Orders"
              status={data.ongoing.length}
              isLoading={isLoading}
            />
            <StatusCard
              statusText="Order Requests"
              status={data.incoming.length}
              isLoading={isLoading}
            />
          </ThemedView>

          {/* Graph Card */}
          <ChartCard count={data.allOrdersCount} isLoading={isLoading} />

          {/* Review Card */}
          <ReviewCard count={data.reviewsCount} highestReview={data.highestReview} isLoading={isLoading} />

          {/* Popular Pizza Card */}
          <PizzaCarousel popularPizzas={data.popularPizzas} isLoading={isLoading} />

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
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
