module.exports = function () {
  var mysqlExecute = require("../db/db");

  this.getotpData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const { email, password } = req.body;
        const query = `SELECT * FROM users WHERE email = ? AND otp = ? AND verified = false`;
        var queryRequest = [email];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            console.log(queryResponse.result);
            const query = `UPDATE users SET verified = true WHERE email = ?`;
            var queryRequest = [email];
            var queryResponse = await mysqlExecuteCall.executeWithParams(
              query,
              queryRequest
            );
            console.log(queryResponse);
            if (queryResponse.error == "false") {
              console.log(queryResponse);
              resolve({ message: "OTP verified successfully" });
            } else {
              resolve({ message: "Invalid OTP or email not found" });
            }
          }
        } else {
          resolve({ status: 500, message: "Database Error", error: "true" });
          console.log(queryResponse);
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };
};
