import { useAlert } from '@/hooks/useAlert';
import { useInputAlert } from '@/hooks/useInputAlert';
import { usePizzaStore } from '@/stores/pizza';
import { capitalize } from '@/utils/common.utils';

export const useAddCategory = (): {
  handleAddCategory: () => void;
} => {
  const { showAlert } = useAlert();
  const { showInputAlert } = useInputAlert();
  const { addCategory } = usePizzaStore();

  const handleAddCategory = () => {
    showInputAlert("Add Category", "Enter a category name you want to add:", {
      inputs: [
        {
          placeholder: "Category Name",
        },
      ],
      submitText: "Save",
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

        showAlert("Category Added", `Category "${formattedName}" added successfully.`, [
          { text: "OK", style: "default" },
        ]);
      },
    });
  };

  return { handleAddCategory };
};
