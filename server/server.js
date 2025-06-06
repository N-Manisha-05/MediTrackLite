// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

// DB Connection
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
