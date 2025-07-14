import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .eq('is_group_buy', true)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Group buy product not found' },
        { status: 404 }
      );
    }

    // Transform data untuk frontend
    const transformedData = {
      id: data.id,
      title: data.name,
      description: data.description,
      image: data.image_url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      pricePerUnit: data.price,
      originalPrice: data.original_price || data.price * 1.2,
      currentParticipants: data.current_participants || 0,
      targetParticipants: data.target_participants || 20,
      timeLeft: '2 days 4h', // TODO: Calculate from end_date
      store: data.store_name || 'PanenHub Store',
      category: data.category || 'Food',
      details: data.description,
      minimumOrder: 1,
      maximumOrder: 10,
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
