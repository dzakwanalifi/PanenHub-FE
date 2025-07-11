'use client';
import { Utensils, Apple, Wheat, Milk, Fish } from 'lucide-react';

interface CategoriesSectionProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: Apple },
  { id: 'vegetables', name: 'Vegetables', icon: Utensils },
  { id: 'fruits', name: 'Fruits', icon: Apple },
  { id: 'grains', name: 'Grains', icon: Wheat },
  { id: 'dairy', name: 'Dairy', icon: Milk },
  { id: 'organic', name: 'Organic', icon: Fish },
];

export default function CategoriesSection({ selectedCategory, onCategorySelect }: CategoriesSectionProps) {
  return (
    <section className="px-4 mb-8">
      <div className="flex justify-between items-center overflow-x-auto">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center space-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:ring-offset-2 rounded-lg p-2"
              onClick={() => onCategorySelect(category.id)}
              aria-label={`Filter by ${category.name} category`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-[#A5D6A7]'
                  : 'bg-[#F3F4F6]'
              }`}>
                <category.icon className={`w-6 h-6 ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : 'text-[#1F2937]'
                }`} />
              </div>
              <span className={`text-sm font-medium ${
                selectedCategory === category.id 
                  ? 'text-[#A5D6A7]' 
                  : 'text-[#1F2937]'
              }`}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}