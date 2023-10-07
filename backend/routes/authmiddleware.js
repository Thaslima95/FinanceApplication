const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret";
const AuthController = new (require("../Controller/AuthourizeController"))();
function authorizeJWT(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded;

    AuthController.AuthorizeController(req.user, function ({ status }) {
      if (status == 200) {
        next();
      }
    });
  });
}

module.exports = authorizeJWT;
