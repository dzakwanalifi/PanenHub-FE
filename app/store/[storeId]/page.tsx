import StorePageClient from '@/components/store/StorePageClient';
import { stores, getStoreById } from '@/lib/store-data';

// Generate static params for static export
export async function generateStaticParams() {
  return stores.map((store) => ({
    storeId: store.id,
  }));
}

interface StorePageProps {
  params: {
    storeId: string;
  };
}

export default function StorePage({ params }: StorePageProps) {
  const store = getStoreById(params.storeId);

  return (
    <div>
      <StorePageClient store={store} />
    </div>
  );
}