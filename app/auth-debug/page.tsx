'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AuthDebugPage() {
  const { token, user, isLoggedIn, login, logout } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testApiConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL!.replace('/api/v1', '/health'));
      if (response.ok) {
        addTestResult('✅ API Server is reachable');
      } else {
        addTestResult(`❌ API Server responded with ${response.status}`);
      }
    } catch (error) {
      addTestResult(`❌ API Server connection failed: ${error}`);
    }
    setIsLoading(false);
  };

  const testAuthStatus = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/auth/status');
      addTestResult('✅ Auth module is working');
    } catch (error: any) {
      addTestResult(`❌ Auth module error: ${error.response?.status} - ${error.message}`);
    }
    setIsLoading(false);
  };

  const testCartAccess = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/cart');
      addTestResult('✅ Cart access successful');
    } catch (error: any) {
      addTestResult(`❌ Cart access failed: ${error.response?.status} - ${error.message}`);
    }
    setIsLoading(false);
  };

  const testLogin = async () => {
    if (!email || !password) {
      addTestResult('❌ Please enter email and password');
      return;
    }
    
    setIsLoading(true);
    try {
      await login({ email, password });
      addTestResult('✅ Login successful');
    } catch (error: any) {
      addTestResult(`❌ Login failed: ${error.message}`);
    }
    setIsLoading(false);
  };

  const testLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      addTestResult('✅ Logout successful');
    } catch (error: any) {
      addTestResult(`❌ Logout failed: ${error.message}`);
    }
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Authentication Debug Page</h1>
      
      {/* Current Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Logged In:</strong> {isLoggedIn ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
            <p><strong>User:</strong> {user?.name || 'None'}</p>
            <p><strong>Email:</strong> {user?.email || 'None'}</p>
          </div>
          <div>
            <p><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
            <p><strong>Cart Items:</strong> {cart?.items?.length || 0}</p>
            <p><strong>Cart Total:</strong> {cart?.total_price || 0}</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Login</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={testLogin} disabled={isLoading}>
            Test Login
          </Button>
          <Button onClick={testLogout} disabled={isLoading} variant="outline">
            Test Logout
          </Button>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">API Tests</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={testApiConnection} disabled={isLoading}>
            Test API Connection
          </Button>
          <Button onClick={testAuthStatus} disabled={isLoading}>
            Test Auth Status
          </Button>
          <Button onClick={testCartAccess} disabled={isLoading}>
            Test Cart Access
          </Button>
          <Button onClick={fetchCart} disabled={isLoading}>
            Fetch Cart
          </Button>
        </div>
      </div>

      {/* Test Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test Results</h2>
          <Button onClick={clearResults} variant="outline" size="sm">
            Clear Results
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-500 italic">No test results yet. Click the test buttons above.</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-2 font-mono text-sm">
                {result}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 