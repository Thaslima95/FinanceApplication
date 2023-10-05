module.exports = function () {
  var mysqlExecute = require("../db/db");

  this.getListAccountSummaryData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const id = req.params.id;
        const query = `SELECT * FROM account_summary`;

        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query);
        if (queryResponse.error == "false") {
          console.log(queryResponse);
          resolve(queryResponse);
        } else {
          resolve(queryResponse);
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };

  this.addSummaryData = (data) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const { account, limit_amount, balance, date } = data.body;
        console.log(date);
        var query = `INSERT INTO account_summary (account, limit_amount, balance, date, created_at, updated_at, is_deleted) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0)`;
        var queryRequest = [account, limit_amount, balance, date];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        console.log(queryResponse);
        if (queryResponse.error == "false") {
          console.log(queryResponse);
          resolve({
            result: queryResponse.result,
            error: "true",
            status: 200,
            message: "already exists",
          });
        } else {
          resolve(queryResponse);
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };

  this.updateSummaryData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const accountId = req.params.id;
        const { account, limit_amount, balance, date } = req.body;

        var query = `UPDATE account_summary SET account = ?, limit_amount = ?, balance = ?, date = ? WHERE id = ?`;
        var queryRequest = [
          account,
          limit_amount,
          balance,
          new Date(date),
          accountId,
        ];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        console.log(queryResponse);
        if (queryResponse.error == "false") {
          resolve({
            status: 200,
            message: "Record updated successfully",
            result: [],
          });
        } else {
          resolve({
            status: 404,
            message: "Record not found",
            result: [],
          });
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };

  this.deleteSummaryData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const accountId = req.params.id;
        const query = `DELETE FROM account_summary WHERE id = ?`;
        var queryRequest = [accountId];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        if (queryResponse.error == "false") {
          if (queryResponse.result.affectedRows == 0) {
            resolve({
              status: 404,
              message: "Record not found",
              error: "true",
            });
          }
          resolve({
            status: 300,
            message: "Record deleted successfully",
            error: "false",
          });
        } else {
          resolve({ status: 500, message: "Database Error", error: "true" });
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };
};
