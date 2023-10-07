module.exports = function () {
  var mysqlExecute = require("../db/db");
  const generateShortRandomName = require("../utils/generateShortRandomName");
  const numberToWords = require("../utils/numberToWords");
  const moment = require("moment");
  const generateinvoicepdf = new (require("../sample"))();
  const generatereceiptpdf = new (require("../sample2"))();

  this.addIncomeData = (data) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const companyname = data.CompanyName;
        const streetaddress = data.StreetAddress;
        const city = data.City;
        const state = data.State;
        const pincode = data.Pincode;
        const placeofsupply = data.PlaceofSupply;
        const particulars = data.Particulars;
        const psyear = data.PSYear;
        const GSTIN = data.GSTIN;
        const hsnsac = data.HSNSAC;
        const duedate = data.DueDate;
        const actiondate = data.ActionDate;
        const rate = data.Rate;
        const cgst = data.CGST;
        const sgst = data.SGST;
        const igst = data.IGST;
        const totalamount = data.TotalAmount;
        const balancedue = data.BalanceDue;
        const status = data.Status;
        const details = data.Items;
        const bankname = data.BankName;
        const branch = data.Branch;
        const beneficiaryname = data.BeneficiaryName;
        const accountdetails = data.AccountDetails;
        const acno = data.ACNO;
        const ifsccode = data.IFSCCode;
        console.log(data.InvoiceNumber);
        if (data.InvoiceNumber != "") {
          var query = `SELECT InvoiceNumber from income_table where InvoiceNumber=? and IsDeleted=0`;
          var queryRequest = [data.InvoiceNumber];
          var queryResponse = await mysqlExecuteCall.executeWithParams(
            query,
            queryRequest
          );
          console.log(queryResponse);
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
                "INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode,InvoiceNumber) VALUES ?";
              var queryRequest = [
                [
                  companyname,
                  streetaddress,
                  city,
                  state,
                  pincode,
                  placeofsupply,
                  duedate,
                  GSTIN,
                  particulars,
                  psyear,
                  hsnsac,
                  rate,
                  cgst,
                  sgst,
                  igst,
                  totalamount,
                  balancedue,
                  status,
                  details,
                  actiondate,
                  bankname,
                  branch,
                  beneficiaryname,
                  accountdetails,
                  acno,
                  ifsccode,
                  data.InvoiceNumber,
                ],
              ];
              var queryResponse = await mysqlExecuteCall.executeWithParams(
                query,
                [queryRequest]
              );
              console.log(queryResponse);
              if (queryResponse.error == "false") {
                resolve({
                  status: 200,
                  message: "record insert success",
                  result: [],
                });
              } else {
                resolve({
                  status: 500,
                  message: "failed to insert",
                  result: [],
                });
              }
            }
          } else {
            resolve({
              status: 500,
              message: "failed to insert",
              result: [],
            });
          }
        } else {
          var query = `SELECT InvoiceNumber FROM income_table where IsDeleted=0 ORDER BY InvoiceNumber DESC limit 1`;
          var queryResponse = await mysqlExecuteCall.executeWithoutParams(
            query
          );
          if (queryResponse.error == "false") {
            if (queryResponse.result.length > 0) {
              const match =
                queryResponse.result[0].InvoiceNumber.match(/00(\d+)/);
              let num = Number(match[1]) + 1;
              let invoiceNumber = `PS/${psyear}/00${num}`;
              var query =
                "INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode,InvoiceNumber) VALUES ?";
              var queryRequest = [
                [
                  companyname,
                  streetaddress,
                  city,
                  state,
                  pincode,
                  placeofsupply,
                  duedate,
                  GSTIN,
                  particulars,
                  psyear,
                  hsnsac,
                  rate,
                  cgst,
                  sgst,
                  igst,
                  totalamount,
                  balancedue,
                  status,
                  details,
                  actiondate,
                  bankname,
                  branch,
                  beneficiaryname,
                  accountdetails,
                  acno,
                  ifsccode,
                  invoiceNumber,
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
                resolve({
                  status: 500,
                  message: "failed to insert",
                  result: [],
                });
              }
            }
          } else {
            resolve({
              status: 500,
              message: "failed to insert",
              result: [],
            });
          }
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        err.status = 500;
        resolve(err);
      }
    });
  };

  this.updateIncomeData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const id = req.params.id;
        const data = req.body;
        const companyname = data.CompanyName;
        const invoicenumber = data.InvoiceNumber;
        const streetaddress = data.StreetAddress;
        const city = data.City;
        const state = data.State;
        const pincode = data.Pincode;
        const placeofsupply = data.PlaceofSupply;
        const particulars = data.Particulars;
        const psyear = data.PSYear;
        const GSTIN = data.GSTIN;
        const hsnsac = data.HSNSAC;
        const duedate = data.DueDate;
        const actiondate = data.ActionDate;
        const rate = data.Rate;
        const cgst = data.CGST;
        const sgst = data.SGST;
        const igst = data.IGST;
        const totalamount = data.TotalAmount;
        const balancedue = data.BalanceDue;
        const status = data.Status;
        const details = data.Items;
        const bankname = data.BankName;
        const branch = data.Branch;
        const beneficiaryname = data.BeneficiaryName;
        const accountdetails = data.AccountDetails;
        const acno = data.ACNO;
        const ifsccode = data.IFSCCode;

        var query = `Select * from income_table where InvoiceNumber=? and id=? and IsDeleted=0`;
        var queryRequest = [invoicenumber, id];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );

        if (queryResponse.error == "false") {
          if (queryResponse.result.length > 0) {
            const query =
              "UPDATE income_table SET CompanyName=?,StreetAddress=?,City=?,State=?,Pincode=?,PlaceofSupply=?,GSTIN=?,Particulars=?,PSYear=?,HSNSAC=?,Rate=?,DueDate=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,BalanceDue=?,`Status`=?,Items=?,ActionDate=?,BankName=?,Branch=?,BeneficiaryName=?,AccountDetails=?,ACNO=?,IFSCCode=? where InvoiceNumber=?";
            var queryRequest = [
              companyname,
              streetaddress,
              city,
              state,
              pincode,
              placeofsupply,
              GSTIN,
              particulars,
              psyear,
              hsnsac,
              rate,
              duedate,
              cgst,
              sgst,
              igst,
              totalamount,
              balancedue,
              status,
              details,
              actiondate,
              bankname,
              branch,
              beneficiaryname,
              accountdetails,
              acno,
              ifsccode,
              invoicenumber,
            ];
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
              resolve(queryResponse);
            }
          } else {
            var query = `Select * from income_table where InvoiceNumber=? and IsDeleted=0`;
            var queryRequest = [invoicenumber];
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
                const query =
                  "UPDATE income_table SET CompanyName=?,StreetAddress=?,City=?,State=?,Pincode=?,PlaceofSupply=?,GSTIN=?,Particulars=?,PSYear=?,HSNSAC=?,Rate=?,DueDate=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,BalanceDue=?,`Status`=?,Items=?,ActionDate=?,BankName=?,Branch=?,BeneficiaryName=?,AccountDetails=?,ACNO=?,IFSCCode=?,InvoiceNumber=? where id=?";
                var queryRequest = [
                  companyname,
                  streetaddress,
                  city,
                  state,
                  pincode,
                  placeofsupply,
                  GSTIN,
                  particulars,
                  psyear,
                  hsnsac,
                  rate,
                  duedate,
                  cgst,
                  sgst,
                  igst,
                  totalamount,
                  balancedue,
                  status,
                  details,
                  actiondate,
                  bankname,
                  branch,
                  beneficiaryname,
                  accountdetails,
                  acno,
                  ifsccode,
                  invoicenumber,
                  id,
                ];
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
                    status: 500,
                    message: "Failed to Update",
                    result: [],
                  });
                }
              }
            } else {
              resolve({
                status: 500,
                message: "Failed to Update",
                result: [],
              });
            }
          }
        } else {
          resolve({
            status: 500,
            message: "Failed to update",
            result: [],
          });
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        err.status = 500;
        resolve(err);
      }
    });
  };

  this.deleteIncomeData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const id = req.params.id;
        const query = `UPDATE income_table SET IsDeleted=1 where id=?`;
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
            status: 200,
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

  this.getTotalIncomeData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        var query =
          "Select sum(TotalAmount) as Total from income_table where Status='Paid' and IsDeleted=0";
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query);
        if (queryResponse.error == "false") {
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

  this.getUnpaidTotalIncomeData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        var query =
          "Select sum(TotalAmount) as Total from income_table where Status='UnPaid' and IsDeleted=0";
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query);
        if (queryResponse.error == "false") {
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
  this.getListIncomeData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        var query =
          "Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,CreatedAt,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode from income_table where IsDeleted=0";
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query);
        if (queryResponse.error == "false") {
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

  this.generateInvoiceData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const id = req.params.id;
        const query = `Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,Status,Items,ActionDate,CreatedAt,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode from income_table where id=?`;
        var queryRequest = [id];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );

        if (queryResponse.error == "false") {
          const randomFilename = generateShortRandomName() + ".pdf";
          const InvoiceDate = moment(queryResponse.result[0].ActionDate).format(
            "DD-MM-YYYY"
          );

          const fileName = `Invoice(${queryResponse.result[0].id})(${InvoiceDate})${randomFilename}`;

          if (fileName) {
            generateinvoicepdf.mypdf(queryResponse.result, fileName);
            const query = `UPDATE income_table SET InvoiceFile=? where id=?`;
            var queryRequest = [fileName, id];
            var queryResponse = await mysqlExecuteCall.executeWithParams(
              query,
              queryRequest
            );

            if (queryResponse.error == "false") {
              resolve({
                status: 200,
                fileName: fileName,
                message: "Download Success",
              });
            } else {
              resolve({
                status: 500,
                message: "Database Error",
                error: "true",
                message: "Dowload Failed",
              });
            }
          }
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

  this.generateReceiptData = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        const id = req.params.id;
        const query = `Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,Status,Items,ActionDate,CreatedAt from income_table where id=?`;
        var queryRequest = [id];
        var queryResponse = await mysqlExecuteCall.executeWithParams(
          query,
          queryRequest
        );
        if (queryResponse.error == "false") {
          const amountword = parseInt(queryResponse.result[0].TotalAmount);
          const words = numberToWords(amountword) + " only";

          const randomFilename = generateShortRandomName() + ".pdf";
          const fileName = `PaymentReceipt(${id})(${moment(
            queryResponse.result[0].ActionDate
          ).format("DD-MM-YYYY")})${randomFilename}`;
          if (fileName) {
            generatereceiptpdf.myreceiptpdf(
              queryResponse.result,
              words,
              fileName
            );
          }

          const query = `UPDATE income_table SET PaymentReceiptFile=? where id=?`;
          var queryRequest = [fileName, id];
          var queryResponse = await mysqlExecuteCall.executeWithParams(
            query,
            queryRequest
          );
          if (queryResponse.error == "false") {
            resolve({
              status: 200,
              fileName: fileName,
              message: "Download Success",
            });
          } else {
            resolve({
              status: 500,
              message: "Database Error",
              error: "true",
              message: "Dowload Failed",
            });
          }
        } else {
          resolve({ status: 500, message: "Database Error", error: "true" });
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        err.status = 500;

        resolve(err);
      }
    });
  };
};
