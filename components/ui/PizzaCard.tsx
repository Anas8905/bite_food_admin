import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useEffect, useState } from "react";
import { mockPizzaAPI } from "@/api/mockApi";

export default function PizzaCard(): React.JSX.Element {
  const [popularPizzas, setPopularPizzas] = useState<any[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      const pizzas = await mockPizzaAPI.popularPizzas();
      setPopularPizzas(pizzas);
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        {popularPizzas.length > 0 && (
          popularPizzas.map(pizza => (
            <Image
            key={pizza.id}
            source={pizza.image}
            style={styles.image}
          />
          ))
        )}
      </ScrollView>
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
});