module.exports = function () {
  var AccountSummaryServices = require("../service/AccountSummaryService");

  this.addAccountSummaryController = async (req, callback) => {
    var response = {};
    var AccountSummaryServiceObject = new AccountSummaryServices();
    var AccountSummaryService =
      await AccountSummaryServiceObject.addaccountSummaryService(req);

    if (AccountSummaryService.error == "true") {
      response.error = "true";
      response.message = AccountSummaryService.message;
      response.status = AccountSummaryService.status;
    } else {
      response.error = "false";
      response.data = AccountSummaryService.data;
      response.message = AccountSummaryService.message;
      response.status = AccountSummaryService.status;
    }

    callback(response);
  };

  this.getAccountSummaryController = async (req, callback) => {
    var response = {};
    var AccountSummaryServiceObject = new AccountSummaryServices();
    var AccountSummaryService =
      await AccountSummaryServiceObject.getListAccountSummaryService(req);

    if (AccountSummaryService.error == "true") {
      response.error = "true";
      response.message = AccountSummaryService.message;
      response.status = AccountSummaryService.status;
    } else {
      response.error = "false";
      response.data = AccountSummaryService.data;
    }

    callback(response);
  };

  this.updateSummaryController = async (req, callback) => {
    var response = {};
    var AccountSummaryServiceObject = new AccountSummaryServices();
    var accountsummaryresult =
      await AccountSummaryServiceObject.updateAccoutService(req);
    if (accountsummaryresult.error == "true") {
      response.error = "true";
      response.message = accountsummaryresult.message;
      response.status = accountsummaryresult.status;
    } else {
      response.error = "false";
      response.message = accountsummaryresult.message;
      response.data = accountsummaryresult.result;
      response.status = accountsummaryresult.status;
    }

    callback(response);
  };

  this.deleteSummaryController = async (req, callback) => {
    var response = {};
    var AccountSummaryServiceObject = new AccountSummaryServices();
    var accountsummaryresult =
      await AccountSummaryServiceObject.deleteSummaryService(req);
    if (accountsummaryresult.error == "true") {
      response.error = "true";
      response.message = accountsummaryresult.message;
      response.status = accountsummaryresult.status;
    } else {
      response.error = "false";
      response.message = accountsummaryresult.message;
      response.data = accountsummaryresult.result;
      response.status = accountsummaryresult.status;
    }

    callback(response);
  };
};
