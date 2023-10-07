const express = require("express");
const router = express.Router();

const otpController = new (require("../Controller/otpController"))();

router.post("/verify_otp", function (req, res) {
  otpController.otpDetailsController(req, function ({ message, status }) {
    return res.status(status).send(message);
  });
});
module.exports = router;
