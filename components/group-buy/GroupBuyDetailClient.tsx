'use client';
import { useState } from 'react';
import { Clock, Users, Star, Share2, Heart, CheckCircle, TrendingUp } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import QuantityStepper from '@/components/ui/QuantityStepper';
import { GroupBuy } from '@/lib/group-buy-data';

interface GroupBuyDetailClientProps {
  groupBuy: GroupBuy;
}

export default function GroupBuyDetailClient({ groupBuy }: GroupBuyDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const progressPercentage = Math.min((groupBuy.currentParticipants / groupBuy.targetParticipants) * 100, 100);
  const savings = groupBuy.originalPrice - groupBuy.pricePerUnit;
  const savingsPercentage = Math.round((savings / groupBuy.originalPrice) * 100);

  const handleJoinGroupBuy = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `gb-${groupBuy.id}`,
        name: groupBuy.title,
        price: groupBuy.pricePerUnit,
        image: groupBuy.image,
        store: groupBuy.store,
      });
    }
    console.log('Joined group buy:', groupBuy.title, 'Quantity:', quantity);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-[#2E7D32]';
    if (percentage >= 50) return 'bg-[#FFC107]';
    return 'bg-gray-300';
  };

  // Mock participants data
  const participants = [
    { id: 1, name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 5 },
    { id: 2, name: 'Mike C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 3 },
    { id: 3, name: 'Emma L.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 2 },
    { id: 4, name: 'David R.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 4 },
    { id: 5, name: 'Lisa M.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', quantity: 1 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            <img
              src={groupBuy.image}
              alt={groupBuy.title}
              className="w-full h-full object-cover"
            />
            {savingsPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-lg font-semibold">
                -{savingsPercentage}% OFF
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {groupBuy.timeLeft}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{groupBuy.title}</h1>
            <p className="text-gray-600 mb-3">{groupBuy.description}</p>
            <p className="text-[#2E7D32] hover:underline font-medium">{groupBuy.store}</p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-4xl font-bold text-[#2E7D32]">
                ${groupBuy.pricePerUnit.toFixed(2)}
              </span>
              <span className="text-2xl text-gray-500 line-through">
                ${groupBuy.originalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-green-600 font-semibold">
              You save ${savings.toFixed(2)} per unit ({savingsPercentage}% off)
            </p>
          </div>

          {/* Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Group Progress</h3>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {groupBuy.currentParticipants} of {groupBuy.targetParticipants} people joined
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {groupBuy.targetParticipants - groupBuy.currentParticipants} more needed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(progressPercentage)}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              Ends in: {groupBuy.timeLeft}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <QuantityStepper
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
              max={10}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-lg border transition-colors ${
                isFavorite
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Who's In Section */}
      <div className="mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-[#2E7D32]" />
              Who's In? ({groupBuy.currentParticipants} people)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{participant.name}</p>
                  <p className="text-sm text-gray-600">{participant.quantity} units</p>
                </div>
                <CheckCircle className="w-5 h-5 text-[#2E7D32]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Total for {quantity} units</p>
              <p className="text-xl font-bold text-[#2E7D32]">
                ${(groupBuy.pricePerUnit * quantity).toFixed(2)}
              </p>
            </div>
            <QuantityStepper
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
              max={10}
              size="sm"
            />
          </div>
          <button
            onClick={handleJoinGroupBuy}
            className="w-full bg-[#2E7D32] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1B5E20] transition-colors"
          >
            Join Group Buy
          </button>
        </div>
      </div>

      {/* Desktop Join Button */}
      <div className="hidden lg:block mt-8">
        <button
          onClick={handleJoinGroupBuy}
          className="bg-[#2E7D32] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1B5E20] transition-colors"
        >
          Join Group Buy - ${(groupBuy.pricePerUnit * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}