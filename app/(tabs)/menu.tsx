import EmptyIcon from '@/assets/images/empty.svg';
import CategoryTabs from '@/components/CategoryTabs';
import CustomPizzaCard from '@/components/CustomPizzaCard';
import DisableUI from '@/components/DisableUI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ConfigIcons from '@/components/ui/ConfigIcons';
import EmptyState from '@/components/ui/EmptyState';
import { useAlert } from '@/hooks/useAlert';
import { useInputAlert } from '@/hooks/useInputAlert';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useConfigIconsStore } from '@/stores/configIcons';
import { usePizzaStore } from '@/stores/pizza';
import { createThemedStyles } from '@/utils/styles';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { SafeAreaView, SectionList, StyleSheet, View } from 'react-native';

export default function MenuScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const { tint, bgPrimary,  } = useThemeColors();
  const { showAlert } = useAlert();
  const { showInputAlert } = useInputAlert();
  const { resetAllExpanded, resetExpanded } = useConfigIconsStore();
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

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAllExpanded();
      };
    }, [resetAllExpanded])
  );

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
      onSubmit: (values) => {
        let [enteredName] = values;

        if(!enteredName.trim()) return;

        if (enteredName === name) {
          deleteCategory(id);
          resetExpanded(`category-${name}`);
          return showAlert(
            'Success',
            `Category "${name}" has been deleted successfully.`,
            [{ text: 'OK', style: 'default' }]
          );
        } else {
          return showAlert(
            'Not Found',
            'The entered category does not exist.',
            [{ text: 'OK', style: 'default' }]
          );
        }
      },
      onCancel: () => {}
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} colorName="bgPrimary">
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
    marginVertical: 20,
  },
  section: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
}));
