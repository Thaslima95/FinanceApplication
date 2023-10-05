module.exports = function () {
  var UserServices = require("../service/UserService");

  this.UserDetailsController = async (req, callback) => {
    var response = {};
    var UserServiceObject = new UserServices();
    var UserServiceresult = await UserServiceObject.UserService(req);

    if (UserServiceresult.error == "true") {
      response.error = "true";
      response.message = UserServiceresult.message;
      response.status = UserServiceresult.status;
    } else {
      response.error = "false";
      response.id = UserServiceresult.id;
      response.message = UserServiceresult.message;
      response.status = UserServiceresult.status;
    }

    callback(response);
  };
};
