import { useThemeColors } from "@/hooks/useThemeColors";
import { createThemedStyles } from "@/utils/styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Variants({ variants, onAdd, onEdit, onDelete }: VariantProps): React.JSX.Element {
  const styles = useThemedStyles();
  const { tint } = useThemeColors();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <ThemedText colorName="textPrimary">Variants</ThemedText>
            <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
                <ThemedText style={styles.addBtnText}>Add Variant</ThemedText>
            </TouchableOpacity>
        </View>

        <View style={styles.variantsContainer}>
            {variants.map((variant) => (
                <View key={variant.id} style={styles.variantRow}>
                    <View style={styles.leftSide}>
                        <ThemedText style={styles.bullet}>○</ThemedText>
                        <ThemedText colorName="textPrimary" style={styles.variantProp}>{variant.size}</ThemedText>
                    </View>

                    <View style={styles.rightSide}>
                        <ThemedText colorName="textPrimary" style={styles.variantProp}>PKR {variant.price}</ThemedText>
                        <Pressable onPress={() => onEdit(variant.id)}>
                            <Feather name="edit" size={17} color={tint} />
                        </Pressable>
                        <Pressable onPress={() => onDelete(variant.id)}>
                            <MaterialIcons name="delete-outline" size={20} color={tint} />
                        </Pressable>
                    </View>
                </View>
            ))}
        </View>
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ accentPrimary }) => ({
    addBtn: {
        paddingVertical: 6,
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
    variantsContainer: {
        gap: 8,
        marginTop: 10,
      },
    variantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap:4,
    },
    bullet: {
        fontSize: 12,
        marginRight: 6,
        color: accentPrimary,
      },

    variantProp: {
        fontSize: 14,
        marginRight: 3,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

}))