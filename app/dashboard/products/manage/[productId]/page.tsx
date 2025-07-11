import ProductForm from '@/components/dashboard/ProductForm';

interface ProductFormPageProps {
  params: {
    productId: string;
  };
}

export default function ProductFormPage({ params }: ProductFormPageProps) {
  const isNew = params.productId === 'new';
  
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ProductForm productId={isNew ? null : params.productId} />
    </div>
  );
}