const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
  if (!token) return res.status(401).json({ message: "Malformed token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded data (e.g., user ID) to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
  console.log("Authorization Header:", req.headers.authorization);

  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

};

module.exports = verifyToken;
