// Mock store data
export const stores = [
  {
    id: 'green-valley-farms',
    name: 'Green Valley Farms',
    description: 'Organic produce grown with care and sustainability in mind',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 245,
    productCount: 28,
    followerCount: 1250,
    responseTime: '< 1 hour',
    location: 'California, USA',
    joinedDate: 'March 2022',
    products: [
      {
        id: '1',
        name: 'Organic Carrots',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        category: 'vegetables',
      },
      {
        id: '5',
        name: 'Fresh Broccoli',
        price: 2.79,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.4,
        category: 'vegetables',
      },
    ],
  },
  {
    id: 'sunrise-organic',
    name: 'Sunrise Organic',
    description: 'Premium organic vegetables and fruits from local farms',
    logo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 189,
    productCount: 35,
    followerCount: 890,
    responseTime: '< 2 hours',
    location: 'Oregon, USA',
    joinedDate: 'January 2023',
    products: [
      {
        id: '2',
        name: 'Fresh Spinach',
        price: 3.49,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        category: 'vegetables',
      },
    ],
  },
];

export interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  bannerImage: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  followerCount: number;
  responseTime: string;
  location: string;
  joinedDate: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    discount?: number;
  }>;
}

export const getStoreById = (id: string): Store => {
  return stores.find(s => s.id === id) || stores[0];
};