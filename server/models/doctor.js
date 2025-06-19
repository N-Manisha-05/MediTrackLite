

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const emailValidator = (email) => /^[\w.-]+@meditrack\.local$/.test(email);

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w.-]+@meditrack\.local$/,
    validate: [emailValidator, 'Email must end with @meditrack.local'],
  },
  password: { type: String, required: true },
  specialization: { type: String },
  experience: { type: Number },
  bio: { type: String },
  // timings: [{
  //   day: { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
  //   from: { type: String, required: true },
  //   to: { type: String, required: true }
  // }],
  timings: { type: String },

  isAvailable: { type: Boolean, default: true },
  onLeave: { type: Boolean, default: false },
  phone: { type: String },
  imageUrl: { type: String },
   isApproved: {
    type: Boolean,
    default: false,
  },
  role: { type: String, enum: ['doctor'], default: 'doctor' }
}, { timestamps: true });

doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

doctorSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
