// server/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // If you were using environment variables

dotenv.config(); // If you were using environment variables

const app = express();
const port = process.env.PORT || 3001; // Or whatever port you had

app.use(cors({ origin: '*' })); // Or your specific CORS configuration
app.use(express.json()); // If you were parsing JSON request bodies

app.get('/', (req, res) => {
  res.send('Server is running!'); // Or your original simple route
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});