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
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

export default authMiddleware;
