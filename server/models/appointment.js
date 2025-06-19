

import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  timing: { type: String, required: true },
}, { _id: false });


const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  patientName: String,
  email: String,
  date: {type : String , required : true},
  time: {type : String , required : true},
  symptoms: String,
  phone: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  prescription: { type: String, default: '' },
  medicines: [medicineSchema],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Confirmed', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Appointment', appointmentSchema);

