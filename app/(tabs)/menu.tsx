import EmptyIcon from '@/assets/images/empty.svg';
import CategoryTabs from '@/components/CategoryTabs';
import CustomPizzaCard from '@/components/CustomPizzaCard';
import DisableUI from '@/components/DisableUI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ConfigIcons from '@/components/ui/ConfigIcons';
import EmptyState from '@/components/ui/EmptyState';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useAddCategory } from '@/hooks/useAddCategory';
import { useAlert } from '@/hooks/useAlert';
import { useInputAlert } from '@/hooks/useInputAlert';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useConfigIconsStore } from '@/stores/configIcons';
import { usePizzaStore } from '@/stores/pizza';
import { createThemedStyles } from '@/utils/styles';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, SafeAreaView, SectionList, StyleSheet, View } from 'react-native';

export default function MenuScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const { tint, bgPrimary,  } = useThemeColors();
  const { showAlert } = useAlert();
  const { showInputAlert } = useInputAlert();
  const { resetAllExpanded, resetExpanded } = useConfigIconsStore();
  const { handleAddCategory } = useAddCategory();
  const router = useRouter();
  const {
    sections,
    availableCategories,
    selectedCategories,
    toggleCategory,
    deleteCategory,
    toggleDisableCategory,
    enableCategory,
  } = usePizzaStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAllExpanded();
      };
    }, [resetAllExpanded])
  );

  const hideLoading = () => {
    setIsDeleting(false);
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to refresh menu data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);


  const handleDeleteCategory = (id: string, name: string) => {
    showInputAlert(
      'Delete Menu Category',
      `Please type the category name "${name}" to confirm:`,
      {
      inputs: [
        {
          placeholder: name,
        },
      ],
      submitText: 'Delete',
      submitStyle: 'destructive',
      onSubmit: async (values) => {
        let [enteredName] = values;

        setIsDeleting(true);
        try {
          if (enteredName === name) {
            await deleteCategory(id);
            resetExpanded(`category-${name}`);
            showAlert(
              'Success',
              `Category "${name}" deleted successfully.`,
              [{ text: 'OK', style: 'default', onPress: hideLoading }]
            );
          } else {
            showAlert(
              'Not Found',
              'The entered category does not exist.',
              [{ text: 'OK', style: 'default', onPress: hideLoading }]
            );
          }
        } catch {}
      },
    });
  };

  const hasCategories = sections().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} colorName="bgPrimary">
        {hasCategories ? (
          <>
            {/* Category Tabs */}
            <View style={styles.tabsWrapper}>
              <CategoryTabs
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                categories={availableCategories().map((c) => ({
                  id: c.id,
                  name: c.name,
                }))}
              />
            </View>

            <SectionList
              sections={sections()}
              keyExtractor={(item) => String(item.id)}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  tintColor={tint}
                  colors={[tint]}
                />
              }
              renderSectionHeader={({ section: { categoryId, title, data, disabled } }) => {
                return (
                  <View>
                    {/* Header */}
                    <View style={styles.header}>
                      <ThemedText colorName="textPrimary" style={styles.section}>
                        {title}
                      </ThemedText>
                      <ConfigIcons
                        id={`category-${title}`}
                        key={title}
                        tint={tint}
                        bgColor={tint}
                        foreColor={bgPrimary}
                        onDisable={() => toggleDisableCategory(categoryId)}
                        onEdit={() => router.push(`/category/${categoryId}`)}
                        onDelete={() => handleDeleteCategory(categoryId, title)}
                      />
                    </View>

                    <View style={{ position: "relative" }}>
                      {/* Cards */}
                        {data.length > 0 ? (
                          data.map((pizza) => (
                            <CustomPizzaCard
                              key={pizza.id}
                              pizzas={[pizza]}
                              disabled={disabled}
                            />
                            ))
                        ) : (
                          <EmptyState
                            icon={<EmptyIcon width={60} height={60} color={tint} />}
                            title='No items'
                            message='Press the button below to add an item.'
                            buttonText='Add New Item'
                            onButtonPress={() => router.push(`/pizza/add/${categoryId}`)}
                            disabled={disabled}
                          />
                        )}

                      {/* Disable overlay */}
                      {disabled && (
                        <View style={styles.sectionOverlay}>
                          <DisableUI
                            onPress={() => enableCategory(categoryId)}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                );
              }}
              renderItem={() => null}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <EmptyState
              icon={<EmptyIcon width={80} height={80} color={tint} />}
              title='No menu items'
              message='Start building your menu by adding categories and items.'
              buttonText='Add New Category'
              onButtonPress={handleAddCategory}
              disabled={false}
            />
          </View>
        )}

        {isDeleting && <LoadingOverlay />}

      </ThemedView>
    </SafeAreaView>
  );
}

const useThemedStyles = createThemedStyles(() => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabsWrapper: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  section: {
    fontSize: 24,
    fontFamily: 'Sen_700Bold',
  },
  sectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
}));
