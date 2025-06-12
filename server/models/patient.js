import mongoose from 'mongoose';

<<<<<<< HEAD

=======
// Same email validation regex
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
const emailValidator = (email) => {
  return /^[\w-\.]+@meditrack\.local$/.test(email);
};

const patientSchema = new mongoose.Schema({
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
  age: Number,
  gender: String,
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
