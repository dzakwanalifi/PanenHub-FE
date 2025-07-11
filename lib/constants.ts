// Currency and localization constants
export const CURRENCY_SYMBOL = 'Rp';
export const CURRENCY_CODE = 'IDR';

// Format price with currency symbol
export const formatPrice = (price: number): string => {
  return `${CURRENCY_SYMBOL}${price.toFixed(2)}`;
};

// Format price range
export const formatPriceRange = (minPrice: number, maxPrice: number): string => {
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};