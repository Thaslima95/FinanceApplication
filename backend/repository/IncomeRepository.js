module.exports = function() {
    const pool = require('../db/db')

    this.addIncomeData = (req) => {
        console.log(req)
        console.log(req.body.CompanyName)
        console.log("repo")
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                
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
      const sql=`SELECT InvoiceNumber from income_table where InvoiceNumber=? and IsDeleted=0`;
      pool.query(sql,[req.body.InvoiceNumber],(err,data)=>{
        if(err){
          console.error("Error executing query: " + err.stack);
    //   return res.status(500).json({ error: "Database error" });
    resolve({status:500,message:"databaserror"})
        }
        else{
          
          if(data.length>0)
          {
             resolve({status:500,message:"already exists"})
          }
          else{
 const sql="INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode,InvoiceNumber) VALUES ?";
          const value=[[companyname,streetaddress,city,state,pincode,placeofsupply,duedate,GSTIN,particulars,psyear,hsnsac,rate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate,bankname,branch,beneficiaryname,accountdetails,acno,ifsccode,req.body.InvoiceNumber]];
          pool.query(sql,[value],(err,data)=>{
            if(err)
            {
              console.error("Error executing query: " + err.stack);
     resolve({status:500,message:"databaserror"})
            }
             resolve({status:200,message:"record insert success"})
          })
          }
         
        }
      })
    }
    else{
       const sql=`SELECT InvoiceNumber FROM income_table where IsDeleted=0 ORDER BY InvoiceNumber DESC`
    pool.query(sql,(err,data)=>{
        if(err)
            {
              console.error("Error executing query: " + err.stack);
     resolve({status:500,message:"databaserror"})
            }
            if(data.length>0)
            {
              const match = data[0].InvoiceNumber.match(/00(\d+)/);
              let num=Number(match[1])+1;
              let invoiceNumber=`PS/${psyear}/00${num}`
              const sql="INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode,InvoiceNumber) VALUES ?";
    const value=[[companyname,streetaddress,city,state,pincode,placeofsupply,duedate,GSTIN,particulars,psyear,hsnsac,rate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate,bankname,branch,beneficiaryname,accountdetails,acno,ifsccode,invoiceNumber]];
            pool.query(sql,[value],(err,data)=>{
              if(err)
              {
                console.error("Error executing query: " + err.stack);
    resolve({status:500,message:"databaserror"})
              }
               resolve({status:200,message:"record insert success"})
            })
  }
    })

    }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

    
}