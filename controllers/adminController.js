const { ADMIN_EMAIL, ADMIN_PASSWORD, generateToken } = require('../middleware/auth');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateToken({ email, role: 'admin' });
      return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    next(error);
  }
};
