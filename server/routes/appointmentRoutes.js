import express from 'express';
import {
  createAppointment,
  getPendingAppointments,
  updateAppointmentStatus,
  getBookedSlots
} from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Appointment from '../models/appointment.js';

const router = express.Router();
const protect = authMiddleware();
router.post('/', createAppointment);
router.get('/appointments', protect, getPendingAppointments);


router.patch('/update-status/:appointmentId', protect, updateAppointmentStatus);


router.get('/booked-slots/:doctorId', getBookedSlots);


router.get('/pending/patient', authMiddleware('patient'), async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== 'patient') {
      return res.status(403).json({ msg: 'Access denied: not a patient' });
    }

    const pendingAppointments = await Appointment.find({
      patientId: _id,
      status: 'Pending',
    }).sort({ date: 1, time: 1 });

    res.json(pendingAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch appointments' });
  }
});
export default router;
