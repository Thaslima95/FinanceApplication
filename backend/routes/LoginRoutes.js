const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const LoginController=new (require('../Controller/LoginController'))()

router.post('/api/login', function(request, response) {
    console.log("login")
     
            // var userControllerObject = new userController()
            LoginController.LoginDetailsController(request, function({message,status,id}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })

    router.get('/getIndirectTotalExpenseRate',function(request, response) {
        console.log("unpaid")
     
            // var userControllerObject = new userController()
            ExpenseController.getIndirectTotalExpenseController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })




module.exports = router;

