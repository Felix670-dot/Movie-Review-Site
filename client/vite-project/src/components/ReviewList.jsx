import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="review-list">
                <h2>Reviews</h2>
                <p>No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="review-list">
            <h2>Reviews ({reviews.length})</h2>
            <div className="reviews-container">
                {reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewList;