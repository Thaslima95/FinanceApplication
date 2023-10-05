const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../db/db");
const AccountController =
  new (require("../Controller/AccountSummaryController"))();

router.post(
  "/api/account-summary",

  function (request, response) {
    console.log("expense");

    AccountController.addAccountSummaryController(
      request,
      function ({ message, status }) {
        console.log(message);
        console.log(status, "status");
        return response.status(status).send(message);
      }
    );
  }
);

router.get("/api/account-summary", function (request, response) {
  // var userControllerObject = new userController()
  AccountController.getAccountSummaryController(request, function ({ data }) {
    console.log(data);
    return response.send(data);
  });
});

router.put("/api/account-summary/:id", function (request, response) {
  console.log(request.params.id);
  // var userControllerObject = new userController()
  AccountSummaryController.AccountSummaryController(
    request,
    function ({ message, status }) {
      console.log(message);
      console.log(status, "status");
      return response.status(status).send(message);
    }
  );
});

module.exports = router;
