const StarRating = ({ rating, maxRating = 5, showNumber = false, size = 'medium' }) => {
    // Handle null/undefined ratings
    if (rating === null || rating === undefined || rating === 0) {
        return (
            <div className={`star-rating star-rating-${size}`}>
                <span className="no-rating">No rating</span>
            </div>
        );
    }

    // Convert to number and round for display
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    const roundedRating = Math.round(numericRating);
    const displayRating = numericRating.toFixed(1);

    // Generate star display
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            if (i <= roundedRating) {
                stars.push(<span key={i} className="star star-filled">⭐</span>);
            } else {
                stars.push(<span key={i} className="star star-empty">☆</span>);
            }
        }
        return stars;
    };

    return (
        <div className={`star-rating star-rating-${size}`}>
            <div className="stars">
                {renderStars()}
            </div>
            {showNumber && (
                <span className="rating-number">({displayRating})</span>
            )}
        </div>
    );
};

export default StarRating;