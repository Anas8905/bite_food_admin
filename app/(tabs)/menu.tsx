import CategoryTabs from '@/components/CategoryTabs';
import CustomPizzaCard from '@/components/CustomPizzaCard';
import DisableUI from '@/components/DisableUI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ConfigIcons from '@/components/ui/ConfigIcons';
import { useAlert } from '@/hooks/useAlert';
import { useThemeColors } from '@/hooks/useThemeColors';
import { usePizzaStore } from '@/stores/pizza';
import { createThemedStyles } from '@/utils/styles';
import { SafeAreaView, SectionList, StyleSheet, View } from 'react-native';

export default function MenuScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const { tint, bgPrimary,  } = useThemeColors();
  const { showAlert } = useAlert();
  const {
    sections,
    availableCategories,
    selectedCategories,
    toggleCategory,
    deleteCategory,
    toggleDisableCategory,
    enableCategory,
  } = usePizzaStore();


  const handleDeleteCategory = (id: string, name: string) => {
    showAlert(
      'Delete Category',
      `Are you sure you want to delete the "${name}" category?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCategory(id),
        },
      ]
    );
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
          renderSectionHeader={({ section: { title, data, disabled } }) => {
            return (
              <View>
                {/* Header */}
                <View style={styles.header}>
                  <ThemedText colorName="textPrimary" style={styles.section}>
                    {title}
                  </ThemedText>
                  <ConfigIcons
                    key={title}
                    tint={tint}
                    bgColor={tint}
                    foreColor={bgPrimary}
                    onDisable={() => toggleDisableCategory(
                      availableCategories().find((c) => c.name === title)!.id
                    )}
                    onDelete={() =>
                      handleDeleteCategory(
                        availableCategories().find((c) => c.name === title)!.id,
                        title
                      )
                    }
                  />
                </View>

                <View style={{ position: "relative" }}>
                  {/* Cards */}
                    {data.map((pizza) => (
                    <CustomPizzaCard
                      key={pizza.id}
                      pizzas={[pizza]}
                      disabled={disabled}
                    />
                    ))}

                  {/* Disable overlay */}
                  {disabled && (
                    <View style={styles.sectionOverlay}>
                      <DisableUI
                        onPress={() =>
                          enableCategory(
                            availableCategories().find((c) => c.name === title)!.id
                          )
                        }
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
