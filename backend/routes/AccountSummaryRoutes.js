const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authorizeJWT = require("./authmiddleware");

const AccountController =
  new (require("../Controller/AccountSummaryController"))();
router.post(
  "/api/account-summary",

  [
    check("account")
      .notEmpty()
      .isString()
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("limit_amount").optional().isNumeric(),
    check("balance").optional().isNumeric(),
    check("date").notEmpty().isISO8601(),
  ],

  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      AccountController.addAccountSummaryController(
        request,
        function ({ message, status }) {
          console.log(message);
          console.log(status, "status");
          return response.status(status).send(message);
        }
      );
    }
  }
);
router.get("/api/account-summary", authorizeJWT, function (request, response) {
  const error = validationResult(request);
  if (error.array().length) {
    return response.status(500).send(error.errors[0].msg);
  } else {
    AccountController.getAccountSummaryController(request, function ({ data }) {
      return response.send(data);
    });
  }
});
router.put(
  "/api/account-summary/:id",
  [
    check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id"),
    check("account")
      .notEmpty()
      .isString()
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("limit_amount").optional().isNumeric(),
    check("balance").optional().isNumeric(),
    check("date").notEmpty().isISO8601(),
  ],
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      AccountController.updateSummaryController(
        request,
        function ({ message, status }) {
          return response.status(status).send(message);
        }
      );
    }
  }
);
router.delete("/api/account-summary/:id", function (request, response) {
  AccountController.deleteSummaryController(
    request,
    function ({ message, status }) {
      return response.status(status).send(message);
    }
  );
});
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { check, validationResult } = require("express-validator");
// const pool = require("../db/db");
// const AccountController =
//   new (require("../Controller/AccountSummaryController"))();

// router.post(
//   "/api/account-summary",

//   function (request, response) {
//     console.log("expense");

//     AccountController.addAccountSummaryController(
//       request,
//       function ({ message, status }) {
//         console.log(message);
//         console.log(status, "status");
//         return response.status(status).send(message);
//       }
//     );
//   }
// );

// router.get("/api/account-summary", function (request, response) {
//   AccountController.getAccountSummaryController(request, function ({ data }) {
//     return response.send(data);
//   });
// });

// router.put("/api/account-summary/:id", function (request, response) {
//   console.log("update");
//   AccountController.updateSummaryController(
//     request,
//     function ({ message, status }) {
//       console.log(message);
//       console.log(status, "status");
//       return response.status(status).send(message);
//     }
//   );
// });

// router.delete("/api/account-summary/:id", function (request, response) {
//   AccountController.deleteSummaryController(
//     request,
//     function ({ message, status }) {
//       console.log(status, message);
//       return response.status(status).send(message);
//     }
//   );
// });

// module.exports = router;
