<<<<<<< HEAD

=======
// routes/authRoutes.js
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
