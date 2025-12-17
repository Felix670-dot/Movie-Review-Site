import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//app.use(express.static('client/dist'))

// Routes
//app.use('/api/movies', movieRoutes);
//app.use('/api/reviews', reviewRoutes);


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