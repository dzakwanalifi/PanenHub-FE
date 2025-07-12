#!/usr/bin/env node

const https = require('https');
const http = require('http');

const API_BASE_URL = 'https://panenhub-backend-49479616918.us-central1.run.app';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing PanenHub Backend API...\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthCheck = await makeRequest(`${API_BASE_URL}/health`);
    console.log(`   Status: ${healthCheck.status}`);
    console.log(`   Response: ${JSON.stringify(healthCheck.data)}\n`);
    
    // Test 2: Auth Status
    console.log('2. Testing Auth Status...');
    const authStatus = await makeRequest(`${API_BASE_URL}/api/v1/auth/status`);
    console.log(`   Status: ${authStatus.status}`);
    console.log(`   Response: ${JSON.stringify(authStatus.data)}\n`);
    
    // Test 3: Stores (Public)
    console.log('3. Testing Stores Endpoint...');
    const stores = await makeRequest(`${API_BASE_URL}/api/v1/stores`);
    console.log(`   Status: ${stores.status}`);
    console.log(`   Response: ${JSON.stringify(stores.data, null, 2)}\n`);
    
    // Test 4: Products (Public)
    console.log('4. Testing Products Endpoint...');
    const products = await makeRequest(`${API_BASE_URL}/api/v1/products`);
    console.log(`   Status: ${products.status}`);
    console.log(`   Response: ${JSON.stringify(products.data, null, 2)}\n`);
    
    // Test 5: Cart (Should return 401 without auth)
    console.log('5. Testing Cart Endpoint (should return 401)...');
    const cart = await makeRequest(`${API_BASE_URL}/api/v1/cart`);
    console.log(`   Status: ${cart.status}`);
    console.log(`   Response: ${JSON.stringify(cart.data)}\n`);
    
    console.log('✅ API tests completed!');
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testAPI(); 