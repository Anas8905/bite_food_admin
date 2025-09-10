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

// Mock API functions
export const mockAuthAPI = {

  sendOTP: async (user) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'OTP sent successfully',
    };
  },

  verifyOTP: async (phoneNumber, otp) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, any 4-digit OTP is valid
    if (otp.length === 4) {
      return {
        success: true,
        message: 'OTP verified successfully',
      };
    } else {
      throw new Error('Invalid OTP');
    }
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

