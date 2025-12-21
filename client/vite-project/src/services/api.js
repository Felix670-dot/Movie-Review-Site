import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API || 'http://localhost:5000';

const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
    'Content-Type' : 'application/json',
   } 
});

export const getAllMovies = async () => {
    try {
        const response = await api.get('/api/movies');
        return response.data;
    } catch (error) {
        console.error('Error fetching movies: ', error);
        throw error;
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await api.get(`/api/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie: ', error);
        throw error;
    }
};

export const getMovieReviews = async (id) => {
    try {
        const response = await api.get(`/api/reviews/movie/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie Reviews: ', error);
        throw error;
    }
};