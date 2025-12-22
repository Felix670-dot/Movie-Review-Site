import {Link} from 'react-router-dom';
import StarRating from './StarRating';
import './Moviecard.css';


const MovieCard = ({ movie }) => {
    //const averageRating = movie.rating;
    const posterURL = movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster';
    const reviewCount = movie.review_count || 0;
    const averageRating = movie.average_rating ? parseFloat(movie.average_rating).toFixed(1) : 'N/A';

    return(
        <Link to={`/movie/${movie.id}`} className="movie-card">
            <div className="movie-card-poster">
                <img src={posterURL} alt={`${movie.title} poster`}></img>
            </div>

            <div className="movie-card-info">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-year">{movie.release_year}</p>

                <div classname="movie-card-rating">
                    <StarRating rating={movie.average_rating} showNumber={true} />
                    {reviewCount > 0 && (
                        <span className="review-count">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;