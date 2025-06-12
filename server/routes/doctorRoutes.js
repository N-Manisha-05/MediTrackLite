import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  getDoctorProfile,
  getDoctorApprovalStatus, 
  updateDoctorProfile,
} from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();
const protect = authMiddleware();


router.get('/', getAllDoctors);


router.get('/approved', (req, res) => {
  req.query.showAll = 'false'; 
  getAllDoctors(req, res);
});
router.get('/profile/me', protect, getDoctorProfile);
router.put('/profile/me', protect, upload.single('image'), updateDoctorProfile);
router.get('/approval-status', protect, getDoctorApprovalStatus);

router.get('/:id', getDoctorById);

export default router;
