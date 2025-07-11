import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
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
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}