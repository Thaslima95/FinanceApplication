const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { transport } = require("../utils/email");
const generateOTP = require("../utils/generateOTP");
const otpController = new (require("../Controller/otpController"))();

router.post("/verify-otp", function (request, response) {
  console.log(request);
  otpController.otpDetailsController(request, function ({ message, status }) {
    console.log(status, message);
    return response.status(status).send(message);
  });
});
module.exports = router;
