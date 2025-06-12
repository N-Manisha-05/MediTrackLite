// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
<<<<<<< HEAD
import appointmentRoutes from './routes/appointmentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';


=======
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD


app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true }));


=======
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
// Middleware

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

<<<<<<< HEAD
app.use('/api/admin', adminRoutes);

app.use('/api/appointments', appointmentRoutes);

app.use('/api/doctors', doctorRoutes);

=======
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
// DB Connection
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

<<<<<<< HEAD


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


=======
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
