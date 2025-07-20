import { Suspense } from 'react';
import TransactionContent from './TransactionContent';
import Spinner from '@/components/ui/Spinner';

function TransactionFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Memuat detail transaksi...</p>
        </div>
      </div>
    </div>
  );
}

export default function TransactionPage() {
  return (
    <Suspense fallback={<TransactionFallback />}>
      <TransactionContent />
    </Suspense>
  );
}
