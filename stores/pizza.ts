import { categories as initialCategories, pizzas as initialPizzas } from '@/api/mockApi';
import { capitalize } from '@/utils/common.utils';
import { create } from 'zustand';

type PizzaStore = {
  pizzas: Pizza[];
  categories: Category[];
  selectedCategories: string[];

  // derived selectors
  availableCategories: () => Category[];
  sections: () => { title: string; data: Pizza[]; disabled?: boolean }[];

  // actions
  setPizzas: (pizzas: Pizza[]) => void;
  toggleCategory: (id: string) => void;
  addCategory: (name: string) => boolean;
  updateCategory: (id: string, name: string) => boolean;
  deleteCategory: (id: string) => void;
  toggleDisableCategory: (id: string) => void;
  enableCategory: (id: string) => void;
  deletePizza: (id: string) => void;
};

export const usePizzaStore = create<PizzaStore>((set, get) => ({
  pizzas: initialPizzas,
  categories: initialCategories,
  selectedCategories: ['All'],

  // ---- derived selectors ----
  availableCategories: () => get().categories,

  sections: () => {
    const { pizzas, categories, selectedCategories } = get();

    return categories
      .filter(
        (cat) =>
          selectedCategories.includes('All') ||
          selectedCategories.includes(cat.id)
      )
      .map((cat) => ({
        title: cat.name,
        disabled: cat.disabled,
        data: pizzas.filter((p) => p.categoryId === cat.id),
      }));
  },

  // ---- actions ----
  setPizzas: (pizzas) => set({ pizzas }),

  toggleCategory: (id) => {
    set((state) => {
      if (id === 'All') return { selectedCategories: ['All'] };

      if (state.selectedCategories.includes(id)) {
        const next = state.selectedCategories.filter(
          (catId) => catId !== id && catId !== 'All'
        );
        return { selectedCategories: next.length === 0 ? ['All'] : next };
      }

      return {
        selectedCategories: [
          ...state.selectedCategories.filter((catId) => catId !== 'All'),
          id,
        ],
      };
    });
  },

  addCategory: (name) => {
    const { categories } = get();

    const exists = categories.some((c) => 'all' === name || c.name.toLowerCase() === name);
    if (exists) return false;

    const newCategory: Category = {
      id: name,
      name: capitalize(name),
    };

    set((state) => ({
      categories: [...state.categories, newCategory],
    }));

    return true;
  },

  updateCategory: (id, name) => {
    const normalized = name.toLowerCase();
    const { categories } = get();

    const category = categories.find((c) => c.id === id);
    if (!category) return false;

    if (category.name.toLowerCase() === normalized) {
      return false;
    }

    const exists = categories.some(
      (c) => c.id !== id && (c.name.toLowerCase() === normalized || normalized === "all")
    );
    if (exists) return false;

    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, name: capitalize(normalized) } : c
      ),
    }));

    return true;
  },

  deleteCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
      pizzas: state.pizzas.map((p) =>
        p.categoryId === id ? { ...p, categoryId: 'uncategorized' } : p
      ),
    }));
  },

  toggleDisableCategory: (id) => {
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, disabled: !c.disabled } : c
      ),
    }));
  },

  enableCategory: (id) => {
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, disabled: false } : c
      ),
    }));
  },

  deletePizza: (id) => {
    set((state) => ({
      pizzas: state.pizzas.filter((p) => p.id !== id),
    }));
  },
}));
