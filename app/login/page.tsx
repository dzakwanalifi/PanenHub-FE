'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, isLoggedIn, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/');
    }
    // Error handling is now managed by the store
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang Kembali!</h1>
          <p className="text-gray-600">Masuk ke akun PanenHub Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Alamat Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email Anda"
            required
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password Anda"
            required
          />

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-[#2E7D32] focus:ring-[#2E7D32]" />
              <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-[#2E7D32] hover:underline">
              Lupa password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={isLoading}
          >
            Masuk
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Akun demo:</p>
          <p className="text-xs text-gray-500">john.doe@example.com (Pembeli)</p>
          <p className="text-xs text-gray-500">sarah.johnson@example.com (Penjual)</p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link href="/signup" className="text-[#2E7D32] font-semibold hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}