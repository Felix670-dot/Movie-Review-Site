import pool from '../config/database.js';

export const getReviewsByMovieIdFromDB = async (movieId) => {
  const result = await pool.query(
    `SELECT * FROM reviews WHERE movie_id = $1 ORDER BY created_at DESC`,
    [movieId]
  );
  return result.rows;
};

export const getReviewByIdFromDB = async (id) => {
  const result = await pool.query(
    'SELECT * FROM reviews WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

export const createReviewInDB = async ({ movie_id, reviewer_name, rating, review_text }) => {
  const result = await pool.query(
    `INSERT INTO reviews (movie_id, reviewer_name, rating, review_text)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [movie_id, reviewer_name, rating, review_text]
  );
  return result.rows[0];
};

export const updateReviewInDB = async (id, { reviewer_name, rating, review_text }) => {
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (reviewer_name !== undefined) {
    updates.push(`reviewer_name = $${paramCount++}`);
    values.push(reviewer_name);
  }
  if (rating !== undefined) {
    updates.push(`rating = $${paramCount++}`);
    values.push(rating);
  }
  if (review_text !== undefined) {
    updates.push(`review_text = $${paramCount++}`);
    values.push(review_text);
  }

  if (updates.length === 0) {
    return await getReviewByIdFromDB(id);
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const result = await pool.query(
    `UPDATE reviews 
     SET ${updates.join(', ')}
     WHERE id = $${paramCount}
     RETURNING *`,
    values
  );
  return result.rows[0];
};

export const deleteReviewFromDB = async (id) => {
  const result = await pool.query(
    'DELETE FROM reviews WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];
};

export const getMovieRatingStatsFromDB = async (movieId) => {
  const result = await pool.query(`
    SELECT 
      COALESCE(COUNT(*), 0) as review_count,
      COALESCE(AVG(rating), 0) as average_rating,
      COALESCE(MIN(rating), 0) as min_rating,
      COALESCE(MAX(rating), 0) as max_rating
    FROM reviews
    WHERE movie_id = $1
  `, [movieId]);
  return result.rows[0];
};