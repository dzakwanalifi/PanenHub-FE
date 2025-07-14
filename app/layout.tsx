import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import DataPreloader from '@/components/layout/DataPreloader';
import { Toaster } from '@/components/ui/toaster';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PanenHub - Fresh Harvest, Delivered',
  description: 'Your trusted agro e-commerce platform for fresh produce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={plusJakartaSans.className} suppressHydrationWarning={true}>
        <DataPreloader />
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}