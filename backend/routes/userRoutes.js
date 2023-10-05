const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const UserController = new (require("../Controller/UserController"))();
router.post(
  "/register",
  [
    check("email")
      .notEmpty()
      .isString()
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("password")
      .notEmpty()
      .isString()
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
  ],
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      UserController.UserDetailsController(
        request,
        function ({ message, status }) {
          console.log(status, message);
          return response.status(status).send(message);
        }
      );
    }
  }
);
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const pool = require("../db/db");
// const { transport } = require("../utils/email");
// const generateOTP = require("../utils/generateOTP");
// const UserController = new (require("../Controller/UserController"))();

// router.post("/register", function (request, response) {
//   UserController.UserDetailsController(request, function ({ message, status }) {
//     console.log(status, message);
//     return response.status(status).send(message);
//   });
// });
// module.exports = router;
