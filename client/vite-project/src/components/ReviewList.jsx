const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length ===0 ){
        return (
            <div className="review-list">
                <h2>Reviews</h2>
                <p>No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="review-list">
            <h2>({reviews.length})revies</h2>
            <div className="reviews-container">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <div className="reviewer-info">
                                <h3 className="reviewer-name">{review.reviewer_name}</h3>
                                <div calssName="review-rating">
                                    ⭐{review.rating}
                                </div>
                            </div>
                            <span className="review-date">{review.created_at}</span>
                        </div>
                        <p className="review-text">{review.review_text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;