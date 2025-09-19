import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from "expo-router";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

export default function ReviewCard({ count, isLoading }: { count: number; isLoading: boolean; }): React.JSX.Element {
    const { tint } = useThemeColors();
    const router = useRouter();
    const displayValue = useCounterAnimation(count, isLoading);

  return (
    <ThemedView colorName="bgSecondary" style={styles.reviewCard}>
        <View style={styles.header}>
            <ThemedText style={{ fontSize: 14, }}>Reviews</ThemedText>
            <Pressable onPress={() => router.navigate('/reviews')}>
                <ThemedText colorName='accentPrimary' style={styles.actionBtn}>See All Reviews</ThemedText>
            </Pressable>
        </View>

        <View style={styles.content}>
            <View style={styles.lefside}>
                <FontAwesome name="star" size={22} color={tint} />
                <ThemedText type='subtitle' colorName="accentPrimary">4.9</ThemedText>
            </View>
            <ThemedText style={styles.rightside}>Total {displayValue} Reviews</ThemedText>
        </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  reviewCard: {
    borderRadius: 20,
    padding: 16,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
  },
  actionBtn: {
    fontSize: 13,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  lefside: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rightside: {
    fontSize: 14,
    fontWeight: 500,
  },
});