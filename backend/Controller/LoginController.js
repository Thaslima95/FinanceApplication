module.exports = function () {
  var LoginServices = require("../service/LoginService");

  this.LoginDetailsController = async (req, callback) => {
    var response = {};
    var LoginServiceObject = new LoginServices();
    var LoginService = await LoginServiceObject.getListLoginService(req);
    console.log(LoginService);
    if (LoginService.error == "true") {
      response.error = "true";
      response.message = LoginService.message;
      response.status = LoginService.status;
    } else {
      console.log(LoginService);
      response.error = "false";
      response.id = LoginService.id;
      response.message = LoginService.message;
      response.status = LoginService.status;
      response.token = LoginService.token;
    }

    callback(response);
  };
};
