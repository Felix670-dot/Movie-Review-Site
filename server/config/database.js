import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

let pool;

if (connectionString) {
    // Vercel Postgres or other cloud databases require SSL
    // Local databases typically don't support SSL
    const isLocal = connectionString.includes('localhost') || 
                   connectionString.includes('127.0.0.1') ||
                   !connectionString.includes('vercel');
    
    pool = new Pool({
        connectionString,
        ssl: isLocal ? false : {
            rejectUnauthorized: false
        }
    });
} else {
    // Local connection using individual env vars
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        ssl: false
    });
}

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;