import express from 'express';
// Import all the controllers you created
import { 
    getAllMovies, 
    getMovieById, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} from '../controllers/movieController.js';

const router = express.Router();

// Define your routes
router.get('/', getAllMovies);          // GET /api/movies
router.get('/:id', getMovieById);      // GET /api/movies/123
router.post('/', createMovie);         // POST /api/movies
router.patch('/:id', updateMovie);     // PATCH /api/movies/123
router.delete('/:id', deleteMovie);    // DELETE /api/movies/123

export default router;