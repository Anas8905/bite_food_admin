import EmptyIcon from '@/assets/images/empty.svg';
import CustomPizzaCard from "@/components/CustomPizzaCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import EmptyState from "@/components/ui/EmptyState";
import LoadingOverlay from '@/components/ui/LoadingOverlay';
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
  const { tint, bgPrimary } = useThemeColors();
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
  const { resetAllExpanded, resetExpanded } = useConfigIconsStore();
  const [categoryName, setCategoryName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const hideLoading = () => {
    setIsDeleting(false);
  }

  const handleSave = async () => {
    const trimmed = categoryName.trim();
    if (!categoryId || !trimmed) return;

    try {
      setIsSaving(true);
      const success = await updateCategory(categoryId, trimmed);

      if (!success) {
        return showAlert("Error", "Category name already exists or unchanged.");
      }

      return showAlert("Category Updated", "Category updated successfully.");
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
        inputs: [
          {
            placeholder: pizzaName,
          },
        ],
        submitText: 'Delete',
        submitStyle: 'destructive',
        onSubmit: async (values) => {
          const [enteredName] = values;
          setIsDeleting(true);

          try {
            if (enteredName === pizzaName) {
              await deletePizza(pizzaId);
              resetExpanded(`pizza-${pizzaId}`);
              showAlert(
                'Success',
                `Item "${pizzaName}" deleted successfully.`,
                [{ text: 'OK', style: 'default', onPress: hideLoading }]
              );
            } else {
              showAlert(
                'Deletion Failed',
                'The entered name does not match the item name.',
                [{ text: 'OK', style: 'default', onPress: hideLoading}]
              );
            }
          } catch {}
        },
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
                <View style={styles.saveCatContainer}>
                  <TextInput
                      value={categoryName}
                      onChangeText={setCategoryName}
                      autoCapitalize="words"
                      autoCorrect={false}
                      style={styles.input}
                      placeholder="Enter category name"
                  />
                  <TouchableOpacity
                      style={styles.saveBtn}
                      onPress={handleSave}
                      disabled={isSaving}
                  >
                      {isSaving ? (
                          <ActivityIndicator color={bgPrimary} size={16} />
                      ) : (
                          <ThemedText style={styles.saveText}>SAVE</ThemedText>
                      )}
                  </TouchableOpacity>
                </View>
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
                    message="Press the 'Add New Item' button at the top right corner to add an item."
                  />
                </View>
              )}
            </View>

            {isDeleting && <LoadingOverlay />}

        </ThemedView>
    </SafeAreaView>
  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, borderLight, textPrimary, accentPrimary }) => ({
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
  saveCatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: bgPrimary,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderLight,
    color: textPrimary,
    fontSize: 16,
    fontFamily: 'Sen_400Regular',
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
  saveBtn: {
    alignItems: 'center',
    padding: 15.6,
    width: 80,
    height: 50,
    borderRadius: 8,
    backgroundColor: accentPrimary,
  },
  saveText: {
    fontFamily: 'Sen_500Medium',
    fontSize: 16,
    color: bgPrimary,
  },
}));