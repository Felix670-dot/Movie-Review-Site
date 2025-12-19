import express from 'express';
import { 
    getReviewsById, 
    getReviewById, 
    createReview, 
    updateReview, 
    deleteReview,
    getMovieRatingsStats 
} from '../controllers/reviewController.js';

const router = express.Router();
router.get('/movie/:id', getReviewsById);
router.get('/stats/:id', getMovieRatingsStats);
router.post('/', createReview);
router.get('/:id', getReviewById);
router.patch('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;