'use client';
import { Wallet, ArrowUpRight } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const handleRequestPayout = () => {
    console.log('Request payout clicked');
    // TODO: Implement payout request logic
  };

  return (
    <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl shadow-lg p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Available to Withdraw</h3>
            <p className="text-green-100 text-sm">Ready for payout</p>
          </div>
        </div>
        <ArrowUpRight className="w-6 h-6 text-green-200" />
      </div>

      <div className="mb-8">
        <p className="text-5xl font-bold mb-2">${balance.toFixed(2)}</p>
        <p className="text-green-100">
          Minimum payout amount: $50.00
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p className="text-green-100">Next payout date</p>
          <p className="font-semibold">Every Friday</p>
        </div>
        <button
          onClick={handleRequestPayout}
          disabled={balance < 50}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
            balance >= 50
              ? 'bg-white text-[#2E7D32] hover:bg-gray-100'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          {balance >= 50 ? 'Request Payout' : 'Minimum $50 Required'}
        </button>
      </div>
    </div>
  );
}