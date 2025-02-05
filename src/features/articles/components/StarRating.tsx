interface StarRatingProps {
    rating: number;
    onRate: (rating: number) => void;
}

export const StarRating = ({ rating, onRate }: StarRatingProps) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => onRate(star)}
                    role="button"
                    aria-checked={star <= rating}
                    className={`text-2xl ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};