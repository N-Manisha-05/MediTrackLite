import mongoose from 'mongoose';

// Regex to validate email ending with @meditrack.local
const emailValidator = (email) => {
  return /^[\w-\.]+@meditrack\.local$/.test(email);
};

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // uniqueness at collection level
    lowercase: true,
    validate: [emailValidator, 'Email must end with @meditrack.local'],
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
