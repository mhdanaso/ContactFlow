const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check for Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from: Bearer TOKEN
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save user information on the request
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, no token'
    });
  }
};

module.exports = protect;