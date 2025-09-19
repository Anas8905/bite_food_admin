type PizzaStore = {
  pizzas: Pizza[];
  categories: Category[];
  selectedCategories: string[];

  availableCategories: () => Category[];
  sections: () => { categoryId: string; title: string; data: Pizza[]; disabled?: boolean }[];
  getPizzasByCategoryId: (categoryId: string) => Pizza[];

  setPizzas: (pizzas: Pizza[]) => void;
  getCategoryById: (id: string) => Category | undefined;
  toggleCategory: (id: string) => void;
  addCategory: (name: string) => boolean;
  updateCategory: (id: string, name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<void>;
  toggleDisableCategory: (id: string) => void;
  enableCategory: (id: string) => void;
  getPopularPizzas: () => Promise<Pizza[]>;
  getPizzaById: (id: string) => Pizza | undefined;

  addPizza: (
    pizzaData: Omit<
      Pizza,
      "id" | "description" | "rating" | "reviewCount" | "deliveryTime" | "deliveryFee"
    > & { id?: string }
  ) => Promise<boolean>;

  deletePizza: (id: string) => Promise<void>;
  toggleDisablePizza: (id: string) => void;
  enablePizza: (id: string) => void;
};

type Category = {
  id: string;
  name: string;
  disabled?: boolean;
};

type Pizza = {
  id: string;
  name: string;
  description: string;
  image: PizzaImage;
  categoryId: string;
  rating?: number;
  reviewCount?: string;
  deliveryTime: number;
  deliveryFee: string;
  ingredients?: Ingredient[];
  variations?: Variant[];
  dips?: Dip[];
  disabled?: boolean;
};

type PizzaFormProps = { categoryId?: string; pizzaId?: string; resetKey: number; }

type Ingredient = {id: string; name: string; }

type IngredientsProps = {
  ingredients: Ingredient[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

type Variant = {id: string; size: string; price: number}

type VariantProps = {
  variants: Variant[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type Dip = {id: string; name: string; price: number; selected: boolean; }

type DipProps = {
  dips: Dip[];
  setDips: React.Dispatch<React.SetStateAction<Dip[]>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: () => void;
}

type PizzaImage = string | number | ImageSourcePropType;
