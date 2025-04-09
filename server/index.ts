import express from 'express';
import cors from 'cors';
import assessmentRoutes from './src/routes/assessment';

const app = express();

// Add middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/assessment', assessmentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;