// Mock data for PanenHub prototype
export interface MockProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  storeId: string;
  rating: number;
  reviewCount: number;
  category: string;
  inStock: boolean;
  originalPrice?: number;
}

export interface MockStore {
  id: string;
  name: string;
  bannerImage: string;
  logo: string;
  overallRating: number;
  description: string;
  location: string;
  joinedDate: string;
  productCount: number;
  followerCount: number;
  responseTime: string;
}

export interface MockReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  address?: string;
  joinDate: string;
  isSeller: boolean;
}

export interface MockOrder {
  id: string;
  userId: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  storeId: string;
  storeName: string;
  deliveryAddress: string;
}

export interface MockConversation {
  id: string;
  participants: string[];
  lastMessage: {
    text: string;
    timestamp: string;
    senderId: string;
  };
  messages: Array<{
    id: string;
    text: string;
    timestamp: string;
    senderId: string;
  }>;
}

// Mock Products Data
export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    price: 2.99,
    originalPrice: 3.32,
    description: 'Fresh, organic carrots grown without pesticides. Perfect for salads, cooking, or snacking. Rich in beta-carotene and vitamins.',
    images: [
      'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store1',
    rating: 4.5,
    reviewCount: 124,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '2',
    name: 'Fresh Spinach',
    price: 3.49,
    description: 'Nutrient-dense fresh spinach leaves, perfect for salads, smoothies, and cooking. Packed with iron and vitamins.',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store2',
    rating: 4.8,
    reviewCount: 89,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '3',
    name: 'Red Bell Peppers',
    price: 4.99,
    originalPrice: 5.87,
    description: 'Crisp and sweet red bell peppers, perfect for cooking, grilling, or eating raw. Rich in vitamin C and antioxidants.',
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store1',
    rating: 4.6,
    reviewCount: 156,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '4',
    name: 'Organic Tomatoes',
    price: 3.99,
    description: 'Juicy organic tomatoes grown without chemicals. Perfect for salads, sauces, and cooking.',
    images: [
      'https://images.unsplash.com/photo-1546470427-e5380e0e4a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store3',
    rating: 4.7,
    reviewCount: 203,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '5',
    name: 'Fresh Broccoli',
    price: 2.79,
    description: 'Fresh broccoli crowns packed with nutrients. Great for steaming, roasting, or adding to stir-fries.',
    images: [
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store1',
    rating: 4.4,
    reviewCount: 78,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '6',
    name: 'Sweet Corn',
    price: 1.99,
    originalPrice: 2.49,
    description: 'Sweet, tender corn on the cob. Perfect for grilling, boiling, or adding to salads and soups.',
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store2',
    rating: 4.8,
    reviewCount: 145,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '7',
    name: 'Organic Lettuce',
    price: 2.49,
    description: 'Crisp organic lettuce leaves, perfect for salads and sandwiches. Grown without pesticides.',
    images: [
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store3',
    rating: 4.3,
    reviewCount: 67,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '8',
    name: 'Purple Eggplant',
    price: 3.29,
    description: 'Fresh purple eggplant with glossy skin. Perfect for grilling, roasting, or making Mediterranean dishes.',
    images: [
      'https://images.unsplash.com/photo-1659261200833-ec8761558af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store1',
    rating: 4.5,
    reviewCount: 92,
    category: 'Vegetables',
    inStock: true
  },
  {
    id: '9',
    name: 'Fresh Strawberries',
    price: 5.99,
    description: 'Sweet and juicy strawberries, perfect for desserts, smoothies, or eating fresh.',
    images: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store2',
    rating: 4.9,
    reviewCount: 234,
    category: 'Fruits',
    inStock: true
  },
  {
    id: '10',
    name: 'Organic Apples',
    price: 4.49,
    originalPrice: 5.10,
    description: 'Crisp organic apples with natural sweetness. Great for snacking, baking, or making juice.',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    storeId: 'store3',
    rating: 4.6,
    reviewCount: 178,
    category: 'Fruits',
    inStock: true
  }
];

// Mock Stores Data
export const mockStores: MockStore[] = [
  {
    id: 'store1',
    name: 'Green Valley Farms',
    bannerImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    overallRating: 4.8,
    description: 'Organic produce grown with care and sustainability in mind',
    location: 'California, USA',
    joinedDate: 'March 2022',
    productCount: 28,
    followerCount: 1250,
    responseTime: '< 1 hour'
  },
  {
    id: 'store2',
    name: 'Sunrise Organic',
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    overallRating: 4.6,
    description: 'Premium organic vegetables and fruits from local farms',
    location: 'Oregon, USA',
    joinedDate: 'January 2023',
    productCount: 35,
    followerCount: 890,
    responseTime: '< 2 hours'
  },
  {
    id: 'store3',
    name: 'Fresh Fields',
    bannerImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    overallRating: 4.7,
    description: 'Farm-fresh produce delivered daily to your doorstep',
    location: 'Washington, USA',
    joinedDate: 'June 2022',
    productCount: 42,
    followerCount: 1580,
    responseTime: '< 30 minutes'
  }
];

// Mock Reviews Data
export const mockReviews: MockReview[] = [
  {
    id: 'review1',
    productId: '1',
    userId: 'user2',
    rating: 5,
    comment: 'Amazing quality carrots! Very fresh and crunchy. Will definitely order again.',
    date: '2024-01-15',
    helpful: 12
  },
  {
    id: 'review2',
    productId: '1',
    userId: 'user3',
    rating: 4,
    comment: 'Good carrots, arrived fresh and well-packaged. Slightly expensive but worth it.',
    date: '2024-01-10',
    helpful: 8
  },
  {
    id: 'review3',
    productId: '2',
    userId: 'user1',
    rating: 5,
    comment: 'Best spinach I\'ve ever bought online. Perfect for my morning smoothies!',
    date: '2024-01-12',
    helpful: 15
  },
  {
    id: 'review4',
    productId: '3',
    userId: 'user2',
    rating: 4,
    comment: 'Beautiful red peppers, very sweet and crispy. Great for cooking.',
    date: '2024-01-08',
    helpful: 6
  },
  {
    id: 'review5',
    productId: '9',
    userId: 'user3',
    rating: 5,
    comment: 'These strawberries are incredible! So sweet and juicy, my kids love them.',
    date: '2024-01-14',
    helpful: 20
  }
];

// Mock Users Data
export const mockUsers: MockUser[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    joinDate: 'March 2024',
    isSeller: false
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, City, State 12345',
    joinDate: 'February 2024',
    isSeller: true
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St, City, State 12345',
    joinDate: 'January 2024',
    isSeller: false
  }
];

// Mock Orders Data
export const mockOrders: MockOrder[] = [
  {
    id: 'ORD-001',
    userId: 'user1',
    date: '2024-01-15',
    status: 'delivered',
    total: 45.99,
    items: [
      { productId: '1', name: 'Organic Carrots', quantity: 2, price: 2.99, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { productId: '2', name: 'Fresh Spinach', quantity: 1, price: 3.49, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { productId: '3', name: 'Red Bell Peppers', quantity: 3, price: 4.99, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ],
    storeId: 'store1',
    storeName: 'Green Valley Farms',
    deliveryAddress: '123 Main St, City, State 12345'
  },
  {
    id: 'ORD-002',
    userId: 'user1',
    date: '2024-01-12',
    status: 'shipped',
    total: 67.50,
    items: [
      { productId: '4', name: 'Organic Tomatoes', quantity: 2, price: 3.99, image: 'https://images.unsplash.com/photo-1546470427-e5380e0e4a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { productId: '5', name: 'Fresh Broccoli', quantity: 1, price: 2.79, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { productId: '9', name: 'Fresh Strawberries', quantity: 2, price: 5.99, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ],
    storeId: 'store2',
    storeName: 'Sunrise Organic',
    deliveryAddress: '123 Main St, City, State 12345'
  },
  {
    id: 'ORD-003',
    userId: 'user1',
    date: '2024-01-10',
    status: 'processing',
    total: 23.75,
    items: [
      { productId: '7', name: 'Organic Lettuce', quantity: 1, price: 2.49, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { productId: '8', name: 'Purple Eggplant', quantity: 2, price: 3.29, image: 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ],
    storeId: 'store3',
    storeName: 'Fresh Fields',
    deliveryAddress: '123 Main St, City, State 12345'
  }
];

// Mock Conversations Data
export const mockConversations: MockConversation[] = [
  {
    id: 'conv1',
    participants: ['user1', 'store1'],
    lastMessage: {
      text: 'Your order has been prepared and will be shipped tomorrow!',
      timestamp: '2 min ago',
      senderId: 'store1'
    },
    messages: [
      {
        id: 'msg1',
        text: 'Hi! I\'m interested in your organic carrots. Are they still available?',
        timestamp: '10:30 AM',
        senderId: 'user1'
      },
      {
        id: 'msg2',
        text: 'Hello! Yes, we have fresh organic carrots available. How many kilograms would you like?',
        timestamp: '10:32 AM',
        senderId: 'store1'
      },
      {
        id: 'msg3',
        text: 'I\'d like to order 5kg. When can you deliver?',
        timestamp: '10:35 AM',
        senderId: 'user1'
      },
      {
        id: 'msg4',
        text: 'Perfect! We can deliver tomorrow morning between 8-10 AM. The total would be $14.95 for 5kg.',
        timestamp: '10:37 AM',
        senderId: 'store1'
      },
      {
        id: 'msg5',
        text: 'That sounds great! I\'ll place the order now.',
        timestamp: '10:40 AM',
        senderId: 'user1'
      },
      {
        id: 'msg6',
        text: 'Your order has been prepared and will be shipped tomorrow!',
        timestamp: '2 min ago',
        senderId: 'store1'
      }
    ]
  },
  {
    id: 'conv2',
    participants: ['user1', 'store2'],
    lastMessage: {
      text: 'Thank you for your order! We appreciate your business.',
      timestamp: '1 hour ago',
      senderId: 'store2'
    },
    messages: [
      {
        id: 'msg7',
        text: 'Hello! I received my strawberries and they are amazing!',
        timestamp: '2:15 PM',
        senderId: 'user1'
      },
      {
        id: 'msg8',
        text: 'Thank you for your order! We appreciate your business.',
        timestamp: '1 hour ago',
        senderId: 'store2'
      }
    ]
  }
];

// Helper functions to get data by ID
export const getProductById = (id: string): MockProduct | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getStoreById = (id: string): MockStore | undefined => {
  return mockStores.find(store => store.id === id);
};

export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getProductsByStoreId = (storeId: string): MockProduct[] => {
  return mockProducts.filter(product => product.storeId === storeId);
};

export const getReviewsByProductId = (productId: string): MockReview[] => {
  return mockReviews.filter(review => review.productId === productId);
};

export const getOrdersByUserId = (userId: string): MockOrder[] => {
  return mockOrders.filter(order => order.userId === userId);
};

export const getConversationsByUserId = (userId: string): MockConversation[] => {
  return mockConversations.filter(conv => conv.participants.includes(userId));
};

// AI Mock Response Function
export interface AIProductResponse {
  productName: string;
  description: string;
  suggestedPrice: number;
  suggestedCategory: string;
}

export const getMockAIResponse = (imageUrl: string): AIProductResponse => {
  // In a real implementation, this would analyze the actual image
  // For now, we'll return different responses based on image characteristics
  
  const responses: AIProductResponse[] = [
    {
      productName: "Fresh Organic Tomatoes",
      description: "Juicy, farm-fresh organic tomatoes, perfect for salads, sauces, or eating fresh. Hand-picked from our local garden with care and attention to quality.",
      suggestedPrice: 4.99,
      suggestedCategory: "Vegetables"
    },
    {
      productName: "Premium Leafy Greens",
      description: "Crisp and nutritious leafy greens, grown without pesticides. Perfect for healthy salads, smoothies, and cooking. Harvested daily for maximum freshness.",
      suggestedPrice: 3.49,
      suggestedCategory: "Vegetables"
    },
    {
      productName: "Sweet Garden Carrots",
      description: "Crunchy, sweet carrots packed with beta-carotene and natural goodness. Ideal for snacking, cooking, or juicing. Grown in rich, organic soil.",
      suggestedPrice: 2.99,
      suggestedCategory: "Vegetables"
    },
    {
      productName: "Fresh Seasonal Fruits",
      description: "Delicious seasonal fruits bursting with natural sweetness and vitamins. Perfect for healthy snacking, desserts, or breakfast additions.",
      suggestedPrice: 5.99,
      suggestedCategory: "Fruits"
    }
  ];
  
  // Return a random response for variety in the prototype
  return responses[Math.floor(Math.random() * responses.length)];
};