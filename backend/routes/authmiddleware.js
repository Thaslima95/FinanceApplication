const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret"; // Replace with your secret key

function authorizeJWT(req, res, next) {
  // Get the token from the request headers
  const authHeader = req.header("Authorization");

  const token = authHeader.split(" ")[1];
  console.log(token);

  // Check if the token is missing or invalid
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    // Store the decoded token in the request for later use if needed
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  });
}

module.exports = authorizeJWT;
