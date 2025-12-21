import { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';
import MovieCard from '../components/MovieCard';


const MovieList = () => {
    const [movie, serMovie] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useStae(null);
};