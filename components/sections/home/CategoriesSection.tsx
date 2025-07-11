'use client';
import { Utensils, Apple, Wheat, Milk, Fish, Beef } from 'lucide-react';

interface CategoriesSectionProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: Apple },
  { id: 'meats', name: 'Meats', icon: Utensils },
  { id: 'fresh', name: 'Fresh', icon: Apple },
  { id: 'bakery', name: 'Bakery', icon: Wheat },
  { id: 'grains', name: 'Grains', icon: Milk },
  { id: 'organic', name: 'Organic', icon: Fish },
];

export default function CategoriesSection({ selectedCategory, onCategorySelect }: CategoriesSectionProps) {
  return (
    <section className="px-4 mb-8">
      <div className="flex justify-between items-center overflow-x-auto">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => onCategorySelect(category.id)}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}