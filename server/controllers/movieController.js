import {
    getAllMoviesFromDB,
    getMovieByIdFromDB,
    createMovieInDB,
    deleteMovieFromDB,
    updateMovieInDB,
} from "../models/movieModel.js";

export const getAllMovies = async (_req, res) => {
    try{
        const movies = await getAllMoviesFromDB();
        res.json(movies);
    } catch (error) {
        console.log("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured retriving movies."});
    }
};

export const getMovieById = async (req, res) => {
    try{
        const { id } = req.params;
        const movie = await getMovieByIdFromDB(id);
        if (!movie){
            return res.status(404).json({error: 'Movie not found.'})
        }
        res.json(movie);
    } catch (error) {
        console.log("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured retriving movie."});
    }
};

export const createMovie = async (req, res) => {
    try {
        const {title, description, release_year, poster_url} = req.body;
        if (!title || !description || !release_year || !poster_url){
            return res.status(400).json({error: 'Missing requeired field: title, description, release_year, poster_url.'})
        }

        const movie = await createMovieInDB({title, description, release_year, poster_url})
        res.status(201).json(movie)
    } catch (error) {
        console.log("Database Error: ", error.message);
        res.status(500).json({error: "Error has occured creating movie."});
    }
};

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, release_year, poster_url } = req.body;
        
        const movie = await updateMovieInDB(id, {title, description, release_year, poster_url});
        
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json(movie);
        } catch (error) {
            console.log("Database Error: ", error.message);
            res.status(500).json({ error: "Error has occured updating movie." });
        }
};

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteMovieFromDB(id);
        
        if (!deleted) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        res.json({ message: 'Movie deleted successfully' });
        } catch (error) {
            console.log("Database Error: ", error.message);
            res.status(500).json({ error: "Error occured trying to delete movie." });
        }
};
