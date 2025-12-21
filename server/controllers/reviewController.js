import {
    getReviewsByMovieIdFromDB,
    getReviewByIdFromDB,
    createReviewInDB,
    updateReviewInDB,
    deleteReviewFromDB,
    getMovieRatingStatsFromDB
} from "../models/reviewModel.js";

export const getReviewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const reviews = await getReviewsByMovieIdFromDB(id);

        if (!reviews || reviews.length == 0){
            return res.json([]);
        }

        res.json(reviews);
    } catch (error) {
        console.error("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured retriving movie reviews."});
    }
};

export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await getReviewByIdFromDB(id);
        if (!review){
            return res.status(404).json({error: 'Review not found.'})
        }
        res.json(review);
    } catch (error) {
        console.error("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured retriving specific review."});
    }
};

export const createReview = async (req, res) => {
    try {
        const {movie_id, reviewer_name, rating, review_text} = req.body;
        if (!movie_id || !reviewer_name || !rating || !review_text) {
            return res.status(400).json({error: 'Missing required field: reviewer_name, rating, review_text.'})
        }
        if( rating < 1 || rating > 5) {
            return res.status(400).json({error: 'Rating is not is not between 1 and 5'})
        }

        const review = await createReviewInDB({movie_id, reviewer_name, rating, review_text})
        res.status(201).json(review)

    } catch (error) {
        console.error("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured creating review."});
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const {reviewer_name, rating, review_text} = req.body;

        const review = await updateReviewInDB(id, {reviewer_name, rating, review_text})

        if (!review){
            return res.status(404).json({ error: "Review not found. Cannot update." });
        }

        res.status(200).json(review)

    } catch (error) {
        console.error("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured updating review."});
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteReviewFromDB(id);
        
        if (!deleted) {
          return res.status(404).json({ error: 'Review not found' });
        }

        res.json({ message: 'Review deleted successfully' });
        } catch (error) {
            console.error("Database Error: ", error.message);
            res.status(500).json({ error: "Error occured trying to delete Review." });
        }
};

export const getMovieRatingsStats = async (req, res) => {
    try {
        const { id } = req.params;
        const stats = await getMovieRatingStatsFromDB(id);
        
        if (!stats) {
          return res.status(404).json({ error: 'Ratings stats were not found' });
        }

        res.json(stats);
        } catch (error) {
            console.error("Database Error: ", error.message);
            res.status(500).json({ error: "Error occured trying to retrieve rating stats." });
        }
};
