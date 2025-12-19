import pool from '../config/database.js';

export const getAllMoviesFromDB = async () => {
    const result = await pool.query('SELECT * FROM movies ORDER BY title DESC, id DESC');
    return result.rows;
};

export const getMovieByIdFromDB = async (id) => {
    const result = await pool.query(
        'SELECT * FROM movies WHERE id = $1', 
        [id]
    );
    return result.rows[0];
};

export const createMovieInDB = async ({title, description, release_year, poster_url}) => {
    const result = await pool.query(
        `INSERT INTO movies (title, description, release_year, poster_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, 
        [title, description, release_year, poster_url || null]
    );
    return result.rows[0];
};

export const updateMovieInDB = async (id, {title, description, release_year, poster_url}) => {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined){
        updates.push(`description = $${paramCount++}`);
        values.push(title);
    }
    if (description !== undefined){
        updates.push(`description = $${paramCount++}`);
        values.push(description);
    }
    if (release_year !== undefined){
        updates.push(`release_year = $${paramCount++}`);
        values.push(release_year);
    }
    if(poster_url !== undefined){
        updates.push(`poster_url = $${paramCount++}`);
        values.push(poster_url);
    }
    if (values.length == 0){
        return await getMovieByIdFromDB(id);
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

export const deleteMovieFromDB = async (id) => {
    const result = await pool.query(
        'DELETE FROM movies WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};
