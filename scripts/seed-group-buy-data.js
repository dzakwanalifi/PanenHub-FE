// Script untuk menambahkan data group buy ke Supabase
// Jalankan dengan: node scripts/seed-group-buy-data.js

const { createClient } = require('@supabase/supabase-js');

// Manual environment variables - replace with your actual values
const SUPABASE_URL = 'https://vfbzazavjhtqpkhhgpff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYnphemF2amh0cXBraGhncGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDc1MjgsImV4cCI6MjA2NzYyMzUyOH0.m-gnlEopd9YVyUc49DUN3e4A0_R-Y0OQiScYohUKLxc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sampleProducts = [
  {
    title: 'Bulk Buy: Organic Rice Bundle',
    description: '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
    image_urls: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    price: 45.99,
    unit: 'kg',
    stock: 100,
    category: 'Makanan',
    store_id: '11111111-1111-1111-1111-111111111111'
  },
  {
    title: 'Fresh Vegetable Box',
    description: 'Mixed seasonal vegetables for the whole family. Contains 15+ varieties of fresh produce.',
    image_urls: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    price: 29.99,
    unit: 'box',
    stock: 50,
    category: 'Sayuran',
    store_id: '22222222-2222-2222-2222-222222222222'
  },
  {
    title: 'Premium Fruit Basket',
    description: 'Assorted premium fruits delivered fresh. Contains exotic and local seasonal fruits.',
    image_urls: ['https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    price: 39.99,
    unit: 'basket',
    stock: 30,
    category: 'Buah',
    store_id: '33333333-3333-3333-3333-333333333333'
  }
];

async function seedGroupBuyData() {
  try {
    console.log('🌱 Starting to seed group buy data...');

    // 1. Insert products first
    console.log('📦 Inserting products...');
    const { data: products, error: productError } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (productError) {
      console.error('❌ Error inserting products:', productError);
      return;
    }

    console.log('✅ Products inserted successfully:', products.length);

    // 2. Insert group buy data for each product
    console.log('👥 Inserting group buy data...');
    
    const groupBuyData = products.map((product, index) => ({
      product_id: product.id,
      original_price: [52.99, 35.99, 47.99][index],
      group_price: product.price,
      min_participants: [10, 8, 15][index],
      max_participants: [20, 15, 25][index],
      current_participants: [12, 8, 18][index],
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString(), // 7 days from now
      is_active: true
    }));

    const { data: groupBuys, error: groupBuyError } = await supabase
      .from('group_buy_products')
      .insert(groupBuyData)
      .select();

    if (groupBuyError) {
      console.error('❌ Error inserting group buy data:', groupBuyError);
      return;
    }

    console.log('✅ Group buy data inserted successfully:', groupBuys.length);
    console.log('🎉 Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Check if tables exist first
async function checkTables() {
  console.log('🔍 Checking if tables exist...');
  
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    const { data: groupBuys } = await supabase
      .from('group_buy_products')
      .select('id')
      .limit(1);
    
    console.log('✅ Tables exist and are accessible');
    return true;
  } catch (error) {
    console.error('❌ Error accessing tables:', error);
    console.log('💡 Make sure you have created the tables in Supabase:');
    console.log('   - products table');
    console.log('   - group_buy_products table');
    return false;
  }
}

async function main() {
  const tablesExist = await checkTables();
  if (tablesExist) {
    await seedGroupBuyData();
  }
}

main();
