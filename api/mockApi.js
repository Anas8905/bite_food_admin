export const categories = [
  { id: 'popular', name: 'Popular' },
  { id: 'classics', name: 'Classics' },
  { id: 'deals', name: 'Deals' },
];

export const pizzas = [
    {
      id: '1',
      name: 'Pepperoni Feast',
      description: 'Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust',
      image: require('../assets/images/pizza_pepperoni.png'),
      categoryId: 'popular',
      rating: 4.5,
      reviewCount: '1.5k+',
      deliveryTime: 25,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 510 },
        { id: '2', size: '9" - Medium (2)', price: 1100 },
        { id: '3', size: '12" - Large (2-3)', price: 1600 },
        { id: '4', size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: '2',
      name: 'Meat Lovers',
      description: 'Pepperoni, ham, bacon, sausage, beef on a hand-tossed crust',
      image: require('../assets/images/pizza_italian.png'),
      categoryId: 'popular',
      rating: 4.7,
      reviewCount: '1.8k+',
      deliveryTime: 30,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 510 },
        { id: '2', size: '9" - Medium (2)', price: 1200 },
        { id: '3', size: '12" - Large (2-3)', price: 1700 },
        { id: '4', size: '15" - Party (3-4)', price: 2300 },
      ]
    },
    {
      id: '3',
      name: 'BBQ Chicken',
      description: 'Grilled chicken, BBQ sauce, red onions, cilantro on a hand-tossed crust',
      image: require('../assets/images/pizza_special.png'),
      categoryId: 'popular',
      rating: 4.6,
      reviewCount: '1.2k+',
      deliveryTime: 25,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 510 },
        { id: '2', size: '9" - Medium (2)', price: 1100 },
        { id: '3', size: '12" - Large (2-3)', price: 1600 },
        { id: '4', size: '15" - Party (3-4)', price: 2200 },
      ]
    },
    {
      id: '4',
      name: 'Chicago Bold',
      description: 'Crispy golden crust, Spicy BBQ Chicken, Tomato Sauce, Onions, Chillies & Coriander.',
      image: require('../assets/images/pizza_dark.png'),
      categoryId: 'popular',
      rating: 4.8,
      reviewCount: '2k+',
      deliveryTime: 20,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 510 },
        { id: '2', size: '9" - Medium (2)', price: 1100 },
        { id: '3', size: '12" - Large (2-3)', price: 1600 },
        { id: '4', size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: '5',
      name: 'Veggie Supreme',
      description: 'Bell peppers, mushrooms, onions, black olives, tomatoes on a thin crust',
      image: require('../assets/images/pizza_dark.png'),
      categoryId: 'classics',
      rating: 4.3,
      reviewCount: '1k+',
      deliveryTime: 20,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 450 },
        { id: '2', size: '9" - Medium (2)', price: 950 },
        { id: '3', size: '12" - Large (2-3)', price: 1400 },
        { id: '4', size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: '6',
      name: 'Hawaiian',
      description: 'Ham, pineapple, mozzarella cheese on a hand-tossed crust',
      image: require('../assets/images/pizza_special.png'),
      categoryId: 'classics',
      rating: 4.2,
      reviewCount: '900+',
      deliveryTime: 20,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 480 },
        { id: '2', size: '9" - Medium (2)', price: 1000 },
        { id: '3', size: '12" - Large (2-3)', price: 1500 },
        { id: '4', size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: 'd1',
      name: 'Deal 1',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_pepperoni.png'),
      categoryId: 'deals',
      deliveryTime: 40,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 480 },
        { id: '2', size: '9" - Medium (2)', price: 1000 },
      ]
    },
    {
      id: 'd2',
      name: 'Deal 2',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_italian.png'),
      categoryId: 'deals',
      deliveryTime: 35,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 480 },
        { id: '2', size: '9" - Medium (2)', price: 1000 },
        { id: '3', size: '12" - Large (2-3)', price: 1500 },
      ]
    },
    {
      id: 'd3',
      name: 'Deal 3',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_special.png'),
      categoryId: 'deals',
      deliveryTime: 70,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 480 },
        { id: '2', size: '9" - Medium (2)', price: 1000 },
      ]
    },
    {
      id: 'd4',
      name: 'Deal 4',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_dark.png'),
      categoryId: 'deals',
      deliveryTime: 80,
      deliveryFee: 'Free',
      variations: [
        { id: '1', size: '6" - Small (1)', price: 480 },
      ]
    },
];

const mockOrders = [];

