#!/usr/bin/env node

const http = require('http');

async function testFrontend() {
  console.log('🧪 Testing Frontend after fixes...\n');
  
  try {
    // Test 1: Check if frontend is running
    console.log('1. Testing Frontend Server...');
    const response = await fetch('http://localhost:3000');
    console.log(`   Status: ${response.status}`);
    console.log(`   Content-Type: ${response.headers.get('content-type')}`);
    
    // Test 2: Check CSP headers
    console.log('\n2. Testing CSP Headers...');
    const cspHeader = response.headers.get('content-security-policy');
    if (cspHeader && cspHeader.includes('http://localhost:8080')) {
      console.log('   ✅ CSP allows localhost:8080');
    } else {
      console.log('   ❌ CSP does not allow localhost:8080');
      console.log(`   CSP: ${cspHeader}`);
    }
    
    // Test 3: Check if auth-debug page is accessible
    console.log('\n3. Testing Auth Debug Page...');
    const debugResponse = await fetch('http://localhost:3000/auth-debug');
    console.log(`   Status: ${debugResponse.status}`);
    
    console.log('\n✅ Frontend tests completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Visit http://localhost:3000 to test the main app');
    console.log('2. Visit http://localhost:3000/auth-debug to test authentication');
    console.log('3. Try logging in and adding items to cart');
    console.log('4. Check browser console for any remaining errors');
    
  } catch (error) {
    console.error('❌ Error testing frontend:', error.message);
    console.log('\n🔧 Make sure both servers are running:');
    console.log('- Frontend: npm run dev (in PanenHub-FE)');
    console.log('- Backend: npm run dev (in PanenHub-Backend)');
  }
}

testFrontend(); 