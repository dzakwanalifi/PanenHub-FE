'use client';
import { Clock, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface GroupBuyCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  pricePerUnit: number;
  originalPrice: number;
  currentParticipants: number;
  targetParticipants: number;
  timeLeft: string;
  store: string;
}

export default function GroupBuyCard({
  id,
  title,
  description,
  image,
  pricePerUnit,
  originalPrice,
  currentParticipants,
  targetParticipants,
  timeLeft,
  store,
}: GroupBuyCardProps) {
  const progressPercentage = Math.min((currentParticipants / targetParticipants) * 100, 100);
  const savings = originalPrice - pricePerUnit;
  const savingsPercentage = Math.round((savings / originalPrice) * 100);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-[#2E7D32]';
    if (percentage >= 50) return 'bg-[#FFC107]';
    return 'bg-gray-300';
  };

  return (
    <Link href={`/group-buy/${id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {savingsPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              -{savingsPercentage}%
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {timeLeft}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            <p className="text-sm text-[#2E7D32] font-medium mt-1">{store}</p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-2xl font-bold text-[#2E7D32]">
              ${pricePerUnit.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-sm text-green-600 font-medium">
              Save ${savings.toFixed(2)}
            </span>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {currentParticipants} of {targetParticipants} joined
              </div>
              <span className="text-sm font-medium text-gray-900">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progressPercentage)}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {targetParticipants - currentParticipants} more needed
            </div>
            <button className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B5E20] transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}