export const orders = [
  {
    id: "162432",
    customer: "Ali Khan",
    phone: "+92631212167",
    status: "ongoing",
    stage: "Preparing",
    total: 5300,
    deliveryAddress: "439-A, Rt. Street, Model Town, LHR",
    estimatedDeliveryTime: 30,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p3",
        image: require("../assets/images/pizza_pepperoni.png"),
        name: "Peri Pizza",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Classic",
        price: 1100,
        size: "small",
        quantity: 1,
        subtotal: 1100,
      },
      {
        id: "p4",
        image: require("../assets/images/pizza_italian.png"),
        name: "Stuff Crust",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Popular",
        price: 2100,
        size: "medium",
        quantity: 2,
        subtotal: 4200,
      },
    ],
  },
  {
    id: "323790",
    customer: "John Doe",
    phone: "+92631212167",
    status: "ongoing",
    stage: "Sent Out",
    total: 2000,
    deliveryAddress: "312-D, Rt. Street, Johar Town, LHR",
    estimatedDeliveryTime: 45,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p4",
        image: require("../assets/images/pizza_italian.png"),
        name: "Stuff Crust",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Popular",
        price: 1000,
        size: "medium",
        quantity: 2,
        subtotal: 2000,
      },
    ],
  },
  {
    id: "435701",
    customer: "Taimoor Khan",
    phone: "+92631212167",
    status: "ongoing",
    stage: "Sent Out",
    total: 3000,
    deliveryAddress: "991-B, Rt. Street, Wapda Town, LHR",
    estimatedDeliveryTime: 60,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p5",
        image: require("../assets/images/pizza_special.png"),
        name: "Hot & Spicy",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Deal",
        price: 1000,
        size: "large",
        quantity: 3,
        subtotal: 3000,
      },
    ],
  },
  {
    id: "123456",
    customer: "Noah Bennett",
    phone: "+92631212167",
    status: "incoming",
    total: 3200,
    deliveryAddress: "439-A, Rt. Street, Model Town, LHR",
    estimatedDeliveryTime: 30,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p1",
        image: require("../assets/images/pizza_dark.png"),
        name: "Delicious Pizza",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Classic",
        price: 1400,
        size: "small",
        quantity: 1,
        subtotal: 1400,
      },
      {
        id: "p2",
        image: require("../assets/images/pizza_dark.png"),
        name: "Veggie Delight",
        description: "Fresh veggies with mozzarella cheese on a thin crust",
        category: "Veggie",
        price: 900,
        size: "medium",
        quantity: 2,
        subtotal: 1800,
      },
    ],
  },
  {
    id: "654321",
    customer: "Ethan Parker",
    phone: "+92631212167",
    status: "incoming",
    total: 2000,
    deliveryAddress: "312-D, Rt. Street, Johar Town, LHR",
    estimatedDeliveryTime: 45,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p6",
        image: require("../assets/images/pizza_special.png"),
        name: "Stuff Crust",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Popular",
        price: 1000,
        size: "medium",
        quantity: 2,
        subtotal: 2000,
      },
    ],
  },
  {
    id: "911261",
    customer: "Liam Carter",
    phone: "+92631212167",
    status: "completed",
    total: 3000,
    deliveryAddress: "991-B, Rt. Street, Wapda Town, LHR",
    estimatedDeliveryTime: 60,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p7",
        image: require("../assets/images/pizza_italian.png"),
        name: "Thin Crust",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Deal",
        price: 1000,
        size: "large",
        quantity: 3,
        subtotal: 3000,
      },
    ],
  },
  {
    id: "511262",
    customer: "Isabella Hayes",
    phone: "+92631212167",
    status: "completed",
    total: 3000,
    deliveryAddress: "991-B, Rt. Street, Wapda Town, LHR",
    estimatedDeliveryTime: 60,
    time: "Jun 17, 12:30 am",
    items: [
      {
        id: "p8",
        image: require("../assets/images/pizza_pepperoni.png"),
        name: "Hot & Spicy",
        description: "Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust",
        category: "Popular",
        price: 1000,
        size: "large",
        quantity: 3,
        subtotal: 3000,
      },
    ],
  },
];

export const weeklyOrders = [
  { value: 12, label: 'MON' },
  { value: 22, label: 'TUE' },
  { value: 15, label: 'WED' },
  { value: 25, label: 'THU' },
  { value: 18, label: 'FRI' },
  { value: 28, label: 'SAT' },
  { value: 20, label: 'SUN' },

  { value: 14, label: 'MON' },
  { value: 24, label: 'TUE' },
  { value: 16, label: 'WED' },
  { value: 26, label: 'THU' },
  { value: 19, label: 'FRI' },
  { value: 29, label: 'SAT' },
  { value: 21, label: 'SUN' },
];

export const monthlyOrders = [
  { value: 450, label: 'JAN' },
  { value: 600, label: 'FEB' },
  { value: 420, label: 'MAR' },
  { value: 650, label: 'APR' },
  { value: 500, label: 'MAY' },
  { value: 700, label: 'JUN' },
  { value: 480, label: 'JUL' },
  { value: 720, label: 'AUG' },
  { value: 510, label: 'SEP' },
  { value: 750, label: 'OCT' },
  { value: 530, label: 'NOV' },
  { value: 770, label: 'DEC' },
];

export const yearlyOrders = [
  { value: 1200, label: '2015' },
  { value: 2400, label: '2016' },
  { value: 1800, label: '2017' },
  { value: 3200, label: '2018' },
  { value: 2600, label: '2019' },
  { value: 4000, label: '2020' },
  { value: 3000, label: '2021' },
  { value: 4600, label: '2022' },
  { value: 3500, label: '2023' },
  { value: 5000, label: '2024' },
  { value: 3800, label: '2025' },
];

// Mock API functions
export const mockAuthAPI = {

  validateUser: async (user) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'User has valid login credentials.',
    };
  },

  updateProfile: async (toUpdate) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Profile updated successfully',
    };
  },
};

export const mockPizzaAPI = {
  popularPizzas: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return pizzas.filter((pizza) => pizza.categoryId === 'popular');
  },

  getOrdersByStatus: async (status) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return orders.filter((order) => order.status === status);
  }
}
