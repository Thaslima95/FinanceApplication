const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { transport } = require("../utils/email");
const generateOTP = require("../utils/generateOTP");
const otpController = new (require("../Controller/otpController"))();

// router.post("/verify-otp", function (request, response) {
//   console.log(request, "verify otttp");
//   otpController.otpDetailsController(request, function ({ message, status }) {
//     console.log(status, message);
//     return response.status(status).send(message);
//   });
// });

router.post("/verify_otp", function (req, res) {
  const { email, otp } = req.body;
  console.log(email);
  otpController.otpDetailsController(req, function ({ message, status }) {
    console.log(status, message, "routes");
    return res.status(status).send(message);
  });

  // Check if the provided OTP matches the one in the database
  // pool.query(
  //   "SELECT * FROM users WHERE email = ? AND otp = ? AND verified = false",
  //   [email, otp],
  //   (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).json({ message: "Server error" });
  //     }
  //     console.log(results);
  //     if (results.length > 0) {
  //       // OTP is correct, mark the email as verified
  //       pool.query(
  //         "UPDATE users SET verified = true WHERE email = ?",
  //         [email],
  //         (err) => {
  //           if (err) {
  //             console.error(err);
  //             return res.status(500).json({ message: "Server error" });
  //           }
  //           return res.json({ message: "OTP verified successfully" });
  //         }
  //       );
  //     } else {
  //       return res
  //         .status(500)
  //         .json({ message: "Invalid OTP or email not found" });
  //     }
  //   }
  // );
});
module.exports = router;
