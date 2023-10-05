const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const ExpenseController=new (require('../Controller/ExpenseController'))()

router.post('/addexpense', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.addExpenseController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })



  router.get('/getexpensedetails', function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.getListExpenseController(request, function({data}) {
                
                console.log(data)
                return response.send(data)
            })
        

  })

    router.put('/updateexpense/:id', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],function(request, response) {
          console.log(request.params.id)
            // var userControllerObject = new userController()
            IncomeController.updateExpenseController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })

   router.put('/deletesingleexpenserecord/:id', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],function(request, response) {
          console.log(request.params.id)
            // var userControllerObject = new userController()
            IncomeController.deleteExpenseController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })




  router.get('/getDirectTotalExpenseRate',function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.getTotalExpenseController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })

    router.get('/getIndirectTotalExpenseRate',function(request, response) {
        console.log("unpaid")
     
            // var userControllerObject = new userController()
            IncomeController.getIndirectTotalExpenseController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })




module.exports = router;

