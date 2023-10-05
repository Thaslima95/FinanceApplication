const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const IncomeController=new (require('../Controller/IncomeController'))()

router.post('/addincome', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.addIncomeController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })


//   app.get('/getincomedetails',(req,res)=>{
   
//     const sql="Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,CreatedAt,BankName,Branch,BeneficiaryName,AccountDetails,ACNO,IFSCCode from income_table where IsDeleted=0";
//     pool.query(sql,(err,data)=>{
//          if(err){
//         console.error("Error executing query: " + err.stack);
//       return res.status(500).json({ error: "Database error" });
//     }
//         return res.json(data)
//     })
// })


  router.get('/getincomedetails', function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.getListIncomeController(request, function({data}) {
                
                console.log(data)
                return response.send(data)
            })
        

  })

    router.put('/updateincome/:id', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],function(request, response) {
          console.log(request.params.id)
            // var userControllerObject = new userController()
            IncomeController.updateIncomeController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })

   router.put('/deletesinglerecord/:id', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],function(request, response) {
          console.log(request.params.id)
            // var userControllerObject = new userController()
            IncomeController.deleteIncomeController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })


  // app.put('/deletesinglerecord/:id',(req,res)=>{
//     const id=req.params.id;
//     const sql=`UPDATE income_table SET IsDeleted=1 where id=${id}`
//     pool.query(sql,(err,data)=>{
//          if(err){
//         console.error("Error executing query: " + err.stack);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (data.affectedRows === 0) {
//       return res.status(404).json({ error: "Record not found" });
//     }
//     res.status(300).json({ message: "Record deleted successfully" });
        
//     })
// })

  router.get('/getTotalIncomeRate',function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.getTotalIncomeController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })

    router.get('/getUnpaidTotalIncomeRate',function(request, response) {
        console.log("unpaid")
     
            // var userControllerObject = new userController()
            IncomeController.getUnpaidTotalIncomeController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })

//   app.get('/getTotalIncomeRate',(req,res)=>{
//     const sql=`Select sum(TotalAmount) as Total from income_table where Status='Paid' and IsDeleted=0`;
//     pool.query(sql,(err,data)=>{
//          if(err){
//         console.error("Error executing query: " + err.stack);
//       return res.status(500).json({ error: "Database error" });
//     }
//         return res.json(data)
//     })
// })


module.exports = router;

