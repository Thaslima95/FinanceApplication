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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //allow request to continue and be handled by routes
  next();
});

app.listen(8089, () => {
  console.log("listening backend");
});
