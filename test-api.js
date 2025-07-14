// test-api.js
const { default: fetch } = require('node-fetch');

async function testApi() {
  try {
    console.log('Testing API endpoint...');
    const response = await fetch('http://localhost:3000/api/group-buy');
    const data = await response.json();
    
    console.log('API Response:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testApi();
