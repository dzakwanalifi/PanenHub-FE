'use client';
import { Users, Clock, Package, TrendingUp } from 'lucide-react';
import GroupBuyCard from '@/components/group-buy/GroupBuyCard';
import { groupBuyData } from '@/lib/group-buy-data';

export default function GroupBuyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Group Buy</h1>
        <p className="text-gray-600">Join group purchases to get better prices on bulk orders</p>
      </div>

      {/* How it works section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How Group Buy Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Join a Group</h3>
            <p className="text-sm text-gray-600">Find products you want and join other buyers</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reach Target</h3>
            <p className="text-sm text-gray-600">Wait for enough people to join the group</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Delivered</h3>
            <p className="text-sm text-gray-600">Enjoy bulk pricing and fresh delivery</p>
          </div>
        </div>
      </div>

      {/* Active Group Buys */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Group Buys</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupBuyData.map((groupBuy) => (
            <GroupBuyCard
              key={groupBuy.id}
              id={groupBuy.id}
              title={groupBuy.title}
              description={groupBuy.description}
              image={groupBuy.image}
              pricePerUnit={groupBuy.pricePerUnit}
              originalPrice={groupBuy.originalPrice}
              currentParticipants={groupBuy.currentParticipants}
              targetParticipants={groupBuy.targetParticipants}
              timeLeft={groupBuy.timeLeft}
              store={groupBuy.store}
            />
          ))}
        </div>
      </div>
    </div>
  );
}