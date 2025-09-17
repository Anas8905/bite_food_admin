type Category = {
  id: string;
  name: string;
  disabled?: boolean;
};

type Pizza = {
  id: string;
  name: string;
  description: string;
  image: any;
  categoryId: string;
  rating?: number;
  reviewCount?: string;
  deliveryTime: number;
  deliveryFee: string;
  variations?: { id: string; size: string; price: number }[];
  price?: number;
  disabled?: boolean;
};

type Order = {
  id: string;
  customer: string;
  image: any;
  name: string;
  description: string;
  category: string;
  status: string;
  stage?: string;
  price: string;
  size: string;
  quantity: number;
  total: number;
  deliveryAddress: string;
  estimatedDeliveryTime: number;
  time: string;
}

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