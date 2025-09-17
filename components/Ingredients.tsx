import { useThemeColors } from "@/hooks/useThemeColors";
import { createThemedStyles } from "@/utils/styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Ingredients({ ingredients, onAdd, onDelete }: IngredientsProps): React.JSX.Element {
  const styles = useThemedStyles();
  const { textPrimary } = useThemeColors();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <ThemedText colorName="textPrimary">Ingredients</ThemedText>
            <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
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
                    onPress={() => onDelete(ingrd.id)}
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
        alignItems: 'center',
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