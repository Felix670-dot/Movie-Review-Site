import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewRoutes from './routes/reviews.js';
import movieRoutes from './routes/movies.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. General Middleware
app.use(cors());
app.use(express.json());

// 2. API Routes (MUST COME BEFORE STATIC/CATCH-ALL)
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

/*
app.get('/', (req, res) => { 
  res.status(200).send('Movie Review API Server is Operational. Use /api/movies and /api/reviews endpoints.');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
}); */

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 3. Static Files
const distPath = path.join(__dirname, '../client/vite-project/dist');
app.use(express.static(distPath));

// 4. The Catch-all 
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// 5. Port Listening (Only if not on Vercel/Production)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

export default app;