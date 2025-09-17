import { useAlert } from "@/hooks/useAlert";
import { useInputAlert } from "@/hooks/useInputAlert";
import { useThemeColors } from "@/hooks/useThemeColors";
import { createThemedStyles } from "@/utils/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Ingredients(): React.JSX.Element {
  const styles = useThemedStyles();
  const { textPrimary } = useThemeColors();
  const { showInputAlert } = useInputAlert();
  const { showAlert, hideAlert } = useAlert();

  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Peri Peri Sauce' },
    { id: '2', name: 'Cheese' },
    { id: '3', name: 'Olives' },
  ]);

  const addIngredient = () => {
    showInputAlert(
      "Add Ingredient",
      "Enter an ingredient name you want to add:",
      {
        placeholder: "Peppers",
        onSubmit: (ingrd) => {
          ingrd = ingrd.trim();

          if (!ingrd) return;

          const normalized = ingrd.toLowerCase();

          if (ingredients.some((i) => i.name.toLowerCase() === normalized)) {
            showAlert(
              "Duplicate Ingredient",
              "The entered ingredient already exists.",
              [{ text: "OK", style: "default" }]
            );
            return;
          }

          setIngredients((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              name: ingrd,
            },
          ]);

          hideAlert();
        },
      }
    );
  };


  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <ThemedText colorName="textPrimary">Ingredients</ThemedText>
            <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
                <ThemedText style={styles.addBtnText}>Add Ingredient</ThemedText>
            </TouchableOpacity>
        </View>

        <View style={styles.ingrdPillContainer}>
            {ingredients.map((ingrd) => (
                <View key={ingrd.id} style={styles.ingrdPill}>
                <ThemedText colorName="textPrimary" style={styles.ingrdName}>{ingrd.name}</ThemedText>
                <Ionicons
                    name="close"
                    size={18}
                    color={textPrimary}
                    onPress={() =>
                    setIngredients((prev) => prev.filter((i) => i.id !== ingrd.id))
                    }
                />
                </View>
            ))}
        </View>
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ textMuted, accentPrimary, bgGray }) => ({
    addBtn: {
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: accentPrimary,
    },
    addBtnText: {
        fontSize: 12,
        color: accentPrimary,
    },
    container: {
        gap: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingrdPillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 6,
      },
    ingrdPill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap:16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: textMuted,
        backgroundColor: bgGray,
        alignSelf: 'flex-start',
    },
    ingrdName: {
        fontSize: 14,
    },

}))