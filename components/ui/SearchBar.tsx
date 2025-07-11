'use client';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search for products..." 
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-[#F3F4F6] border-0 rounded-full focus:ring-2 focus:ring-[#A5D6A7] focus:outline-none text-[#1F2937] placeholder-gray-500"
      />
    </div>
  );
}