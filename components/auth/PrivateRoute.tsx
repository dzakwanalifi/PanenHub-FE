// components/auth/PrivateRoute.tsx
"use client"; // Komponen ini perlu berjalan di sisi klien

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

// Definisikan tipe untuk props
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const router = useRouter();
  
  // Gunakan shallow comparison untuk subscribe ke perubahan state
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Only check auth after component has mounted and we're not loading
    if (hasMounted && !isLoading && !hasCheckedAuth) {
      setHasCheckedAuth(true);
      
      if (!isLoggedIn) {
        router.push('/login');
      }
    }
  }, [hasMounted, isLoggedIn, isLoading, hasCheckedAuth, router]);
  
  // Tampilkan loading spinner selagi mounting atau loading auth
  if (!hasMounted || isLoading || !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A5D6A7]"></div>
      </div>
    );
  }

  // Jika belum login, tampilkan loading (akan redirect di useEffect)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A5D6A7]"></div>
      </div>
    );
  }

  // Jika sudah login, tampilkan konten halaman yang dilindungi
  return <>{children}</>;
};

export default PrivateRoute; 