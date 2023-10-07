module.exports = function () {
  var authrorizeservice = require("../service/AuthorizeService");

  this.AuthorizeController = async (req, callback) => {
    var response = {};
    var authorizeserviceObject = new authrorizeservice();
    var authorizeserviceresult =
      await authorizeserviceObject.getAuthorizeService(req);

    if (authorizeserviceresult.error == "true") {
      response.error = "true";
      response.message = authorizeserviceresult.message;
      response.status = authorizeserviceresult.status;
    } else {
      response.error = "false";
      response.id = authorizeserviceresult.id;
      response.message = authorizeserviceresult.message;
      response.status = authorizeserviceresult.status;
      response.token = authorizeserviceresult.token;
    }

    callback(response);
  };
};
