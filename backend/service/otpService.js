module.exports = function () {
  var otpRepo = require("../repository/otpRepository");

  this.otpService = (incomeData) => {
    return new Promise(async function (resolve) {
      var response = {};
      var logindataObject = new otpRepo();
      try {
        var loginresult = await logindataObject.getotpData(incomeData);

        if (loginresult.error == "false") {
          response.error = "false";
          response.userid = loginresult.id;
          response.message = loginresult.message;
          response.status = loginresult.status;
          response.error = "false";

          resolve(response);
        } else {
          response.error = "true";
          response.message = loginresult.message;
          response.status = loginresult.status;
          resolve(response);
        }
      } catch (err) {
        response.error = "true";
        response.message = "OOPS Service Error";
        resolve(response);
      }
    });
  };
};
