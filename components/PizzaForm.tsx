import { TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { createThemedStyles } from "@/utils/styles";
import { useEffect, useState } from "react";
import { usePizzaStore } from "@/stores/pizza";


export default function PizzaForm({ categoryId, pizzaId }: { categoryId?: string; pizzaId?: string; }): React.JSX.Element {
  const styles = useThemedStyles();
  const { getCategoryById, getPizzaById } = usePizzaStore();
  const [categoryName, setCategoryName] = useState<string>("");
  const [pizzaName, setPizzaName] = useState<string>("");

    useEffect(() => {
      if (pizzaId) {
        const pizza = getPizzaById(pizzaId);
        if (pizza) {
          setPizzaName(pizza.name);
        }
      }
    }, [pizzaId, getPizzaById]);

    useEffect(() => {
      if (categoryId) {
        const category = getCategoryById(categoryId);
        if (category) {
          setCategoryName(category.name);
        }
      }
    }, [categoryId, getCategoryById]);

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
          <ThemedText style={styles.label}>ITEM NAME</ThemedText>
          <TextInput
              value={pizzaName}
              onChangeText={setPizzaName}
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.input}
              placeholder="Enter pizza name"
          />
      </View>
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, borderLight, textPrimary, accentPrimary, bgGray }) => ({
  header: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: textPrimary,
  },
  input: {
    backgroundColor: bgPrimary,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderLight,
    color: textPrimary,
    fontSize: 16,
  },
}))