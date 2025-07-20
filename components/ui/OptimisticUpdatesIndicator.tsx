'use client';
import { useOptimisticStore } from '@/hooks/useOptimisticUpdates';

// Component untuk menampilkan status optimistic updates
export default function OptimisticUpdatesIndicator() {
  const updates = useOptimisticStore((state) => state.updates);
  const pendingUpdates = updates.filter(update => update.status === 'pending');
  const errorUpdates = updates.filter(update => update.status === 'error');
  
  if (pendingUpdates.length === 0 && errorUpdates.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {pendingUpdates.map((update) => (
        <div
          key={update.id}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center"
        >
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
          {update.type === 'add' && 'Menambahkan ke keranjang...'}
          {update.type === 'update' && 'Mengupdate keranjang...'}
          {update.type === 'remove' && 'Menghapus dari keranjang...'}
        </div>
      ))}
      
      {errorUpdates.map((update) => (
        <div
          key={update.id}
          className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center justify-between"
        >
          <span>
            {update.type === 'add' && 'Gagal menambahkan ke keranjang'}
            {update.type === 'update' && 'Gagal mengupdate keranjang'}
            {update.type === 'remove' && 'Gagal menghapus dari keranjang'}
          </span>
          <button
            onClick={() => {
              const { retryUpdate } = useOptimisticStore.getState();
              retryUpdate(update.id);
            }}
            className="ml-2 text-xs underline"
          >
            Coba lagi
          </button>
        </div>
      ))}
    </div>
  );
}
