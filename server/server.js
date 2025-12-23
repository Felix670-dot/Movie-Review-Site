import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewRoutes from './routes/reviews.js';
import movieRoutes from './routes/movies.js';
//import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the static files from the client
app.use(express.static('client/vite-project/dist'))
// app.use(express.static(Path.join(__dirname,'client/dist')))


// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);


app.get('/', (req, res) => { 
  res.status(200).send('Movie Review API Server is Operational. Use /api/movies and /api/reviews endpoints.');
});


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use((req, res) => {
    res.status(404).json({error: 'Route not found'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app; 