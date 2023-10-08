const express = require("express");

const cors = require("cors");

var bodyParser = require("body-parser");
var path = require("path");
const userRoutes = require("./routes/userRoutes");
const otpRoutes = require("./routes/otpRoutes");
const IncomeRoutes = require("./routes/IncomeRoutes");
const ExpenseRoutes = require("./routes/ExpenseRoutes");
const LoginRoutes = require("./routes/LoginRoutes");
const AccountSummaryRoutes = require("./routes/AccountSummaryRoutes");
const authorizeJWT = require("./routes/authmiddleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");

  res.setHeader("Access-Control-Allow-Methods", "POST");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use("/user", userRoutes);
app.use("/otp", otpRoutes);

app.use("/file", express.static(path.join(__dirname)));
app.use("/login", LoginRoutes);
app.use("/expense", ExpenseRoutes);
app.use("/income", IncomeRoutes);
app.use("/account", AccountSummaryRoutes);

const jwtBlacklist = [];
app.post("/api/logout", (req, res) => {
  const token = req.header("Authorization");

  if (jwtBlacklist.includes(token)) {
    return res.status(401).json({ error: "Token already revoked" });
  }

  jwtBlacklist.push(token);
  res.status(200).json({ message: "Logout successful" });
});

app.listen(8089, () => {
  console.log("listening backend");
});
