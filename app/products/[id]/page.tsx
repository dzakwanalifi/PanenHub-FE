import ProductDetailWrapper from '@/components/products/ProductDetailWrapper';
import { products, getProductById } from '@/lib/product-data';

// Generate static params for static export
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  return (
    <div>
      <ProductDetailWrapper product={product} />
    </div>
  );
}