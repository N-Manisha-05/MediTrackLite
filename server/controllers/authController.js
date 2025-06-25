

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Doctor from '../models/doctor.js';
import Patient from '../models/patient.js';

// In-memory OTP store (replace with Redis or DB in production)
const otpStore = new Map();
const adminPhoneNumbers = new Set([
  '7396299057',
  '8639834399',
  '7032972738',
  '6300497132'
]);


export const register = async (req, res) => {
    let { name, email, password, role } = req.body;
  
    // Validate email
    if (!validator.isEmail(email) || !email.endsWith('@meditrack.local')) {
      return res.status(400).json({ message: 'Email must be valid and end with @meditrack.local' });
    }
  
    // Validate password strength
    const isStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  
    if (!isStrong) {
      return res.status(400).json({
        message: 'Password must be strong (min 8 chars, upper, lower, number, symbol)',
      });
    }
  
    try {
      const normalizedRole = role.toLowerCase();
      let Model = normalizedRole === 'doctor' ? Doctor : Patient;
  
      const existingUser = await Model.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already registered' });
  
      // ❌ Remove manual hashing
      const newUser = new Model({ name, email, password, role: normalizedRole  }); // Mongoose pre-save hook will hash password
      await newUser.save();
  
      res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  };
  
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await Doctor.findOne({ email });
      let role = 'doctor';
  
      if (!user) {
        user = await Patient.findOne({ email });
        role = 'patient';
      }
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: user._id, role,email: user.email  }, // ✅ inject role based on collection matched
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role // ✅ return it for frontend
        }
      });
  
    } catch (err) {
      res.status(500).json({ message: 'Login failed', error: err.message });
    }
  };
  
  
  
// === SEND OTP ===

export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!adminPhoneNumbers.has(phone)) {
    return res.status(403).json({ message: 'Unauthorized phone number' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  //console.log(`✅ OTP sent to ${phone}: ${otp}`);

  // 👉 Send OTP in the response for frontend use
  res.status(200).json({
    message: 'OTP sent to admin number',
    otp, 
  });
};



// === VERIFY OTP ===
export const verifyOtp = (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore.get(phone);

  if (!record) return res.status(400).json({ message: 'No OTP found' });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ message: 'OTP expired' });
  }
  if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

  otpStore.delete(phone);
  res.status(200).json({ message: 'OTP verified successfully' });
};


export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password required' });
  }

  const isStrong = validator.isStrongPassword(newPassword, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!isStrong) {
    return res.status(400).json({
      message: 'Password must be strong (min 8 chars, upper, lower, number, symbol)',
    });
  }

  try {
    const doctor = await Doctor.findOne({ email }).select('+password');
    const patient = await Patient.findOne({ email }).select('+password');
    const user = doctor || patient;

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;              // DO NOT manually hash here
    await user.save();       

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset error:', err);
    return res.status(500).json({ message: 'Server error during password reset' });
  }
};
