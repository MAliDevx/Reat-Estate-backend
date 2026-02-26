const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = 'hrseenu999@gmail.com';
const ADMIN_PASSWORD = 'seenurealestate';
const JWT_SECRET = process.env.JWT_SECRET || 'realestate_admin_secret';

exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
};

exports.verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['x-admin-token'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
      if (!decoded || decoded.email !== ADMIN_EMAIL) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      req.admin = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Auth error' });
  }
};

exports.ADMIN_EMAIL = ADMIN_EMAIL;
exports.ADMIN_PASSWORD = ADMIN_PASSWORD;
