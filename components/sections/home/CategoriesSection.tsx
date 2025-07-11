'use client';
import { Carrot, Apple, Wheat, Milk, Fish, Beef } from 'lucide-react';

const categories = [
  { id: 'vegetables', name: 'Vegetables', icon: Carrot, color: 'bg-green-100 text-green-600' },
  { id: 'fruits', name: 'Fruits', icon: Apple, color: 'bg-red-100 text-red-600' },
  { id: 'grains', name: 'Grains', icon: Wheat, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'dairy', name: 'Dairy', icon: Milk, color: 'bg-blue-100 text-blue-600' },
  { id: 'seafood', name: 'Seafood', icon: Fish, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'meat', name: 'Meat', icon: Beef, color: 'bg-pink-100 text-pink-600' },
];

export default function CategoriesSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => console.log('Category clicked:', category.name)}
              className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow min-w-[120px]"
            >
              <div className={`w-16 h-16 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-3`}>
                <category.icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 text-center">{category.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}