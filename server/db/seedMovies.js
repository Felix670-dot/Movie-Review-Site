import pool from '../config.database.js'
import dotenv from 'dotenv';

dotenv.config();

const movies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    release_year: 1994,
    poster_url: null
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    release_year: 2019,
    poster_url: null
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    release_year: 2008,
    poster_url: null
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    release_year: 2018,
    poster_url: null
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    release_year: 1994,
    poster_url: null
  }
];

const seedMovies = async () => {
    try{
        await pool.query('TRUNCATE TABLE movie RESTART IDENTITY CASCADE');
        for(const movie in movies){
            pool.query(
                'INSERT INTO movies (title, description, release_year, poster_url) VALUES ($1, $2, $3, $4)',
                 [movie.title, movie.description, movie.release_year, movie.poster_url]
            );
            console.log('Inserted: ${movie.title}');
        }
        console.log('Succeded seed ${movies.length} movies')
    }
    catch (err){
        console.error('Error loading movie seeds', err)
        throw err;
    }
    finally {
        await pool.end();
    }
}

export default seedMovies;