import MenuIcon from '@/assets/images/menu.svg';
import LogoIcon from '@/assets/images/Ratatouille.svg';
import { useDrawer } from '@/hooks/useDrawer';
import { useThemeColors } from '@/hooks/useThemeColors';
import { usePathname, useSegments } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { createThemedStyles } from '@/utils/styles';
import { useInputAlert } from '@/hooks/useInputAlert';
import { useAlert } from '@/hooks/useAlert';
import { usePizzaStore } from '@/stores/pizza';
import { capitalize } from '@/utils/common.utils';

export default function Navbar(): React.JSX.Element{
  const styles = useThemedStyles();
  const { textPrimary } = useThemeColors();
  const { openDrawer } = useDrawer();
  const pathname = usePathname();
  const segments = useSegments();

  const showAddButton = pathname === '/menu';
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

  const handleAddCategory = () => {
    showInputAlert("Add Category", "Enter a category name you want to add:", {
      placeholder: "Category Name",
      onSubmit: (name) => {
        name = name.trim().toLowerCase();
        if (!name) return;

        const result = addCategory(name);
        const formattedName = capitalize(name);

        if (!result) {
          return showAlert(
            "Error",
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

  return (
    <ThemedView style={styles.navbar}>
      {/* Left side */}
      <ThemedView style={styles.leftSide}>
        <TouchableOpacity onPress={openDrawer} style={styles.circleButton}>
          <MenuIcon width={46} height={46} color={textPrimary} />
        </TouchableOpacity>
        <ThemedText type='defaultSemiBold' colorName='accentPrimary'>{screenName}</ThemedText>
      </ThemedView>

      {/* Right side */}
      {showAddButton ? (
        <TouchableOpacity style={styles.addBtn} onPress={() => handleAddCategory()}>
          <ThemedText style={styles.addBtnText}>Add Menu Category</ThemedText>
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
