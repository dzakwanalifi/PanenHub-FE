import ProductDetailClient from './ProductDetailClient';
import { Product } from '@/lib/product-data';

interface ProductDetailWrapperProps {
  product: Product;
}

export default function ProductDetailWrapper({ product }: ProductDetailWrapperProps) {
  return <ProductDetailClient product={product} />;
}