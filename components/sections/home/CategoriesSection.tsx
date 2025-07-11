'use client';
import { Utensils, Apple, Wheat, Milk, Fish, Beef } from 'lucide-react';

const categories = [
  { id: 'meats', name: 'Meats', icon: Utensils },
  { id: 'fresh', name: 'Fresh', icon: Apple },
  { id: 'bakery', name: 'Bakery', icon: Wheat },
  { id: 'grains', name: 'Grains', icon: Milk },
  { id: 'organic', name: 'Organic', icon: Fish },
];

export default function CategoriesSection() {
  return (
    <section className="px-4 mb-8">
      <div className="flex justify-between items-center overflow-x-auto">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => console.log('Category clicked:', category.name)}
            >
              <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center">
                <category.icon className="w-6 h-6 text-dark" />
              </div>
              <span className="text-sm font-medium text-dark">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}