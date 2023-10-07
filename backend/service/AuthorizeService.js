module.exports = function () {
  var authorizeRepo = require("../repository/AuthorizeRepository");

  this.getAuthorizeService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {};

      var authorizeServiceObject = new authorizeRepo();
      try {
        var authorizeServiceresult =
          await authorizeServiceObject.getUserauthData(userData);

        if (authorizeServiceresult.error == "false") {
          response.error = "false";
          response.userid = authorizeServiceresult.id;
          response.message = authorizeServiceresult.message;
          response.status = authorizeServiceresult.status;
          response.token = authorizeServiceresult.token;
          response.error = "false";
          resolve(response);
        } else {
          response.error = "true";
          response.message = authorizeServiceresult.message;
          response.status = authorizeServiceresult.status;
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
