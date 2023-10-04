const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const IncomeCtrlr=new (require('../Controller/IncomeController'))()

router.post('/addincome', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character')
  ],(req,res)=>{

const error=validationResult(req)
if(error.array().length)
{
    
}
else{
    var body=req.body;
    IncomeCtrlr.addCtrlr(body,(result)=>{
        console.log(result)
    })
}
})
module.exports = router;

