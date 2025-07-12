'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

export default function MenuItem({ icon: Icon, title, description, href }: MenuItemProps) {
  return (
    <Link href={href} className="block">
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#A5D6A7] rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </Link>
  );
}