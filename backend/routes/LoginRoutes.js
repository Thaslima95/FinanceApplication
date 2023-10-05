const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const LoginController=new (require('../Controller/LoginController'))()

router.post('/api/login', function(request, response) {
   
     
         
            LoginController.LoginDetailsController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })

   




module.exports = router;

