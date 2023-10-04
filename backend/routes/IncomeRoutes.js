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


module.exports = router;

