import { Pressable, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { AntDesign } from "@expo/vector-icons";
import Chart from "./Chart";
import { useRouter } from "expo-router";
import { createThemedStyles } from "@/utils/styles";

const data = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export default function ChartCard(): React.JSX.Element {
  const styles = useThemedStyles();
  const { tint, bgPrimary } = useThemeColors();
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
            onChange={(item) => { setPeriod(item.value) }}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.itemContainer}
            itemTextStyle={styles.selectedText}
            activeColor={bgPrimary}
            renderRightIcon={() => (<AntDesign name="down" size={9} color={tint} />)}
            style={styles.input}
          />

          <Pressable onPress={() => router.navigate('/order')}>
              <ThemedText colorName='accentPrimary' style={styles.actionBtn}>See Details</ThemedText>
          </Pressable>
        </View>

        {/* Chart */}
        <View style={{ paddingRight: 20, }}><Chart period={period} /></View>
    </ThemedView>
  )
}

const useThemedStyles = createThemedStyles(({ bgSecondary, textPrimary, textTertiary, borderDark, borderLight }) => ({
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
    fontWeight: 500,
    fontSize: 14,
  },
  orderCount: {
    fontSize: 20,
    fontWeight: 700,
  },
  dropdownContainer: {
    borderColor: borderDark
  },
  placeholder: {
    color: textTertiary,
    fontSize: 12,
  },
  selectedText: {
    color: textPrimary,
    fontSize: 12,
  },
  itemContainer: {
    backgroundColor: bgSecondary,
  },
  actionBtn: {
    fontSize: 13,
  },
  input: {
    width: 82,
    height: 28,
    borderColor: borderLight,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderRadius: 8,
  },
}));