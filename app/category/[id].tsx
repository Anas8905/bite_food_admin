import EmptyIcon from '@/assets/images/empty.svg';
import CustomPizzaCard from "@/components/CustomPizzaCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import EmptyState from "@/components/ui/EmptyState";
import { useAlert } from "@/hooks/useAlert";
import { useInputAlert } from "@/hooks/useInputAlert";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useConfigIconsStore } from "@/stores/configIcons";
import { usePizzaStore } from "@/stores/pizza";
import { createThemedStyles } from "@/utils/styles";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";

export default function CategoryScreen(): React.JSX.Element {
  const { id: categoryId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const styles = useThemedStyles();
  const { tint, bgPrimary, textPrimary } = useThemeColors();
  const {
    getCategoryById,
    getPizzasByCategoryId,
    updateCategory,
    deletePizza,
    toggleDisablePizza,
    enablePizza,
  } = usePizzaStore();
  const { showInputAlert } = useInputAlert();
  const { showAlert } = useAlert();
  const { resetAllExpanded } = useConfigIconsStore();
  const [categoryName, setCategoryName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAllExpanded();
      };
    }, [resetAllExpanded])
  );

  useEffect(() => {
    if (categoryId) {
      const category = getCategoryById(categoryId);
      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [categoryId, getCategoryById]);

  const handleSave = () => {
    const trimmed = categoryName.trim();
    if (!categoryId || !trimmed) return;

    setIsSaving(true);
    try {
      const success = updateCategory(categoryId, trimmed);

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
    showInputAlert(
      'Delete Item',
      `Please type the item name "${pizzaName}" to confirm:`,
      {
        placeholder: pizzaName,
        submitText: 'Delete',
        submitStyle: 'destructive',
        onSubmit: (enteredName) => {
          if(!enteredName.trim()) return;

          if (enteredName === pizzaName) {
            deletePizza(pizzaId);
            return showAlert(
              'Success',
              `Item "${pizzaName}" has been deleted successfully.`,
              [{ text: 'OK', style: 'default' }]
            );
          } else {
            return showAlert(
              'Deletion Failed',
              'The entered name does not match the item name.',
              [{ text: 'OK', style: 'default' }]
            );
          }
        },
        onCancel: () => {}
      }
    );
  };

  const categoryPizzas = categoryId ? getPizzasByCategoryId(categoryId) : [];

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
            {categoryPizzas.length > 0 ? (
              <>
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
                        onDisable: () => toggleDisablePizza(pizza.id),
                        onEnable: () => enablePizza(pizza.id),
                        onEdit: () => router.push(`/pizza/edit/${pizza.id}`),
                        onDelete: () => handleDeletePizza(pizza.id, pizza.name),
                      }}
                    />
                  ))}
                </ScrollView>
              </>
              ) : (
                <View style={styles.emptyStateWrapper}>
                  <EmptyState
                    icon={<EmptyIcon width={80} height={80} color={tint} />}
                    title="No items"
                    message="To add a new item, click the 'Add New Item' button at the top right corner."
                  />
                </View>
              )}
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
  emptyStateWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
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