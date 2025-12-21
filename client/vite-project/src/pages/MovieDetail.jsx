import { useState, useEffect } from 'react';
import { getMovieById, getMovieReviews } from '../services/api';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';


const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect((id) => {
        const fetchMovieReviews = async () => {
            try{
                setloading(true);
                const movieData = await getMovieById(id);
                const reviewsData = await getMovieReviews(id);
                setMovie(movieData);
                setReviews(reviewsData);
                setError(null);
            } catch (error) {
                setError('Failed to load movie and reviews');
                console.error('Error fetching movie and reviews: ', error);
            } finally {
                setloading(false);
            }
        };
        if(id){
            fetchMovieReviews();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="movie-detail">
                <h1>Movie Review</h1>
                <p>Loading movie and reviews...</p>
            </div>
        );
    }

    if (error) {
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
                    <p className="description">{movie.description}</p>
                </div>
            </div>
            <ReviewList reviews={reviews} />
        </div>
    );

};

export default MovieDetail;