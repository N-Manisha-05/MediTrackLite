<<<<<<< HEAD

import jwt from 'jsonwebtoken';


const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // Check if Authorization header exists and is properly formatted
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
      }

      // Extract token and verify
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user data to the request object
      req.user = {
        _id: decoded.id,
        role: decoded.role,
        email: decoded.email,
      };

      // Role-based access control (if role is specified)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next(); // Proceed to next middleware or route handler
    } catch (error) {
      console.error('Auth Error:', error);
=======
import jwt from 'jsonwebtoken';

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Get token from Authorization header: "Bearer <token>"
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info from token to req.user
      req.user = decoded;

      // Check if user role matches requiredRole if specified
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
      }

      next();
    } catch (error) {
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

export default authMiddleware;
<<<<<<< HEAD

=======
>>>>>>> b0a349042b6b036bc6f5b2159457c00ab4c47519
