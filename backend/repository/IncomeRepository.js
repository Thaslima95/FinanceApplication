module.exports = function() {
   
     var mysqlExecute = require('../db/db')
    //  console.log(mysqlExecute)
  
   

    this.addIncomeData = (req) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
              try {
                var mysqlExecuteCall = new mysqlExecute()
                const companyname=req.body.CompanyName;
    const streetaddress=req.body.StreetAddress;
    const city=req.body.City;
    const state=req.body.State;
    const pincode=req.body.Pincode;
    const placeofsupply=req.body.PlaceofSupply;
    const particulars=req.body.Particulars;
    const psyear=req.body.PSYear;
    const GSTIN=req.body.GSTIN;
    const hsnsac=req.body.HSNSAC;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const rate=req.body.Rate;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
    const balancedue=req.body.BalanceDue;
    const status=req.body.Status;
    const details=req.body.Items;
    const bankname=req.body.BankName;
    const branch=req.body.Branch;
    const beneficiaryname=req.body.BeneficiaryName;
    const accountdetails=req.body.AccountDetails;
    const acno=req.body.ACNO;
    const ifsccode=req.body.IFSCCode;
    if(req.body.InvoiceNumber!="")
    {
        var query =`SELECT InvoiceNumber from income_table where InvoiceNumber=? and IsDeleted=0`;
         var queryRequest =[req.body.InvoiceNumber]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)

         if (queryResponse.error == 'false') {
                    if(queryResponse.result.length>0)
                    {
                      resolve({result:queryResponse.result,error:"true",status:403,message:"already exists"})
                    }
                    else{
                        var query="INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode,InvoiceNumber) VALUES ?";
         var queryRequest =[[companyname,streetaddress,city,state,pincode,placeofsupply,duedate,GSTIN,particulars,psyear,hsnsac,rate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate,bankname,branch,beneficiaryname,accountdetails,acno,ifsccode,req.body.InvoiceNumber]]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
if (queryResponse.error == 'false') {
                    resolve({status:200,message:"record insert success",result:[]})
                } else {
                    resolve(queryResponse)
                }

                    }
                } else {
                    resolve(queryResponse)
                }
    }
    else{
        var query =`SELECT InvoiceNumber FROM income_table where IsDeleted=0 ORDER BY InvoiceNumber DESC limit 1`;
                         var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
 if (queryResponse.error == 'false') {
                    console.log(queryResponse)
                    if(queryResponse.result.length>0)
                    {
                        const match = queryResponse.result[0].InvoiceNumber.match(/00(\d+)/);
              let num=Number(match[1])+1;
              let invoiceNumber=`PS/${psyear}/00${num}`
                var query="INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode,InvoiceNumber) VALUES ?";
         var queryRequest =[[companyname,streetaddress,city,state,pincode,placeofsupply,duedate,GSTIN,particulars,psyear,hsnsac,rate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate,bankname,branch,beneficiaryname,accountdetails,acno,ifsccode,invoiceNumber]]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
if (queryResponse.error == 'false') {
                    resolve({status:200,message:"record insert success",result:[]})
                } else {
                    resolve(queryResponse)
                }

                    }
                   
                } else {
                    console.log(queryResponse)
                    resolve(queryResponse)
                }
    }
               
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

    this.getTotalIncomeData = (req) => {
        var output = {}
        return new Promise( async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "Select sum(TotalAmount) as Total from income_table where Status='Paid' and IsDeleted=0"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    console.log(queryResponse)
                    resolve(queryResponse)
                } else {
                    console.log(queryResponse)
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

      this.getUnpaidTotalIncomeData = (req) => {
        var output = {}
        return new Promise( async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "Select sum(TotalAmount) as Total from income_table where Status='UnPaid' and IsDeleted=0"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    console.log(queryResponse)
                    resolve(queryResponse)
                } else {
                    console.log(queryResponse)
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

    
}