const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret";

function authorizeJWT(req, res, next) {
  const authHeader = req.header("Authorization");

  const token = authHeader.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authorizeJWT;
