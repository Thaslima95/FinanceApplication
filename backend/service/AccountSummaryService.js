module.exports = function () {
  var AccountSummaryRepo = require("../repository/AccountSummaryRepository");

  this.getListAccountSummaryService = (incomeData) => {
    return new Promise(async function (resolve) {
      var response = {};
      var resp = {};
      var AccountSummarydataObject = new AccountSummaryRepo();
      try {
        var AccountSummaryresult =
          await AccountSummarydataObject.getListAccountSummaryData(incomeData);

        if (AccountSummaryresult.result.length > 0) {
          if (AccountSummaryresult.error == "false") {
            response.error = "false";
            response.data = AccountSummaryresult.result;

            resolve(response);
          } else {
            response.error = "true";
            response.message = "failed to fetch income rate";
            resolve(response);
          }
        } else {
          response.error = "true";
          response.message = "No data";
          resolve(response);
        }
      } catch (err) {
        response.error = "true";
        response.message = "OOPS Service Error";
        resolve(response);
      }
    });
  };

  this.addaccountSummaryService = (incomeData) => {
    return new Promise(async function (resolve) {
      var response = {};
      var resp = {};
      var AccountSummarydataObject = new AccountSummaryRepo();
      try {
        var accountsummaryresult =
          await AccountSummarydataObject.addSummaryData(incomeData);

        if (accountsummaryresult.result.length > 0) {
          if (accountsummaryresult.error == "true") {
            response.error = "true";
            response.message = "already exists";
            response.status = accountsummaryresult.status;
            resolve(response);
          } else {
            response.error = "false";
            response.message = "record inserted";
            response.status = accountsummaryresult.status;
            response.result = resp;

            resolve(response);
          }
        } else {
          response.error = "false";
          response.message = "record inserted";
          response.status = accountsummaryresult.status;
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
