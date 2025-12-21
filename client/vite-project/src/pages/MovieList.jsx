import { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';
import MovieCard from '../components/MovieCard';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                setloading(true);
                const data = await getAllMovies();
                setMovies(data);
                setError(null);
            } catch (error) {
                setError('Failed to load movies');
                console.error('Error fetching movies: ', error);
            } finally {
                setloading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading){
        return(
            <div className="movie-list-container">
                <h1>Movie Reviews</h1>
                <p>Loading movies...</p>
            </div>
        );
    }

    if (error) {
        return(
            <div className="movie-list-container">
                <h1>Movie Reviews</h1>
                <p>{error}</p>
            </div>
        );
    }

    return(
        <div className="movie-list-container">
            <h1>Movie Reviews</h1>
            {movies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                )
            }
        </div>
    );
};

export default MovieList;