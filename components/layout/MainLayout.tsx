'use client';
import { ReactNode } from 'react';
import Header from './Header';
import MobileTabBar from './MobileTabBar';
import ClientOnly from '../ClientOnly';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <ClientOnly>
        <MobileTabBar />
      </ClientOnly>
    </div>
  );
}