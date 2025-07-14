// Simple insert script - hanya ke products table dulu
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vfbzazavjhtqpkhhgpff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYnphemF2amh0cXBraGhncGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDc1MjgsImV4cCI6MjA2NzYyMzUyOH0.m-gnlEopd9YVyUc49DUN3e4A0_R-Y0OQiScYohUKLxc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkData() {
  console.log('🔍 Checking existing data...');
  
  // Check products
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('*');
    
  console.log('📦 Products in database:', products?.length || 0);
  if (prodError) console.log('Products error:', prodError);
  
  // Check group buy products with product details
  const { data: groupBuys, error: gbError } = await supabase
    .from('group_buy_products')
    .select(`
      *,
      products (
        id,
        title,
        description,
        price,
        image_urls,
        category
      )
    `);
    
  console.log('👥 Group buy products in database:', groupBuys?.length || 0);
  if (gbError) console.log('Group buy error:', gbError);
  
  // Show sample group buy data
  if (groupBuys && groupBuys.length > 0) {
    console.log('📋 Sample group buy data:');
    groupBuys.slice(0, 2).forEach((gb, index) => {
      console.log(`${index + 1}. ${gb.products?.title || 'No title'}`);
      console.log(`   Current: ${gb.current_participants}/${gb.max_participants}`);
      console.log(`   Price: $${gb.group_price} (was $${gb.original_price})`);
    });
  }
  
  return {
    products: products || [],
    groupBuys: groupBuys || []
  };
}

checkData();
