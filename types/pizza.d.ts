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
  variations?: { size: string; price: number }[];
  price?: number;
  disabled?: boolean;
};