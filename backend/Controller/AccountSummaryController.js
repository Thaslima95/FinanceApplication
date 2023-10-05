module.exports = function () {
  var AccountSummaryServices = require("../service/AccountSummaryService");

  this.addAccountSummaryController = async (req, callback) => {
    var response = {};
    var AccountSummaryServiceObject = new AccountSummaryServices();
    var AccountSummaryService =
      await AccountSummaryServiceObject.addaccountSummaryService(req);
    console.log(AccountSummaryService);
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

  this.getAccountSummaryController = async (req, callback) => {
    var response = {};
    var AccountSummaryServiceObject = new AccountSummaryServices();
    var AccountSummaryService =
      await AccountSummaryServiceObject.getListAccountSummaryService(req);
    console.log(AccountSummaryService);
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
};
