'use client';
import Link from 'next/link';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  onClick?: () => void;
}

export default function MenuItem({ icon: Icon, title, description, href, onClick }: MenuItemProps) {
  const content = (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] cursor-pointer">
      <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#2E7D32]" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}