module.exports = function () {
  var mysqlExecute = require("../db/db");

  this.getotpData = (req) => {
    console.log(req, "repository");
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const { email, password, otp } = req.body;
        console.log(req.body);
        const query = `SELECT * FROM users WHERE email = ? AND otp = ? AND verified = false`;
        var queryRequest = [email, otp];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        console.log(queryResponse, "here");
        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            const query = `UPDATE users SET verified = true WHERE email = ?`;
            var queryRequest = [email];
            var queryResponse = await mysqlExecuteCall.executeWithParams(
              query,
              queryRequest
            );
            console.log(queryResponse, "response 1");
            if (queryResponse.error == "false") {
              console.log(queryResponse, "response 2");
              resolve({ status: 200, message: "OTP verified successfully" });
            } else {
              resolve({
                status: 401,
                message: "Invalid OTP or email not found",
              });
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
