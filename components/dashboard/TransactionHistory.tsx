'use client';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  orderId?: string;
  type: 'sale' | 'payout' | 'refund';
  amount: number;
  status: 'cleared' | 'pending' | 'processing' | 'failed';
  description: string;
}

export default function TransactionHistory() {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      date: 'Oct 26, 2023',
      orderId: '#PH12345',
      type: 'sale',
      amount: 25.50,
      status: 'cleared',
      description: 'Order payment received',
    },
    {
      id: '2',
      date: 'Oct 25, 2023',
      orderId: '#PH12344',
      type: 'sale',
      amount: 15.00,
      status: 'cleared',
      description: 'Order payment received',
    },
    {
      id: '3',
      date: 'Oct 24, 2023',
      type: 'payout',
      amount: -500.00,
      status: 'processing',
      description: 'Payout request to bank account',
    },
    {
      id: '4',
      date: 'Oct 23, 2023',
      orderId: '#PH12342',
      type: 'sale',
      amount: 42.75,
      status: 'cleared',
      description: 'Order payment received',
    },
    {
      id: '5',
      date: 'Oct 22, 2023',
      orderId: '#PH12341',
      type: 'refund',
      amount: -12.50,
      status: 'cleared',
      description: 'Order refund processed',
    },
    {
      id: '6',
      date: 'Oct 21, 2023',
      orderId: '#PH12340',
      type: 'sale',
      amount: 67.25,
      status: 'pending',
      description: 'Order payment processing',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      cleared: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      failed: { color: 'bg-red-100 text-red-800', icon: Clock },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTransactionIcon = (type: string, amount: number) => {
    if (amount > 0) {
      return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    } else {
      return <ArrowDownLeft className="w-4 h-4 text-red-600" />;
    }
  };

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        <button className="text-[#2E7D32] hover:underline text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
              <th className="pb-3 text-sm font-medium text-gray-600">Description</th>
              <th className="pb-3 text-sm font-medium text-gray-600">Order ID</th>
              <th className="pb-3 text-sm font-medium text-gray-600">Amount</th>
              <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100">
                <td className="py-4 text-sm text-gray-600">{transaction.date}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    {getTransactionIcon(transaction.type, transaction.amount)}
                    <span className="text-sm text-gray-900">{transaction.description}</span>
                  </div>
                </td>
                <td className="py-4 text-sm font-medium text-gray-900">
                  {transaction.orderId || '-'}
                </td>
                <td className="py-4">
                  <span className={`text-sm font-medium ${
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatAmount(transaction.amount)}
                  </span>
                </td>
                <td className="py-4">
                  {getStatusBadge(transaction.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}