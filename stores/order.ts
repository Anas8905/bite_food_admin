import { create } from 'zustand';
import {
  orders as initialOrders,
  reviews as initialReviews,
  monthlyOrders,
  weeklyOrders,
  yearlyOrders,
} from '@/api/mockApi';

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: initialOrders,
  weeklyOrders,
  monthlyOrders,
  yearlyOrders,
  reviews: initialReviews,

  getOrderById: (id: string) => {
    return get().orders.find((o) => o.id === id);
  },

  getOrdersByStatus: async (status?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const orders = get().orders;

    if (!status) return orders;

    return orders.filter((o) => o.status === status);
  },

  getBulkOrdersCount: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [get().weeklyOrders, get().monthlyOrders, get().yearlyOrders].flat().length;
  },

  acceptOrder: async (orderId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const { orders } = get();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      console.error('Order not found:', orderId);
      return false;
    }

    if (order.status !== 'incoming') {
      console.error('Order is not in incoming status:', orderId);
      return false;
    }

    set((state) => ({
      orders: state.orders.map(o =>
        o.id === orderId
          ? { ...o, status: 'ongoing' as const, stage: 'preparing' as const }
          : o
      ),
    }));

    return true;
  },

  cancelOrder: async (orderId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const { orders } = get();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      console.error('Order not found:', orderId);
      return false;
    }

    set((state) => ({
      orders: state.orders.filter(o => o.id !== orderId),
    }));

    return true;
  },

  markOrderReadyForDelivery: async (orderId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const { orders } = get();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      console.error('Order not found:', orderId);
      return false;
    }

    if (order.stage !== 'preparing') {
      console.error('Order is not in preparing stage:', orderId);
      return false;
    }

    set((state) => ({
      orders: state.orders.map(o =>
        o.id === orderId
          ? { ...o, stage: 'sent out' as const }
          : o
      ),
    }));

    return true;
  },

  markOrderAsDelivered: async (orderId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const { orders } = get();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      console.error('Order not found:', orderId);
      return false;
    }

    if (order.status !== 'ongoing' || order.stage !== 'sent out') {
      console.error('Order is not in ongoing/sent out status:', orderId);
      return false;
    }

    set((state) => ({
      orders: state.orders.map(o =>
        o.id === orderId
          ? { ...o, status: 'completed' as const, stage: '' as const }
          : o
      ),
    }));

    return true;
  },

  getReviewsCount: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return get().reviews.length;
  },

  getHighestReviewValue: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const reviews = get().reviews;
    return reviews.length > 0
      ? Math.max(...reviews.map(r => r.rating))
      : 0;
  },
}));
