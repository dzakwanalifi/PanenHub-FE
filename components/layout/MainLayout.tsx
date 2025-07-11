'use client';
import { ReactNode } from 'react';
import Header from './Header';
import MobileTabBar from './MobileTabBar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <MobileTabBar />
    </div>
  );
}