import EmptyIcon from '@/assets/images/empty.svg';
import HorizontalPizzaCard from '@/components/HorizontalPizzaCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyState from '@/components/ui/EmptyState';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useOrderStore } from '@/stores/order';
import { createThemedStyles } from '@/utils/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, View } from 'react-native';

type TabKey = 'ongoing' | 'incoming' | 'completed';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'incoming', label: 'Incoming' },
  { key: 'completed', label: 'Completed' },
];

export default function OrdersScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const { tint } = useThemeColors();
  const [activeTab, setActiveTab] = useState<TabKey>('ongoing');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getOrdersByStatus, orders: allOrders } = useOrderStore();

  const orders = useMemo(() => {
    return allOrders.filter(order => order.status === activeTab);
  }, [allOrders, activeTab]);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      await getOrdersByStatus(activeTab);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, getOrdersByStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders])

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs Group */}
      <View style={styles.tabsGroup} accessibilityRole="tablist">
        {TABS.map(tab => {
          const selected = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              style={[styles.tab, selected && styles.activeTab]}
            >
              <ThemedText
                colorName='textMuted'
                style={[styles.tabText, selected && styles.activeTabText]}>
                {tab.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <ThemedView style={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={styles.activeTabText.color}
            />
            <ThemedText
              colorName='textMuted'
              style={styles.loadingText}
            >
              Loading {activeTab} orders...
            </ThemedText>
          </View>
        ) : (
          orders.length > 0 ? (
            <View style={styles.ordersContainer}>
              <HorizontalPizzaCard orders={orders} activeTab={activeTab} />
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <EmptyState
                icon={<EmptyIcon width={80} height={80} color={tint} />}
                title='No orders'
                message={`No ${activeTab} orders found.`}
              />
            </View>
          )
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const useThemedStyles = createThemedStyles(({ bgPrimary, accentPrimary, borderLight }) => ({
  container: {
    flex: 1,
    backgroundColor: bgPrimary,
  },
  tabsGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: borderLight,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: accentPrimary,
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: accentPrimary,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  ordersContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 90,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
}))
