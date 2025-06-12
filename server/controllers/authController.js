// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Doctor from '../models/doctor.js';
import Patient from '../models/patient.js';

export const register = async (req, res) => {
  let { name, email, password, role } = req.body;

<<<<<<< HEAD
=======


>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
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
<<<<<<< HEAD
    const normalizedRole = role.toLowerCase();
=======
   const normalizedRole = role.toLowerCase();
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
    let Model = normalizedRole === 'doctor' ? Doctor : Patient;

    const existingUser = await Model.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

<<<<<<< HEAD
    // Remove manual hashing
    const newUser = new Model({ name, email, password }); 
=======
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({ name, email, password: hashedPassword });
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
    await newUser.save();

    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  let { email, password, role } = req.body;



  try {
    
     const normalizedRole = role.toLowerCase();
    let Model = normalizedRole === 'doctor' ? Doctor : Patient;

    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
<<<<<<< HEAD
      { id: user._id, role: user.role },
=======
      { id: user._id, role: role },
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

<<<<<<< HEAD
  

    res.json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id
      }
    });
    
=======
    res.json({ message: 'Login successful', token });
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
