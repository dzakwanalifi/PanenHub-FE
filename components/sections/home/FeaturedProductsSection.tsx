'use client';
import ProductCard from '@/components/ui/ProductCard';

const featuredProducts = [
  {
    id: '1',
    name: 'Organic Carrots',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    store: 'Green Valley Farms',
    discount: 10,
  },
  {
    id: '2',
    name: 'Fresh Spinach',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    store: 'Sunrise Organic',
  },
  {
    id: '3',
    name: 'Red Tomatoes',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1546470427-e2e5c92b3c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    store: 'Fresh Fields',
    discount: 15,
  },
  {
    id: '4',
    name: 'Sweet Potatoes',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1519664398569-62bd70cf903e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    store: 'Organic Harvest',
  },
  {
    id: '5',
    name: 'Fresh Broccoli',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    store: 'Green Valley Farms',
  },
  {
    id: '6',
    name: 'Bell Peppers',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    store: 'Sunny Farms',
    discount: 20,
  },
  {
    id: '7',
    name: 'Organic Lettuce',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    store: 'Fresh Fields',
  },
  {
    id: '8',
    name: 'Baby Potatoes',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    store: 'Organic Harvest',
  },
];

export default function FeaturedProductsSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
        <button className="text-[#2E7D32] font-semibold hover:underline">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}