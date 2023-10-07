module.exports = function () {
  var mysqlExecute = require("../db/db");
  var jwt = require("jsonwebtoken");
  const generateOTP = require("../utils/generateOTP");
  const { transport } = require("../utils/email");

  this.getUserData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const { email, password } = req.body;
        const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
        var queryRequest = [email];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            resolve({
              status: 301,
              message: "Email Already Exists",
              error: "true",
            });
          } else {
            const otp = generateOTP();
            const query = `INSERT INTO users (email, password, verified, otp) VALUES ?`;
            var queryRequest = [[email, password, false, otp]];
            var queryResponse = await mysqlExecuteCall.executeWithParams(
              query,
              [queryRequest]
            );
            transport.sendMail(
              {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "OTP Verification",
                text: `Your OTP is: ${otp}`,
              },
              (err, info) => {
                if (err) {
                  return res.status(500).json({ message: "Server error" });
                }
              }
            );
            const query1 = `INSERT into userlogin (email,password) VALUES ?`;
            var queryRequest = [[email, password]];
            var queryResponse = await mysqlExecuteCall.executeWithParams(
              query1,
              [queryRequest]
            );
            resolve({
              status: 201,
              message: "User Registered",
              error: "false",
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
