import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://panenhub-backend-49479616918.us-central1.run.app/api/v1';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const backendUrl = `${BACKEND_BASE_URL}/cart/items`;
    
    console.log('Proxying cart items POST request to:', backendUrl);
    console.log('Request body:', body);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Backend cart items POST API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to add item to cart' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Cart items POST API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
