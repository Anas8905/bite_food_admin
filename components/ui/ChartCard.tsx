import { Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { AntDesign } from "@expo/vector-icons";
import Chart from "./Chart";
import { useRouter } from "expo-router";

const data = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export default function ChartCard(): React.JSX.Element {
  const colors = useThemeColors();
  const router = useRouter();
  const [period, setPeriod] = useState('weekly');

  return (
    <ThemedView colorName="bgSecondary" style={styles.graphCard}>
      {/* Header section */}
        <View style={styles.cardHeader}>
          <View style={styles.orders}>
              <ThemedText style={styles.title}>Total Orders</ThemedText>
              <ThemedText style={styles.orderCount}>246</ThemedText>
          </View>

          <Dropdown
            data={data}
            labelField="label"
            valueField="value"
            value={period}
            onChange={(item) => {
              setPeriod(item.value);
            }}
            placeholderStyle={{ color: colors.textSecondary, fontSize: 12, }}
            containerStyle={{ borderColor: colors.borderDark }}
            selectedTextStyle={{ color: colors.textPrimary, fontSize: 12, }}
            activeColor={colors.bgPrimary}
            itemTextStyle={{ color: colors.textPrimary, fontSize: 12, }}
            itemContainerStyle={{ backgroundColor: colors.bgSecondary }}
            renderRightIcon={() => (
              <AntDesign name="down" size={9} color={colors.tint} />
            )}
            style={[styles.input, { borderColor: colors.borderLight }]}
          />

          <Pressable onPress={() => router.navigate('/order')}>
              <ThemedText colorName='accentPrimary' style={styles.actionBtn}>See Details</ThemedText>
          </Pressable>
        </View>

        {/* Chart */}
        <View style={{ paddingRight: 20, }}>
          <Chart period={period} />
        </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  graphCard: {
    borderRadius: 20,
    paddingVertical: 16,
    position: 'relative'
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  orders: {
    gap: 4,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
  },
  orderCount: {
    fontSize: 20,
    fontWeight: 700,
  },
  actionBtn: {
    fontSize: 13,
  },
  input: {
    width: 82,
    height: 28,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderRadius: 8,
  },
});