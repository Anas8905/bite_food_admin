import { mockPizzaAPI } from "@/api/mockApi";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function PizzaCard(): React.JSX.Element {
  const [popularPizzas, setPopularPizzas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accentPrimary } = useThemeColors();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const pizzas = await mockPizzaAPI.popularPizzas();
        setPopularPizzas(pizzas);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <ThemedView colorName="bgSecondary" style={styles.card}>
      <View style={styles.header}>
        <ThemedText style={{ fontSize: 14, }}>Popular Pizzas This Week</ThemedText>
          <Pressable>
              <ThemedText colorName='accentPrimary' style={styles.actionBtn}>See All</ThemedText>
          </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={accentPrimary} />
          <ThemedText style={styles.loadingText}>
            Loading popular pizzas...
          </ThemedText>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          {popularPizzas.map((pizza) => (
            <Image key={pizza.id} source={pizza.image} style={styles.image} />
          ))}
        </ScrollView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: {
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.5,
  },
});