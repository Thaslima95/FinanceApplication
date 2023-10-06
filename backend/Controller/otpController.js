module.exports = function () {
  var otpServices = require("../service/otpService");

  this.otpDetailsController = async (req, callback) => {
    var response = {};
    var otpServiceObject = new otpServices();
    var otpServiceresult = await otpServiceObject.otpService(req);

    if (otpServiceresult.error == "true") {
      response.error = "true";
      response.message = otpServiceresult.message;
      response.status = otpServiceresult.status;
    } else {
      response.error = "false";
      response.id = otpServiceresult.id;
      response.message = otpServiceresult.message;
      response.status = otpServiceresult.status;
    }
    console.log(response);

    callback(response);
  };
};
