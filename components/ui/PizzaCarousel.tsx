import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useRouter } from "expo-router";

export default function PizzaCarousel({ popularPizzas, isLoading }: { popularPizzas: Pizza[]; isLoading: boolean; }): React.JSX.Element {
  const { tint } = useThemeColors();
  const router = useRouter();

  return (
    <ThemedView colorName="bgSecondary" style={styles.card}>
      <View style={styles.header}>
        <ThemedText style={{ fontSize: 14, }}>Popular Pizzas This Week</ThemedText>
          <Pressable onPress={() => router.navigate('/menu')}>
              <ThemedText colorName='accentPrimary' style={styles.actionBtn}>See All</ThemedText>
          </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.fallback}>
          <ActivityIndicator size='large' color={tint} />
          <ThemedText style={styles.fallbackText}>
            Loading popular pizzas...
          </ThemedText>
        </View>
      ) : (
        popularPizzas.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          >
            {popularPizzas.map((pizza) => (
              <Image key={pizza.id} source={pizza.image} style={styles.image} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.fallback}>
            <ThemedText style={styles.fallbackText}>No popular pizzas</ThemedText>
          </View>
        )
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  actionBtn: {
    fontSize: 13,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.5,
  },
});