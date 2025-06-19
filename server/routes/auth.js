// routes/authRoutes.js
// import express from 'express';
// import { register, login } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;
import express from 'express';
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
