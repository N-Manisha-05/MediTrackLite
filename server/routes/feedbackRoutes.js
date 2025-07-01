import express from 'express';
import Feedback from '../models/Feedback.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ default import
import { approveDoctor } from '../controllers/adminController.js';

const router = express.Router();
const protect = authMiddleware();

// POST: Submit feedback (only authenticated patients)
router.post('/', authMiddleware('patient'), async (req, res) => {
  try {
    const { appointmentId, doctorId, rating, comment } = req.body;

    // Prevent multiple feedback submissions
    const existing = await Feedback.findOne({ appointmentId });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted.' });
    }

    const feedback = new Feedback({
      appointmentId,
      doctorId,
      patientId: req.user._id,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Use logged-in doctor's ID from the token (no need to pass it in URL)
router.get('/me', authMiddleware('doctor'), async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ doctorId: req.user._id })
      .populate('patientId', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET: Feedback for a specific appointment (for doctor or patient)
router.get('/appointment/:id', authMiddleware(), async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ appointmentId: req.params.id });

    // Optional: Restrict access to the related doctor or patient only
    if (
      req.user.role === 'doctor' && feedback?.doctorId.toString() !== req.user._id ||
      req.user.role === 'patient' && feedback?.patientId.toString() !== req.user._id
    ) {
      return res.status(403).json({ message: 'Not authorized to view this feedback' });
    }

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// PUT /api/feedback/request-delete/:id
// Correct route for feedback delete request
router.put('/request-delete/:id', protect, async (req, res) => {
  const feedbackId = req.params.id;

  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }

  feedback.deleteRequested = true;
  await feedback.save();

  res.json({ message: 'Deletion request submitted' });
});


// DELETE /api/feedback/:id
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback" });
  }
});

// GET: Feedbacks with deletion requested (for Admin only)
router.get('/delete-requests', authMiddleware('admin'), async (req, res) => {
  try {
    const requests = await Feedback.find({ deleteRequested: true })
      .populate('patientId', 'name')
      .populate('doctorId', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback requests' });
  }
});


export default router;