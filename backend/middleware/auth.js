const jwt = require("jsonwebtoken");
const secret = "super_secret_key_change_me";

function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token" });
    const token = header.split(" ")[1];
    try {
      const payload = jwt.verify(token, secret);
      req.user = payload;
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = { auth, secret };
