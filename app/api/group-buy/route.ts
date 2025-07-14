import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    console.log('API: Starting group-buy fetch...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    // First, check if we have any group_buy_products
    const { data: groupBuyCheck, error: checkError } = await supabase
      .from('group_buy_products')
      .select('*')
      .eq('is_active', true);

    console.log('Group buy products check:', { data: groupBuyCheck, error: checkError });

    if (checkError) {
      console.error('Error checking group buy products:', checkError);
    }

    // If no active group buy products, create mock data
    if (!groupBuyCheck || groupBuyCheck.length === 0) {
      console.log('No active group buy products found, returning mock data');
      const mockGroupBuys = [
        {
          id: '1',
          title: 'Bulk Buy: Organic Rice Bundle',
          description: '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          pricePerUnit: 45.99,
          originalPrice: 52.99,
          currentParticipants: 12,
          targetParticipants: 20,
          timeLeft: '2 hari 4j',
          store: 'Green Valley Farms',
          category: 'Makanan',
          details: '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
          minimumOrder: 1,
          maximumOrder: 10,
        },
        {
          id: '2',
          title: 'Fresh Vegetable Box',
          description: 'Mixed seasonal vegetables for the whole family. Contains 15+ varieties of fresh produce.',
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          pricePerUnit: 29.99,
          originalPrice: 35.99,
          currentParticipants: 8,
          targetParticipants: 15,
          timeLeft: '5 hari 12j',
          store: 'Sunrise Organic',
          category: 'Sayuran',
          details: 'Mixed seasonal vegetables for the whole family. Contains 15+ varieties of fresh produce.',
          minimumOrder: 1,
          maximumOrder: 5,
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
          timeLeft: '1 hari 8j',
          store: 'Fresh Fields',
          category: 'Buah',
          details: 'Assorted premium fruits delivered fresh. Contains exotic and local seasonal fruits.',
          minimumOrder: 1,
          maximumOrder: 3,
        }
      ];
      return NextResponse.json(mockGroupBuys);
    }

    // Try to get products with group buy data
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        group_buy_products!inner(
          original_price,
          group_price,
          min_participants,
          max_participants,
          current_participants,
          start_date,
          end_date,
          is_active
        )
      `)
      .eq('group_buy_products.is_active', true)
      .order('created_at', { ascending: false });

    console.log('Supabase query result:', { data, error });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch group buy products', details: error.message },
        { status: 500 }
      );
    }

    console.log('Found products:', data?.length || 0);

    // Transform data untuk frontend
    const transformedData = data?.map(product => {
      const groupBuy = product.group_buy_products[0]; // Get first group buy entry
      
      return {
        id: product.id,
        title: product.title || product.name,
        description: product.description,
        image: product.image_urls?.[0] || product.image_url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        pricePerUnit: groupBuy?.group_price || product.price,
        originalPrice: groupBuy?.original_price || product.price * 1.2,
        currentParticipants: groupBuy?.current_participants || 0,
        targetParticipants: groupBuy?.max_participants || 20,
        timeLeft: '2 hari 4j',
        store: 'Toko PanenHub',
        category: product.category || 'Makanan',
        details: product.description,
        minimumOrder: 1,
        maximumOrder: 10,
      };
    });

    console.log('Transformed data:', transformedData);
    return NextResponse.json(transformedData || []);
  } catch (error) {
    console.error('API error:', error);
    
    // Fallback to mock data if there's any error
    console.log('Returning fallback mock data due to error');
    const fallbackMockData = [
      {
        id: '1',
        title: 'Bulk Buy: Organic Rice Bundle',
        description: '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        pricePerUnit: 45.99,
        originalPrice: 52.99,
        currentParticipants: 12,
        targetParticipants: 20,
        timeLeft: '2 hari 4j',
        store: 'Green Valley Farms',
        category: 'Makanan',
        details: '25kg premium organic rice from local farmers. Perfect for families and small businesses.',
        minimumOrder: 1,
        maximumOrder: 10,
      }
    ];
    return NextResponse.json(fallbackMockData);
  }
}
