'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { register, isLoggedIn, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    
    if (password !== confirmPassword) {
      setLocalError('Password tidak cocok');
      return;
    }
    
    try {
      await register({ name, email, password });
      // Jika berhasil, user akan diarahkan otomatis oleh useEffect
    } catch (error) {
      // Error sudah ditangani oleh store, tidak perlu action tambahan
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun</h1>
          <p className="text-gray-600">Bergabung dengan PanenHub untuk produk segar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            label="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap Anda"
            required
          />

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
            placeholder="Buat password"
            required
          />

          <Input
            type="password"
            label="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi password Anda"
            required
          />

          {(error || localError) && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error || localError}
            </div>
          )}

          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-[#2E7D32] focus:ring-[#2E7D32]" required />
              <span className="ml-2 text-sm text-gray-600">
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-[#2E7D32] hover:underline">
                  Syarat Layanan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-[#2E7D32] hover:underline">
                  Kebijakan Privasi
                </Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={isLoading}
          >
            Buat Akun
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#2E7D32] font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}