const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const IncomeCtrlr=new (require('../Controller/IncomeController'))()
console.log(IncomeCtrlr)
router.post('/addincome',[check('CompanyName').isLength[{min:1}].withMessage['Invalid:$[1],Company Name']],(req,res)=>{

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

