import ProductForm from '@/components/dashboard/ProductForm';
import { mockProducts } from '@/lib/mock-data';

interface ProductFormPageProps {
  params: {
    productId: string;
  };
}

export async function generateStaticParams() {
  // Generate static params for all existing products plus 'new' for creating new products
  const productParams = mockProducts.map((product) => ({
    productId: product.id.toString(),
  }));
  
  // Add 'new' for the product creation page
  productParams.push({ productId: 'new' });
  
  return productParams;
}

export default function ProductFormPage({ params }: ProductFormPageProps) {
  const isNew = params.productId === 'new';
  
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ProductForm productId={isNew ? null : params.productId} />
    </div>
  );
}