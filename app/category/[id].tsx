import CustomPizzaCard from "@/components/CustomPizzaCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAlert } from "@/hooks/useAlert";
import { useThemeColors } from "@/hooks/useThemeColors";
import { usePizzaStore } from "@/stores/pizza";
import { createThemedStyles } from "@/utils/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";

export default function CategoryScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const styles = useThemedStyles();
  const { tint, bgPrimary, textPrimary } = useThemeColors();
  const { availableCategories, updateCategory, pizzas, deletePizza } = usePizzaStore();
  const { showAlert } = useAlert();
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const category = availableCategories().find(c => c.id === id);
      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [id, availableCategories]);

  const handleSave = () => {
    const trimmed = categoryName.trim();
    if (!id || !trimmed) return;

    setIsSaving(true);
    try {
      const success = updateCategory(id, trimmed);

      if (!success) {
        return showAlert("Error", "Category name already exists or unchanged.");
      }

      return showAlert("Category Updated", "Category has been successfully updated.");
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePizza = (pizzaId: string, pizzaName: string) => {
    showAlert(
      'Delete Pizza',
      `Are you sure you want to delete "${pizzaName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deletePizza(pizzaId),
        },
      ]
    );
  };

  const categoryPizzas = id ? pizzas.filter(pizza => pizza.categoryId === id) : [];

  return (
    <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container} colorName="bgPrimary">
            {/* Header */}
            <View style={styles.header}>
                <ThemedText style={styles.label}>CATEGORY NAME</ThemedText>
                <TextInput
                    value={categoryName}
                    onChangeText={setCategoryName}
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={styles.input}
                    placeholder="Enter category name"
                />
            </View>

            {/* Products Section */}
            <View style={styles.productsSection}>
                <ThemedText type="defaultSemiBold" style={styles.heading}>PRODUCT ITEMS</ThemedText>
                <ScrollView
                    style={styles.productsScrollView}
                    contentContainerStyle={styles.productsScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {categoryPizzas.map((pizza) => (
                        <CustomPizzaCard
                            key={pizza.id}
                            pizzas={[pizza]}
                            configIconsProps={{
                                tint,
                                bgColor: tint,
                                foreColor: bgPrimary,
                                onDelete: () => handleDeletePizza(pizza.id, pizza.name),
                            }}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.cancelBtn]}
                        onPress={() => router.back()}
                        disabled={isSaving}
                    >
                        <ThemedText style={styles.cancelText}>CANCEL</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.saveBtn]}
                        onPress={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <ActivityIndicator color={textPrimary} size={16} />
                        ) : (
                            <ThemedText style={styles.saveText}>SAVE</ThemedText>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

        </ThemedView>
    </SafeAreaView>
  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, borderLight, textPrimary, accentPrimary, bgGray }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
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
  productsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    marginBottom: 10,
  },
  productsScrollView: {
    flex: 1,
  },
  productsScrollContent: {
    paddingBottom: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 30,
  },
  saveBtn: {
    backgroundColor: accentPrimary,
  },
  saveText: {
    fontWeight: 500,
    color: '#FFFFFF',
  },
  cancelBtn: {
    backgroundColor: bgGray,
  },
  cancelText: {
    fontWeight: 500,
    opacity: 0.9
  },
}));