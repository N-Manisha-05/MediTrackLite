import express from 'express';
import {
  createAppointment,
  getPendingAppointments,
  updateAppointmentStatus,
  getBookedSlots
} from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Appointment from '../models/appointment.js';
import { getAppointmentsForPatient } from '../controllers/appointmentController.js';



const router = express.Router();
const protect = authMiddleware();
router.post('/', createAppointment);
router.get('/appointments', protect, getPendingAppointments);


router.patch('/update-status/:appointmentId', protect, updateAppointmentStatus);


router.get('/booked-slots/:doctorId', getBookedSlots);

router.get('/status/patient', authMiddleware('patient'), getAppointmentsForPatient);

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



router.get('/status/patient/:patientId', protect, async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'name')
      .exec();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH update status
router.patch('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Appointment not found' });
    // Add doctorId only when approved:
if (status === 'Approved') {
  updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status, doctorId: req.user.id }, // <-- add doctorId
    { new: true }
  );
} else {
  updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
}


    res.json({ msg: `Appointment ${status.toLowerCase()} successfully`, appointment: updated });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ msg: 'Failed to update appointment status' });
  }
});

router.get('/status/patient/:id', authMiddleware(), async (req, res) => {
  try {
    const patientId = req.params.id;
    const appointments = await Appointment.find({ patientId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch appointments' });
  }
});
import mongoose from 'mongoose'; // Add this at the top if not already

router.get('/my', protect, async (req, res) => {
  try {
    const doctorId = new mongoose.Types.ObjectId(req.user._id); // 👈 Convert string to ObjectId
    console.log('🔍 Doctor ID from token:', doctorId);

    const appointments = await Appointment.find({
      doctorId,
      status: 'Approved',
    }).sort({ date: 1, time: 1 });

    console.log('✅ Appointments found:', appointments);
    res.json(appointments);
  } catch (err) {
    console.error('❌ Error fetching appointments:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});





export default router;
