// Mock product data
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[]; // Array of all product images
  rating: number;
  store: string;
  description: string;
  details: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    store: 'Green Valley Farms',
    description: 'Fresh, organic carrots grown without pesticides. Perfect for salads, cooking, or snacking. Rich in beta-carotene and vitamins.',
    details: 'Grown in fertile soil with natural farming methods. Harvested daily to ensure maximum freshness and nutritional value.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '2',
    name: 'Fresh Spinach',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551753771-1b8a8e08b722?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    store: 'Sunrise Organic',
    description: 'Nutrient-dense fresh spinach leaves, perfect for salads, smoothies, and cooking. Packed with iron and vitamins.',
    details: 'Organically grown spinach with tender leaves. Washed and ready to use. High in iron, folate, and vitamin K.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '3',
    name: 'Red Bell Peppers',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618179850062-a934d7ff4172?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    store: 'Garden Fresh Market',
    description: 'Crisp and sweet red bell peppers, perfect for cooking, grilling, or eating raw. Rich in vitamin C and antioxidants.',
    details: 'Locally grown red bell peppers with vibrant color and exceptional flavor. Great for stir-fries, salads, and roasting.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '4',
    name: 'Organic Tomatoes',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1546470427-e5380e0e4a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546470427-e5380e0e4a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    store: 'Harvest Valley',
    description: 'Juicy organic tomatoes grown without chemicals. Perfect for salads, sauces, and cooking.',
    details: 'Vine-ripened organic tomatoes with rich flavor and natural sweetness. Grown using sustainable farming practices.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '5',
    name: 'Fresh Broccoli',
    price: 2.79,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    store: 'Green Valley Farms',
    description: 'Fresh broccoli crowns packed with nutrients. Great for steaming, roasting, or adding to stir-fries.',
    details: 'Nutrient-dense broccoli with tight, green florets. High in fiber, vitamin C, and folate.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '6',
    name: 'Sweet Corn',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603809395735-48d5bcaca878?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    store: 'Sunny Acres Farm',
    description: 'Sweet, tender corn on the cob. Perfect for grilling, boiling, or adding to salads and soups.',
    details: 'Farm-fresh sweet corn with kernels bursting with natural sweetness. Harvested at peak ripeness.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '7',
    name: 'Organic Lettuce',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1640692923993-4f6d8b1b2cd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    store: 'Organic Greens Co',
    description: 'Crisp organic lettuce leaves, perfect for salads and sandwiches. Grown without pesticides.',
    details: 'Fresh, crunchy lettuce with tender leaves. Organically grown and carefully harvested for maximum freshness.',
    category: 'Vegetables',
    inStock: true,
  },
  {
    id: '8',
    name: 'Purple Eggplant',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1659261200833-ec8761558af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508747703725-719777637510?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    store: 'Mediterranean Gardens',
    description: 'Fresh purple eggplant with glossy skin. Perfect for grilling, roasting, or making Mediterranean dishes.',
    details: 'Premium eggplant with firm flesh and mild flavor. Ideal for baba ganoush, ratatouille, and grilled dishes.',
    category: 'Vegetables',
    inStock: true,
  },
];

export const getProductById = (id: string) => {
  return products.find(p => p.id === id) || products[0];
};