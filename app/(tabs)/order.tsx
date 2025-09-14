import { orders as data } from '@/api/mockApi';
import HorizontalPizzaCard from '@/components/HorizontalPizzaCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createThemedStyles } from '@/utils/styles';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

type TabKey = 'ongoing' | 'incoming' | 'completed';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'incoming', label: 'Incoming' },
  { key: 'completed', label: 'Completed' },
];

export default function OrderScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const [activeTab, setActiveTab] = useState<TabKey>('ongoing');
  const [orders, setOrders] = useState<any[]>([]);

  const getOrders = useCallback(() => {
    setOrders(data.filter(o => o.status === activeTab));
  }, [activeTab]);

  useEffect(() => {
    getOrders();
  }, [getOrders])

  return (
    <SafeAreaView style={styles.container}>
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

      <ThemedView style={{ paddingHorizontal: 20 }}>
        <HorizontalPizzaCard orders={orders} activeTab={activeTab} />
      </ThemedView>
    </SafeAreaView>
  );
}

const useThemedStyles = createThemedStyles(({ bgPrimary, accentPrimary, borderLight,  }) => ({
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
}))
