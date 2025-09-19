type OrderStore = {
  orders: Order[];
  weeklyOrders: DummyOrder[];
  monthlyOrders: DummyOrder[];
  yearlyOrders: DummyOrder[];
  reviews: Review[];

  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status?: string) => Promise<Order[] | []>;
  getBulkOrdersCount: () => Promise<number>;
  acceptOrder: (orderId: string) => Promise<boolean>;
  cancelOrder: (orderId: string) => Promise<boolean>;
  markOrderReadyForDelivery: (orderId: string) => Promise<boolean>;
  markOrderAsDelivered: (orderId: string) => Promise<boolean>;
  getReviewsCount: () => Promise<number>;
  getHighestReviewValue: () => Promise<number>;
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

  type DummyOrder = { value: number; label: string; };

  type Review = {
    id: string;
    customer: string;
    avatar: ImageSourcePropType;
    date: string;
    title: string;
    description: string;
    rating: number;
  };
