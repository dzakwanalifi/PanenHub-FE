-- Insert sample products for group buy
INSERT INTO products (title, description, price, unit, stock, category, image_urls, store_id) VALUES
(
  'Bulk Buy: Organic Rice Bundle',
  '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
  45.99,
  'kg',
  100,
  'Makanan',
  '["https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
  gen_random_uuid()
),
(
  'Fresh Vegetable Box',
  'Mixed seasonal vegetables for the whole family. Contains 15+ varieties of fresh produce.',
  29.99,
  'box',
  50,
  'Sayuran',
  '["https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
  gen_random_uuid()
),
(
  'Premium Fruit Basket',
  'Assorted premium fruits delivered fresh. Contains exotic and local seasonal fruits.',
  39.99,
  'basket',
  30,
  'Buah',
  '["https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
  gen_random_uuid()
);

-- Get the product IDs for group buy insertion
WITH inserted_products AS (
  SELECT id, price FROM products 
  WHERE title IN (
    'Bulk Buy: Organic Rice Bundle', 
    'Fresh Vegetable Box', 
    'Premium Fruit Basket'
  )
  ORDER BY title
)
INSERT INTO group_buy_products (
  product_id, 
  original_price, 
  group_price, 
  min_participants, 
  max_participants, 
  current_participants, 
  start_date, 
  end_date, 
  is_active
)
SELECT 
  id,
  CASE 
    WHEN price = 45.99 THEN 52.99
    WHEN price = 29.99 THEN 35.99  
    WHEN price = 39.99 THEN 47.99
  END as original_price,
  price as group_price,
  CASE 
    WHEN price = 45.99 THEN 10
    WHEN price = 29.99 THEN 8
    WHEN price = 39.99 THEN 15
  END as min_participants,
  CASE 
    WHEN price = 45.99 THEN 20
    WHEN price = 29.99 THEN 15
    WHEN price = 39.99 THEN 25
  END as max_participants,
  CASE 
    WHEN price = 45.99 THEN 12
    WHEN price = 29.99 THEN 8
    WHEN price = 39.99 THEN 18
  END as current_participants,
  NOW() as start_date,
  NOW() + INTERVAL '7 days' as end_date,
  true as is_active
FROM inserted_products;
