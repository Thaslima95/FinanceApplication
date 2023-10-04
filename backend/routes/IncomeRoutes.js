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

