import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function ReviewCard(): React.JSX.Element {
    const { tint } = useThemeColors();

  return (
    <ThemedView colorName="bgSecondary" style={styles.reviewCard}>
        <View style={styles.header}>
            <ThemedText style={{ fontSize: 13, }}>Reviews</ThemedText>
            <Pressable>
                <ThemedText colorName='accentPrimary' style={styles.actionBtn}>See All Reviews</ThemedText>
            </Pressable>
        </View>

        <View style={styles.content}>
            <View style={styles.lefside}>
                <FontAwesome name="star" size={24} color={tint} />
                <ThemedText type='subtitle' colorName="accentPrimary">4.9</ThemedText>
            </View>
            <ThemedText style={styles.rightside}>Total 20 Reviews</ThemedText>
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
    fontSize: 16,
  },
});