module.exports = function () {
  var mysqlExecute = require("../db/db");
  var jwt = require("jsonwebtoken");

  this.getUserauthData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const { email } = req;

        const query = `SELECT * FROM userlogin WHERE email = ?`;
        var queryRequest = [email];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            resolve({
              status: 200,
              id: queryResponse.result[0].id,
              message: "User Exists",
              error: "false",
            });
          } else {
            resolve({
              status: 401,
              message: "Invalid Email id or password",
              error: "true",
            });
          }
        } else {
          resolve({ status: 500, message: "Database Error", error: "true" });
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };
};
