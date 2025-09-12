import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useCallback, useEffect, useState } from 'react';
import HorizontalPizzaCard from '@/components/HorizontalPizzaCard';
import { orders as data } from '@/api/mockApi';

type TabKey = 'ongoing' | 'incoming' | 'completed';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'incoming', label: 'Incoming' },
  { key: 'completed', label: 'Completed' },
];

export default function OrderScreen(): React.JSX.Element {
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState<TabKey>('ongoing');
  const [orders, setOrders] = useState<any[]>([]);

  const getOrders = useCallback(() => {
    setOrders(data.filter(o => o.status === activeTab));
  }, [activeTab]);

  useEffect(() => {
    getOrders();
  }, [getOrders])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      {/* Tab Navbar */}
      <View style={styles.tabsGroup} accessibilityRole="tablist">
        {TABS.map(tab => {
          const selected = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              style={() => [
                styles.tab,
                { borderBottomColor: colors.borderLight },
                selected && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.accentPrimary,
                }
              ]}
            >
              <Text style={[styles.tabText, { color: colors.textMuted },
                selected && { color: colors.accentPrimary }]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ThemedView style={{ paddingHorizontal: 20 }}>
        <HorizontalPizzaCard orders={orders} activeTab={activeTab} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 0.5,
  },
  tabText: {
    fontSize: 14,
  },
});
