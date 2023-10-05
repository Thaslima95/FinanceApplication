const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { transport } = require("../utils/email");
const generateOTP = require("../utils/generateOTP");
const UserController = new (require("../Controller/UserController"))();

router.post("/register", function (request, response) {
  UserController.UserDetailsController(request, function ({ message, status }) {
    console.log(status, message);
    return response.status(status).send(message);
  });
});
module.exports = router;
