import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from './StarRating'; // Assuming StarRating component is in the same directory or accessible
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export interface Review {
  id: string | number;
  authorName: string;
  authorAvatarUrl?: string;
  authorInitials?: string;
  rating: number; // 0-5
  date: string; // Formatted date string, e.g., "May 20, 2024"
  title?: string;
  comment: string;
  helpfulVotes?: number;
  notHelpfulVotes?: number;
  verifiedPurchase?: boolean;
}

interface ReviewItemProps {
  review: Review;
  onHelpfulVote?: (reviewId: string | number, voteType: 'up' | 'down') => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onHelpfulVote }) => {
  console.log("Rendering ReviewItem for author:", review.authorName);

  const handleVote = (voteType: 'up' | 'down') => {
    if (onHelpfulVote) {
        onHelpfulVote(review.id, voteType);
    }
    console.log(`Voted ${voteType} for review ${review.id}`);
  }

  return (
    <article className="py-6 space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={review.authorAvatarUrl} alt={review.authorName} />
          <AvatarFallback>{review.authorInitials || review.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
                <h4 className="text-sm font-semibold text-foreground">{review.authorName}</h4>
                <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
            <StarRating rating={review.rating} size={16} />
          </div>
          {review.verifiedPurchase && (
            <p className="mt-1 text-xs font-medium text-green-600">Verified Purchase</p>
          )}
        </div>
      </div>

      {review.title && <h5 className="text-md font-semibold text-foreground mt-2">{review.title}</h5>}
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
        {review.comment}
      </p>

      {onHelpfulVote && (
        <div className="flex items-center space-x-4 pt-2">
            <p className="text-xs text-muted-foreground">Was this review helpful?</p>
            <Button variant="outline" size="sm" onClick={() => handleVote('up')}>
                <ThumbsUp className="h-4 w-4 mr-2" /> Yes {review.helpfulVotes ? `(${review.helpfulVotes})` : ''}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleVote('down')}>
                <ThumbsDown className="h-4 w-4 mr-2" /> No {review.notHelpfulVotes ? `(${review.notHelpfulVotes})` : ''}
            </Button>
        </div>
      )}
      <Separator className="mt-6"/>
    </article>
  );
};
export default ReviewItem;