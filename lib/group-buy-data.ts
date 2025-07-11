// Mock group buy data
export const groupBuyData = [
  {
    id: '1',
    title: 'Bulk Buy: Organic Rice Bundle',
    description: '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pricePerUnit: 45.99,
    originalPrice: 52.99,
    currentParticipants: 12,
    targetParticipants: 20,
    timeLeft: '2 days 4h',
    store: 'Green Valley Farms',
    category: 'Grains',
    details: 'Premium quality organic rice grown without pesticides. Each bundle contains 25kg of carefully selected rice grains. Perfect for bulk cooking and meal preparation.',
    minimumOrder: 1,
    maximumOrder: 5,
  },
  {
    id: '2',
    title: 'Fresh Vegetable Box',
    description: 'Mixed seasonal vegetables for the whole family. Contains 15+ varieties of fresh produce.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pricePerUnit: 29.99,
    originalPrice: 35.99,
    currentParticipants: 8,
    targetParticipants: 15,
    timeLeft: '5 days 12h',
    store: 'Sunrise Organic',
    category: 'Vegetables',
    details: 'A carefully curated selection of seasonal vegetables including leafy greens, root vegetables, and fresh herbs. Perfect for healthy family meals.',
    minimumOrder: 1,
    maximumOrder: 3,
  },
  {
    id: '3',
    title: 'Premium Fruit Basket',
    description: 'Assorted premium fruits delivered fresh. Contains exotic and local seasonal fruits.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pricePerUnit: 39.99,
    originalPrice: 47.99,
    currentParticipants: 18,
    targetParticipants: 25,
    timeLeft: '1 day 8h',
    store: 'Fresh Fields',
    category: 'Fruits',
    details: 'Premium selection of both local and exotic fruits. Each basket contains 8-10 different fruit varieties, carefully selected for ripeness and quality.',
    minimumOrder: 1,
    maximumOrder: 4,
  },
];

export interface GroupBuy {
  id: string;
  title: string;
  description: string;
  image: string;
  pricePerUnit: number;
  originalPrice: number;
  currentParticipants: number;
  targetParticipants: number;
  timeLeft: string;
  store: string;
  category: string;
  details: string;
  minimumOrder: number;
  maximumOrder: number;
}

export const getGroupBuyById = (id: string): GroupBuy => {
  return groupBuyData.find(gb => gb.id === id) || groupBuyData[0];
};