import { categories as initialCategories, pizzas as initialPizzas, orders as initialOrders } from '@/api/mockApi';
import { capitalize } from '@/utils/common.utils';
import { create } from 'zustand';

type PizzaStore = {
  pizzas: Pizza[];
  orders: Order[];
  categories: Category[];
  selectedCategories: string[];

  // derived selectors
  availableCategories: () => Category[];
  sections: () => { categoryId: string; title: string; data: Pizza[]; disabled?: boolean }[];
  getPizzasByCategoryId: (categoryId: string) => Pizza[];

  // actions
  setPizzas: (pizzas: Pizza[]) => void;
  getCategoryById: (id: string) => Category | undefined;
  toggleCategory: (id: string) => void;
  addCategory: (name: string) => boolean;
  updateCategory: (id: string, name: string) => boolean;
  deleteCategory: (id: string) => void;
  toggleDisableCategory: (id: string) => void;
  enableCategory: (id: string) => void;
  getPizzaById: (id: string) => Pizza | undefined;
  getOrderById: (id: string) => Order | undefined;
  addPizza: (
    pizzaData: Omit<
      Pizza,
      "id" | "description" | "rating" | "reviewCount" | "deliveryTime" | "deliveryFee"
    > & { id?: string }
  ) => Promise<boolean>;

  deletePizza: (id: string) => void;
  toggleDisablePizza: (id: string) => void;
  enablePizza: (id: string) => void;
};

export const usePizzaStore = create<PizzaStore>((set, get) => ({
  pizzas: initialPizzas,
  orders: initialOrders,
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
        categoryId: cat.id,
        title: cat.name,
        disabled: cat.disabled,
        data: pizzas.filter((p) => p.categoryId === cat.id),
      }));
  },

  getPizzasByCategoryId: (categoryId: string) => {
    return get().pizzas.filter((pizza) => pizza.categoryId === categoryId);
  },

  // ---- actions ----
  setPizzas: (pizzas) => set({ pizzas }),

  getCategoryById: (id: string) => {
    return get().categories.find((c) => c.id === id);
  },

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
      categories: [newCategory, ...state.categories],
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
    set((state) => {
      const category = state.categories.find((c) => c.id === id);
      const isBeingDisabled = !category?.disabled;

      return {
        categories: state.categories.map((c) =>
          c.id === id ? { ...c, disabled: !c.disabled } : c
        ),
        pizzas: isBeingDisabled
          ? state.pizzas.map((p) =>
              p.categoryId === id ? { ...p, disabled: false } : p
            )
          : state.pizzas,
      };
    });
  },

  enableCategory: (id) => {
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, disabled: false } : c
      ),
    }));
  },

  getPizzaById: (id: string) => {
    return get().pizzas.find((p) => p.id === id);
  },

  getOrderById: (id: string) => {
    return get().orders.find((o) => o.id === id);
  },

  addPizza: async (pizzaData): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { pizzas, categories } = get();

    const category = categories.find((c) => c.id === pizzaData.categoryId);

    if (!category) throw new Error("Selected category does not exist.");

    if (pizzaData.id) {
      const existingPizzaIndex = pizzas.findIndex((p) => p.id === pizzaData.id);

      if (existingPizzaIndex === -1) throw new Error("Pizza not found for update.");

      const duplicateName = pizzas.some(
        (p) =>
          p.id !== pizzaData.id &&
          p.categoryId === pizzaData.categoryId &&
          p.name.toLowerCase() === pizzaData.name.toLowerCase()
      );

      if (duplicateName) throw new Error("A pizza with this name already exists in this category.");

      set((state) => ({
        pizzas: state.pizzas.map((p) =>
          p.id === pizzaData.id ? { ...p, ...pizzaData } : p
        ),
      }));
    } else {
      const duplicateName = pizzas.some(
        (p) =>
          p.categoryId === pizzaData.categoryId &&
          p.name.toLowerCase() === pizzaData.name.toLowerCase()
      );

      if (duplicateName) throw new Error("A pizza with this name already exists in this category.");

      const newPizza: Pizza = {
        id: Date.now().toString(),
        description: "",
        rating: 0,
        reviewCount: "0",
        deliveryTime: 30,
        deliveryFee: "0",
        ...pizzaData,
      };

      set((state) => ({
        pizzas: [newPizza, ...state.pizzas],
      }));
    }

    return true;
  },

  deletePizza: (id) => {
    set((state) => ({
      pizzas: state.pizzas.filter((p) => p.id !== id),
    }));
  },

  toggleDisablePizza: (id) => {
    set((state) => {
      const pizza = state.pizzas.find((p) => p.id === id);
      const category = state.categories.find((c) => c.id === pizza?.categoryId);
      const isPizzaBeingDisabled = !pizza?.disabled;

      return {
        categories: state.categories.map((c) =>
          c.id === pizza?.categoryId && isPizzaBeingDisabled && category?.disabled
            ? { ...c, disabled: false }
            : c
        ),
        pizzas: state.pizzas.map((p) =>
          p.id === id ? { ...p, disabled: !p.disabled } : p
        ),
      };
    });
  },

  enablePizza: (id) => {
    set((state) => ({
      pizzas: state.pizzas.map((p) =>
        p.id === id ? { ...p, disabled: false } : p
      ),
    }));
  },
}));
