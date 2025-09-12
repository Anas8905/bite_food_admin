const pizzas = [
    {
      id: '1',
      name: 'Pepperoni Feast',
      description: 'Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust',
      image: require('../assets/images/pizza_pepperoni.png'),
      category: 'Popular',
      rating: 4.5,
      reviewCount: '1.5k+',
      deliveryTime: 25,
      deliveryFee: 'Free',
      variations: [
        { size: '6" - Small (1)', price: 510 },
        { size: '9" - Medium (2)', price: 1100 },
        { size: '12" - Large (2-3)', price: 1600 },
        { size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: '2',
      name: 'Meat Lovers',
      description: 'Pepperoni, ham, bacon, sausage, beef on a hand-tossed crust',
      image: require('../assets/images/pizza_italian.png'),
      category: 'Popular',
      rating: 4.7,
      reviewCount: '1.8k+',
      deliveryTime: 30,
      deliveryFee: 'Free',
      variations: [
        { size: '6" - Small (1)', price: 510 },
        { size: '9" - Medium (2)', price: 1200 },
        { size: '12" - Large (2-3)', price: 1700 },
        { size: '15" - Party (3-4)', price: 2300 },
      ]
    },
    {
      id: '3',
      name: 'BBQ Chicken',
      description: 'Grilled chicken, BBQ sauce, red onions, cilantro on a hand-tossed crust',
      image: require('../assets/images/pizza_special.png'),
      category: 'Popular',
      rating: 4.6,
      reviewCount: '1.2k+',
      deliveryTime: 25,
      deliveryFee: 'Free',
      variations: [
        { size: '6" - Small (1)', price: 510 },
        { size: '9" - Medium (2)', price: 1100 },
        { size: '12" - Large (2-3)', price: 1600 },
        { size: '15" - Party (3-4)', price: 2200 },
      ]
    },
    {
      id: '4',
      name: 'Chicago Bold',
      description: 'Crispy golden crust, Spicy BBQ Chicken, Tomato Sauce, Onions, Chillies & Coriander.',
      image: require('../assets/images/pizza_dark.png'),
      category: 'Popular',
      rating: 4.8,
      reviewCount: '2k+',
      deliveryTime: 20,
      deliveryFee: 'Free',
      variations: [
        { size: '6" - Small (1)', price: 510 },
        { size: '9" - Medium (2)', price: 1100 },
        { size: '12" - Large (2-3)', price: 1600 },
        { size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: '5',
      name: 'Veggie Supreme',
      description: 'Bell peppers, mushrooms, onions, black olives, tomatoes on a thin crust',
      image: require('../assets/images/pizza_dark.png'),
      category: 'Classics',
      rating: 4.3,
      reviewCount: '1k+',
      deliveryTime: 20,
      deliveryFee: 'Free',
      variations: [
        { size: '6" - Small (1)', price: 450 },
        { size: '9" - Medium (2)', price: 950 },
        { size: '12" - Large (2-3)', price: 1400 },
        { size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: '6',
      name: 'Hawaiian',
      description: 'Ham, pineapple, mozzarella cheese on a hand-tossed crust',
      image: require('../assets/images/pizza_special.png'),
      category: 'Classics',
      rating: 4.2,
      reviewCount: '900+',
      deliveryTime: 20,
      deliveryFee: 'Free',
      variations: [
        { size: '6" - Small (1)', price: 480 },
        { size: '9" - Medium (2)', price: 1000 },
        { size: '12" - Large (2-3)', price: 1500 },
        { size: '15" - Party (3-4)', price: 2100 },
      ]
    },
    {
      id: 'd1',
      name: 'Deal 1',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_pepperoni.png'),
      category: 'Deals',
      deliveryTime: 40,
      deliveryFee: 'Free',
      price: 1100,
    },
    {
      id: 'd2',
      name: 'Deal 2',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_italian.png'),
      category: 'Deals',
      deliveryTime: 35,
      deliveryFee: 'Free',
      price: 4300,
    },
    {
      id: 'd3',
      name: 'Deal 3',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_special.png'),
      category: 'Deals',
      deliveryTime: 70,
      deliveryFee: 'Free',
      price: 5100,
    },
    {
      id: 'd4',
      name: 'Deal 4',
      description: 'Chicago Bold 9" Special or Chicken Supreme 2"',
      image: require('../assets/images/pizza_dark.png'),
      category: 'Deals',
      deliveryTime: 80,
      deliveryFee: 'Free',
      price: 7600,
    },
];

const mockOrders = [];

export const orders = [
  {
    id: '162432',
    image: require('../assets/images/pizza_pepperoni.png'),
    name: 'Peri Peri Pizza',
    description: 'Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust',
    category: "Ordered",
    price: '1400',
    size: 'small',
    quantity: 1,
    total: 1100,
    deliveryAddress: "439-A, Rt. Street, Model Town, LHR",
    estimatedDeliveryTime: 30,
    time: 'Jun 17 · 12:30 am',
  },
  {
    id: '323790',
    image: require('../assets/images/pizza_special.png'),
    name: 'Peri Pizza, Stuff Crust',
    description: 'Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust',
    category: "Ordered",
    price: '3736',
    size: 'medium',
    quantity: 2,
    total: 2000,
    deliveryAddress: "312-D, Rt. Street, Johar Town, LHR",
    estimatedDeliveryTime: 45,
    time: 'Jun 17 · 12:30 am',
  },
  {
    id: '435701',
    image: require('../assets/images/pizza_dark.png'),
    name: 'Hot & Spicy, Thin Crust',
    description: 'Classic pepperoni, mozzarella cheese, tomato sauce on a hand-tossed crust',
    category: "Ordered",
    price: '5736',
    size: 'large',
    quantity: 3,
    total: 3000,
    deliveryAddress: "991-B, Rt. Street, Wapda Town, LHR",
    estimatedDeliveryTime: 60,
    time: 'Jun 17 · 12:30 am',
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
    return pizzas.filter((pizza) => pizza.category === 'Popular');
  }
}
