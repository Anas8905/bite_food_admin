import { createThemedStyles } from "@/utils/styles";
import { Pressable, ScrollView, View } from "react-native";
import { ThemedText } from "./ThemedText";

type CategoryTabsProps = {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  categories: Category[];
};

export default function CategoryTabs({
  selectedCategories,
  toggleCategory,
  categories,
}: CategoryTabsProps): React.JSX.Element {
  const styles = useThemedStyles();

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catContainer}
      >
        {/* All tab */}
        <Pressable
          key="all"
          style={[
            styles.catBaseTab,
            selectedCategories.includes("All") && styles.catActiveTab,
          ]}
          onPress={() => toggleCategory("All")}
        >
          <ThemedText
            style={[
              styles.baseTabText,
              selectedCategories.includes("All") && styles.activeTabText,
            ]}
          >
            All
          </ThemedText>
        </Pressable>

        {/* Dynamic categories */}
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.catBaseTab,
              selectedCategories.includes(category.id) && styles.catActiveTab,
            ]}
            onPress={() => toggleCategory(category.id)}
          >
            <ThemedText
              style={[
                styles.baseTabText,
                selectedCategories.includes(category.id) && styles.activeTabText,
              ]}
            >
              {category.name}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const useThemedStyles = createThemedStyles(({ textPrimary, accentPrimary }) => ({
  catContainer: {
    marginTop: 20,
    gap: 20,
  },
  catBaseTab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  catActiveTab: {
    borderBottomWidth: 2,
    borderColor: accentPrimary,
  },
  baseTabText: {
    fontSize: 16,
    fontWeight: 700,
    color: textPrimary,
  },
  activeTabText: {
    color: accentPrimary,
  },
}));