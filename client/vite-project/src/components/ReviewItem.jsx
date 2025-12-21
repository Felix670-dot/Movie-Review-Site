const ReviewItem = ({ review }) => {
    const renderStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="review-item">
            <div className="review-header">
                <div className="reviewer-info">
                    <h3 className="reviewer-name">{review.reviewer_name}</h3>
                    <div className="review-rating">
                        {renderStars(review.rating)}
                    </div>
                </div>
                <span className="review-date">
                    {formatDate(review.created_at)}
                </span>
            </div>
            <p className="review-text">{review.review_text}</p>
        </div>
    );
};

export default ReviewItem;