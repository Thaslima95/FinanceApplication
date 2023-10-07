module.exports = function () {
  var mysqlExecute = require("../db/db");
  var jwt = require("jsonwebtoken");

  this.getListLoginData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const { email, password } = req.body;
        const query = `SELECT * FROM userlogin WHERE email = ?`;
        var queryRequest = [email];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            if (queryResponse.result[0].password == password) {
              var token = jwt.sign(
                { email: req.body.email, id: queryResponse.result[0].id },
                "mysecret"
              );

              resolve({
                status: 200,
                id: queryResponse.result[0].id,
                message: "Login Successfull",
                error: "false",
                token: token,
              });
            } else {
              resolve({
                status: 401,
                message: "Invalid Email id or password",
                error: "true",
              });
            }
          } else {
            resolve({
              status: 401,
              message: "Invalid Email id or password",
              error: "true",
            });
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
