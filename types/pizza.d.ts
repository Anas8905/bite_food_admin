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

type OrderItem = {
  id: string;
  image: PizzaImage;
  name: string;
  description: string;
  category: string;
  price: number;
  size: string;
  quantity: number;
  subtotal: number;
};

type Order = {
  id: string;
  customer: string;
  phone: string;
  status: string;
  stage?: string;
  total: number;
  deliveryAddress: string;
  estimatedDeliveryTime: number;
  time: string;
  items: OrderItem[];
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

type PizzaImage = string | number;
