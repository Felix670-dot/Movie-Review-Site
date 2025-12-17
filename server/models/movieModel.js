import pool from '../config/database.js';

export const getAllMovies = async () => {
  const result = await pool.query(`
    SELECT 
      m.*,
      COALESCE(COUNT(r.id), 0) as review_count,
      COALESCE(AVG(r.rating), 0) as average_rating
    FROM movies m
    LEFT JOIN reviews r ON m.id = r.movie_id
    GROUP BY m.id
    ORDER BY m.created_at DESC
  `);
  return result.rows;
};

export const getMovieById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM movies WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

export const getMovieWithReviews = async (id) => {
  const movieResult = await pool.query(
    'SELECT * FROM movies WHERE id = $1',
    [id]
  );

  if (movieResult.rows.length === 0) {
    return null;
  }

  const reviewsResult = await pool.query(`
    SELECT *
    FROM reviews
    WHERE movie_id = $1
    ORDER BY created_at DESC
  `, [id]);

  const statsResult = await pool.query(`
    SELECT 
      COALESCE(COUNT(r.id), 0) as review_count,
      COALESCE(AVG(r.rating), 0) as average_rating
    FROM reviews r
    WHERE r.movie_id = $1
  `, [id]);

  return {
    ...movieResult.rows[0],
    reviews: reviewsResult.rows,
    review_count: parseInt(statsResult.rows[0].review_count),
    average_rating: parseFloat(statsResult.rows[0].average_rating) || 0
  };
};

export const createMovie = async ({ title, description, release_year, poster_url }) => {
  const result = await pool.query(
    `INSERT INTO movies (title, description, release_year, poster_url)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, release_year, poster_url]
  );
  return result.rows[0];
};

export const updateMovie = async (id, { title, description, release_year, poster_url }) => {
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (title !== undefined) {
    updates.push(`title = $${paramCount++}`);
    values.push(title);
  }
  if (description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(description);
  }
  if (release_year !== undefined) {
    updates.push(`release_year = $${paramCount++}`);
    values.push(release_year);
  }
  if (poster_url !== undefined) {
    updates.push(`poster_url = $${paramCount++}`);
    values.push(poster_url);
  }

  if (updates.length === 0) {
    return await getMovieById(id);
  }

  values.push(id);
  const result = await pool.query(
    `UPDATE movies 
     SET ${updates.join(', ')}
     WHERE id = $${paramCount}
     RETURNING *`,
    values
  );
  return result.rows[0];
};

export const deleteMovie = async (id) => {
  const result = await pool.query(
    'DELETE FROM movies WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];
};