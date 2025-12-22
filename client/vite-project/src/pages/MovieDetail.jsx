import { useState, useEffect } from 'react';
import { getMovieById, getMovieReviews, createReview } from '../services/api';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import './MovieDetail.css'; 

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchMovieReviews = async () => {
        try {
            const movieData = await getMovieById(id);
            const reviewsData = await getMovieReviews(id);
            setMovie(movieData);
            setReviews(reviewsData || []);
            setError(null);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Failed to load movie and reviews';
            setError(errorMessage);
            console.error('Error fetching movie and reviews: ', error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchMovieReviews();
            setLoading(false);
        };
        if (id) {
            loadData();
        }
    }, [id]);

    const handleReviewSubmit = async (reviewData) => {
        try {
            await createReview(id, reviewData);
            // Refresh reviews after successful submission
            const reviewsData = await getMovieReviews(id);
            setReviews(reviewsData || []);
            setShowForm(false);
        } catch (error) {
            throw error; // Let ReviewForm handle the error display
        }
    };

    if (loading) {
        return (
            <div className="movie-detail">
                <h1>Movie Review</h1>
                <p>Loading movie and reviews...</p>
            </div>
        );
    }

    if (error && !movie) {
        return (
            <div className="movie-detail">
                <h1>Movie Review</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="movie-detail">
                <h1>Movie Review</h1>
                <p>Movie not found.</p>
            </div>
        );
    }

    return (
        <div className="movie-detail">
            <div className="movie-info">
                <img src={movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster'} alt={`${movie.title} poster`} />
                <div className="movie-details">
                    <h1>{movie.title}</h1>
                    <p className="release-year">{movie.release_year}</p>
                    <StarRating rating={movie.average_rating} showNumber={true} size='large' />
                    <p className="description">{movie.description}</p>
                </div>
            </div>
            
            {!showForm ? (
                <button onClick={() => setShowForm(true)} className="write-review-btn">
                    Write a Review
                </button>
            ) : (
                <ReviewForm 
                    movieId={id} 
                    onSubmit={handleReviewSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}
            
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default MovieDetail;