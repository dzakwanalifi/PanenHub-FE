import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
}

export default function StarRating({ rating, size = 'md', showRating = false }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} text-yellow-400 fill-current`}
          />
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half star
        const percentage = ((rating % 1) * 100);
        stars.push(
          <div key={i} className="relative">
            <Star
              className={`${sizeClasses[size]} text-gray-300`}
            />
            <div 
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${percentage}%` }}
            >
              <Star
                className={`${sizeClasses[size]} text-yellow-400 fill-current`}
              />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} text-gray-300`}
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {renderStars()}
      </div>
      {showRating && (
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      )}
    </div>
  );
}