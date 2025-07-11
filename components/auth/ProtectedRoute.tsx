'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSeller?: boolean;
}

export default function ProtectedRoute({ children, requireSeller = false }: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    if (requireSeller && user && !user.isSeller) {
      router.push('/account');
      return;
    }
  }, [isLoggedIn, user, requireSeller, router]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (requireSeller && user && !user.isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need to be a seller to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}