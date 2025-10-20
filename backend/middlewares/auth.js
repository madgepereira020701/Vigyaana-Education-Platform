const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Hardcoded secret key

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach only the user/admin ID
      req.user = { id: decoded.userId, username: decoded.userName }; // ✅ use req.admin for admin routes

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = protect;
