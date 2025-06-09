import React from 'react';
import { Star, StarHalf } from 'lucide-react'; // Using lucide-react for icons
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // e.g., 4.5
  maxStars?: number;
  size?: number; // Icon size in pixels
  className?: string;
  showLabel?: boolean;
  labelPrefix?: string;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 20,
  className,
  showLabel = false,
  labelPrefix = "Rating: ",
  interactive = false,
  onRate,
}) => {
  console.log("Rendering StarRating for rating:", rating);

  const handleStarClick = (index: number) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className={cn("fill-yellow-400 text-yellow-400", interactive && "cursor-pointer hover:opacity-80")}
          onClick={() => handleStarClick(i)}
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          key="half"
          size={size}
          className={cn("fill-yellow-400 text-yellow-400", interactive && "cursor-pointer hover:opacity-80")}
          onClick={() => interactive && onRate && onRate(fullStars + 0.5)} // Note: or round up/down as per logic
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className={cn("text-gray-300", interactive && "cursor-pointer hover:fill-yellow-200 hover:text-yellow-200")}
          onClick={() => handleStarClick(fullStars + (hasHalfStar ? 1 : 0) + i)}
        />
      ))}
      {showLabel && <span className="ml-2 text-sm text-muted-foreground">{labelPrefix}{rating.toFixed(1)} / {maxStars}</span>}
    </div>
  );
};
export default StarRating;