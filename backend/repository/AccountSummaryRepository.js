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
        const invoicenumber = data.InvoiceNumber;
        const particulars = data.Particulars;
        const duedate = data.DueDate;
        const actiondate = data.ActionDate;
        const paymentType = data.PaymentType;
        const accountType = data.AccountType;
        const amount = data.Amount;
        const cgst = data.CGST;
        const sgst = data.SGST;
        const igst = data.IGST;
        const totalamount = data.TotalAmount;

        var query = `SELECT InvoiceNumber from expense_table where InvoiceNumber=? and IsDeleted=0`;
        var queryRequest = [data.InvoiceNumber];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );

        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            resolve({
              result: queryResponse.result,
              error: "true",
              status: 403,
              message: "already exists",
            });
          } else {
            var query =
              "INSERT INTO expense_table (InvoiceNumber,Particulars,PaymentType,AccountType,Amount,CGST,SGST,IGST,TotalAmount,DueDate,ActionDate) VALUES ?";
            var queryRequest = [
              [
                invoicenumber,
                particulars,
                paymentType,
                accountType,
                amount,
                cgst,
                sgst,
                igst,
                totalamount,
                duedate,
                actiondate,
              ],
            ];
            var queryResponse = await mysqlExecuteCall.executeWithParams(
              query,
              [queryRequest]
            );
            if (queryResponse.error == "false") {
              resolve({
                status: 200,
                message: "record insert success",
                result: [],
              });
            } else {
              resolve(queryResponse);
            }
          }
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

        var query = `UPDATE account_summary SET account = ?, limit_amount = ?, balance = ?, date = ? WHERE id = ?"`;
        var queryRequest = [account, limit_amount, balance, date, accountId];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
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
        const id = req.params.id;
        const query = `UPDATE expense_table SET IsDeleted=1 where id=?`;
        var queryRequest = [id];
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
