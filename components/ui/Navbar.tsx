import MenuIcon from '@/assets/images/menu.svg';
import LogoIcon from '@/assets/images/Ratatouille.svg';
import { useAlert } from '@/hooks/useAlert';
import { useDrawer } from '@/hooks/useDrawer';
import { useInputAlert } from '@/hooks/useInputAlert';
import { useThemeColors } from '@/hooks/useThemeColors';
import { usePizzaStore } from '@/stores/pizza';
import { capitalize } from '@/utils/common.utils';
import { createThemedStyles } from '@/utils/styles';
import { usePathname, useRouter, useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import BackButton from './BackButton';

export default function Navbar({ categoryId }: { categoryId?: string }): React.JSX.Element | null {
  const styles = useThemedStyles();
  const { textPrimary } = useThemeColors();
  const { openDrawer } = useDrawer();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  const isMenuScreen = segments[1] === "menu";
  const isCategoryScreen = segments[0] === "category";
  const isAddNewScreen = segments[0] === "pizza" && segments[1] === "add";
  const isEditScreen = segments[0] === "pizza" && segments[1] === "edit";
  const isOrderDetailScreen = pathname.startsWith("/order/");
  const isReviewScreen = pathname === "/reviews";

  const { showInputAlert } = useInputAlert();
  const { showAlert } = useAlert();
  const { addCategory } = usePizzaStore();

  let screenName = "";
  if (segments.length > 0) {
    const last = segments[segments.length - 1];
    if (last.startsWith("[")) {
      screenName = segments[segments.length - 2]?.toUpperCase() ?? "";
    } else {
      screenName = last.toUpperCase();
    }
  }

  const title = isAddNewScreen
  ? "ADD NEW ITEM"
  : isEditScreen
  ? "EDIT ITEM"
  : isOrderDetailScreen
  ? "ORDER DETAILS"
  : isReviewScreen
  ? "REVIEWS"
  : screenName;

  const handleAddCategory = () => {
    showInputAlert("Add Category", "Enter a category name you want to add:", {
      inputs: [
        {
          placeholder: "Category Name",
        },
      ],
      submitText: "Add",
      onSubmit: (values) => {
        let [name] = values;
        name = name.trim();

        if (!name) return;

        const normalized = name.toLowerCase();

        const result = addCategory(normalized);
        const formattedName = capitalize(normalized);

        if (!result) {
          return showAlert(
            "Duplicate Category",
            `The category "${formattedName}" already exists.`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Try again",
                style: "default",
                keepOpen: true,
                onPress: handleAddCategory,
              },
            ]
          );
        }

        showAlert("Category Added", `Category "${formattedName}" has been added.`, [
          { text: "OK", style: "default" },
        ]);
      },
    });
  };

  if (isAddNewScreen || isEditScreen) return null;

  return (
    <ThemedView style={styles.navbar}>
      {/* Left side */}
      <ThemedView style={styles.leftSide}>
        {isOrderDetailScreen || isReviewScreen ? (
          <BackButton />
        ) : (
          <TouchableOpacity onPress={openDrawer} style={styles.circleButton}>
            <MenuIcon width={46} height={46} color={textPrimary} />
          </TouchableOpacity>
        )}
        <ThemedText type="defaultSemiBold" colorName="accentPrimary">{title}</ThemedText>
      </ThemedView>

      {/* Right side */}
      {isMenuScreen ? (
        <TouchableOpacity style={styles.addBtn} onPress={() => handleAddCategory()}>
          <ThemedText style={styles.addBtnText}>Add Menu Category</ThemedText>
        </TouchableOpacity>
      ) : isCategoryScreen ? (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => { router.push(`/pizza/add/${categoryId}`)}}
        >
          <ThemedText style={styles.addBtnText}>Add New Item</ThemedText>
        </TouchableOpacity>
      ) : (
        <LogoIcon width={100} height={100} color={textPrimary} />
      )}
    </ThemedView>
  );
};

const useThemedStyles = createThemedStyles(({ bgGray, accentPrimary }) => ({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  circleButton: {
    width: 40,
    height: 40,
    backgroundColor: bgGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    alignItems: 'center',
    minWidth: 94,
  },
  addBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: accentPrimary,
  },
  addBtnText: {
    fontSize: 12,
    color: accentPrimary,
  },
}));
