import { useState } from 'react';
import StarRating from './StarRating';
import './ReviewForm.css'

const ReviewForm = ({ movieId, onSubmit, onCancel }) => {
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!reviewerName.trim()) {
            setError('Please enter your name');
            return;
        }
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }
        if (!reviewText.trim()) {
            setError('Please write a review');
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                movie_Id: movieId, 
                reviewer_name: reviewerName.trim(),
                rating: rating,
                review_text: reviewText.trim()
            });
            // Reset form on success
            setReviewerName('');
            setRating(0);
            setReviewText('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const handleStarHover = (starValue) => {
        setHoveredRating(starValue);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const renderStarInput = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || rating);
            stars.push(
                <button
                    key={i}
                    type="button"
                    className={`star-input ${isFilled ? 'filled' : ''}`}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={handleStarLeave}
                    aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                >
                    {isFilled ? '⭐' : '☆'}
                </button>
            );
        }
        return stars;
    };

    return (
        <div className="review-form-container">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label htmlFor="reviewer-name">Your Name</label>
                    <input
                        type="text"
                        id="reviewer-name"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="Enter your name"
                        disabled={submitting}
                    />
                </div>

                <div className="form-group">
                    <label>Rating</label>
                    <div className="star-rating-input">
                        {renderStarInput()}
                        {rating > 0 && <span className="rating-selected">{rating} / 5</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="review-text">Your Review</label>
                    <textarea
                        id="review-text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        rows="5"
                        disabled={submitting}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="form-actions">
                    <button type="submit" disabled={submitting} className="submit-btn">
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} disabled={submitting} className="cancel-btn">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;