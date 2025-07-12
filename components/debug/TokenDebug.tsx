'use client';

import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import api from '@/lib/api';

export default function TokenDebug() {
  const { token, user, isLoggedIn } = useAuthStore();
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testToken = async () => {
    if (!token) {
      setTestResult('No token available');
      return;
    }

    setIsLoading(true);
    try {
      // Test with a simple API call
      const response = await api.get('/stores');
      setTestResult(`✅ Token valid! Response: ${response.status}`);
    } catch (error: any) {
      setTestResult(`❌ Token invalid: ${error.response?.status} - ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testRefresh = async () => {
    setIsLoading(true);
    try {
      const success = await useAuthStore.getState().refreshToken();
      setTestResult(`Token refresh: ${success ? '✅ Success' : '❌ Failed'}`);
    } catch (error: any) {
      setTestResult(`❌ Refresh error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Token Debug</h3>
      <div className="space-y-2">
        <div>Logged In: {isLoggedIn ? '✅' : '❌'}</div>
        <div>Token: {token ? '✅' : '❌'}</div>
        <div>User: {user?.name || 'None'}</div>
        
        <div className="flex gap-2 mt-2">
          <button 
            onClick={testToken}
            disabled={isLoading}
            className="bg-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50"
          >
            Test Token
          </button>
          <button 
            onClick={testRefresh}
            disabled={isLoading}
            className="bg-green-600 px-2 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
          >
            Test Refresh
          </button>
        </div>
        
        {testResult && (
          <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
            {testResult}
          </div>
        )}
      </div>
    </div>
  );
} 