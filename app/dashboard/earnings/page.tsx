'use client';
import { useState } from 'react';
import { Wallet, Download, TrendingUp, Calendar, Menu, X, LayoutDashboard } from 'lucide-react';
import BalanceCard from '@/components/dashboard/BalanceCard';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import Link from 'next/link';

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const periods = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'year', label: 'This year' },
  ];

  const earningsStats = {
    availableBalance: 1250.75,
    pendingBalance: 325.50,
    totalEarnings: 15420.50,
    thisMonthEarnings: 2150.25,
    earningsGrowth: 12.5,
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:inset-0
        `}>
          <div className="flex flex-col flex-grow bg-white shadow-lg">
            <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden mr-3 p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Earnings</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              <Link
                href="/dashboard/mystore"
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              <div className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-[#2E7D32] text-white">
                <Wallet className="w-5 h-5 mr-3" />
                Earnings
              </div>
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          <div className="p-6">
            {/* Mobile Header */}
            <div className="md:hidden mb-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">My Earnings</h1>
                <div className="w-10"></div>
              </div>
            </div>

            {/* Header */}
            <div className="hidden md:block mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">My Earnings</h1>
                  <p className="text-gray-600">Track your sales performance and manage payouts</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    {periods.map((period) => (
                      <option key={period.value} value={period.value}>
                        {period.label}
                      </option>
                    ))}
                  </select>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">${earningsStats.thisMonthEarnings.toFixed(2)}</p>
                    <p className="text-sm text-green-600">+{earningsStats.earningsGrowth}% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">${earningsStats.totalEarnings.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">All time</p>
                  </div>
                  <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">${earningsStats.pendingBalance.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Processing</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="mb-8">
              <BalanceCard balance={earningsStats.availableBalance} />
            </div>

            {/* Transaction History */}
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
}