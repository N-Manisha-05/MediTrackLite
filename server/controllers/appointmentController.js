import Appointment from '../models/appointment.js';

export const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      patientId,
      patientName,
      email,
      date,
      time,
      symptoms,
      phone,
      gender
    } = req.body;

    // Ensure a patient can't book more than 2 appointments on the same day
    const existing = await Appointment.find({
      patientId,
      date
    });

    if (existing.length >= 2) {
      return res.status(400).json({ msg: 'Cannot book more than 2 appointments on the same day' });
    }

    const appointment = new Appointment({
      doctorId,
      patientId,
      patientName,
      email,
      date,
      time,
      symptoms,
      phone,
      gender,
      status: 'Pending',                    
      createdAt: new Date()                
    });

    await appointment.save();

    res.status(201).json({ msg: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const getPendingAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const pending = await Appointment.find({ status: 'Pending', doctorId })
      .sort({ createdAt: -1 });

    res.json(pending);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch appointments' });
  }
};




  export const getBookedSlots = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const appointments = await Appointment.find({ doctorId });
  
      const bookedSlots = appointments.map(app => `${app.date}|${app.time}`);
      res.json(bookedSlots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to fetch booked slots' });
    }
  };
  // Doctor updates appointment status (approve/reject)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    // Update appointment
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    res.status(200).json({ msg: `Appointment ${status.toLowerCase()}`, appointment: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to update appointment status' });
  }
};
