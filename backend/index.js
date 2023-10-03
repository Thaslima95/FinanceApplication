const express=require('express')
const mysql=require('mysql')
const cors=require('cors')
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
const pool = require('./db/db');

const app = express();


const generatepdf = new(require('./sample'))()
const generatepdf2 = new(require('./sample2'))()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.json()) 


app.use(cors())
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //allow request to continue and be handled by routes
  next();
});
app.use('/user', userRoutes);
app.use('/otp', otpRoutes);
function generateShortRandomName() {
  const uuid = uuidv4();
  const shortName = uuid.replace(/-/g, '').substr(0, 10);
  return shortName;
}

// const db=mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"aafiya.",
//     database:"finance"

// })

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

function numberToWords(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function convertChunk(chunk) {
        let words = '';
        if (chunk >= 100) {
            words += units[Math.floor(chunk / 100)] + ' hundred ';
            chunk %= 100;
        }
        if (chunk >= 11 && chunk <= 19) {
            words += teens[chunk - 11] + ' ';
        } else if (chunk >= 10) {
            words += tens[Math.floor(chunk / 10)] + ' ';
            chunk %= 10;
        }
        if (chunk >= 1) {
            words += units[chunk] + ' ';
        }
        return words;
    }

    if (number === 0) {
        return 'zero';
    }

    let result = '';
    let chunkCount = 0;
    while (number > 0) {
        const chunk = number % 1000;
        if (chunk > 0) {
            result = convertChunk(chunk) + ['', 'thousand', 'million', 'billion'][chunkCount] + ' ' + result;
        }
        number = Math.floor(number / 1000);
        chunkCount++;
    }

    return result.trim();
}


app.post('/addincome',(req,res)=>{
 
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
    const sql="INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate) VALUES ?";
    const value=[[companyname,streetaddress,city,state,pincode,placeofsupply,duedate,GSTIN,particulars,psyear,hsnsac,rate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate]];
    pool.query(sql,[value],(err,data)=>{
     if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
     let id=data.insertId;
     req.body.id=id;
     console.log(id)
    const sql=`UPDATE income_table SET InvoiceNumber='PS/${psyear}/00${id}' where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
         return res.status(200).json({"message":"Record Inserted"})
    })
      
})
    
})
app.put('/updateincome/:id',(req,res)=>{
   
const id=req.params.id;

const companyname=req.body.CompanyName;
    const streetaddress=req.body.StreetAddress;
    const city=req.body.City;
    const pincode=req.body.Pincode;
    const state=req.body.State;
    const placeofsupply=req.body.PlaceofSupply;
    const particulars=req.body.Particulars;
    const psyear=req.body.PSYear;
    const GSTIN=req.body.GSTIN;
    const hsnsac=req.body.HSNSAC;
    console.log(req.body.DueDate)
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
    const sql=`Select InvoiceNumber,Status from income_table where id=${id}`;
    pool.query(sql,(err,data)=>{
      if(err)
      {
         console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
      }
      const oldStatus=data[0].Status;
      if(req.body.Status=='Paid' && oldStatus=='UnPaid')
      {
        
        const sql=`Update income_table SET Status='Paid' where id=${id}`;
        pool.query(sql,(err,data)=>{
             if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({status:200, message: "Record updated successfully" });
        })
      }
      else{
       
        const sql="UPDATE income_table SET CompanyName=?,StreetAddress=?,City=?,State=?,Pincode=?,PlaceofSupply=?,GSTIN=?,Particulars=?,PSYear=?,HSNSAC=?,Rate=?,DueDate=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,BalanceDue=?,`Status`=?,Items=?,ActionDate=? where id=?";
pool.query(sql,[companyname,streetaddress,city,state,pincode,placeofsupply,GSTIN,particulars,psyear,hsnsac,rate,duedate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate,id],(err,data)=>{
     if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
     res.status(200).json({status:200, message: "Record updated successfully" });
   
})
      }
    })

})

app.get('/getTotalIncomeRate',(req,res)=>{
    const sql=`Select sum(TotalAmount) as Total from income_table where Status='Paid' and IsDeleted=0`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})

app.get('/getUnpaidTotalIncomeRate',(req,res)=>{
    const sql=`Select sum(TotalAmount) as Total from income_table where Status='UnPaid' and IsDeleted=0`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})


app.get('/getincomedetails',(req,res)=>{
   
    const sql="Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate,CreatedAt from income_table where IsDeleted=0";
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})

app.get('/getsingleincomedetails/:id',(req,res)=>{
    
    const id=req.params.id;
    const sql=`Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,Status,Items,ActionDate,CreatedAt from income_table where id=${id}`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
         const randomFilename = generateShortRandomName() + '.pdf';
    generatepdf.mypdf(data,randomFilename)
    const sql=`UPDATE income_table SET InvoiceFile='Invoice${randomFilename}',InvoiceNumber='PS/${data[0].PSYear}/00${id}' where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        //  return res.status(200).json({"message":"Download Success"})
        res.download(filePath, fileName); 
    })
    })
})


app.get('/generatereceipt/:id',(req,res)=>{
    
    const id=req.params.id;
    const sql=`Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,Status,Items,ActionDate,CreatedAt from income_table where id=${id}`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
         const words=numberToWords(data[0].TotalAmount)+" "+"only";
    const randomFilename = generateShortRandomName() + '.pdf';
    generatepdf2.mypdf2(data,words,randomFilename)
    const sql=`UPDATE income_table SET PaymentReceiptFile='PaymentReceipt${id}(${(new Date(data[0].ActionDate)).toISOString().split("T")[0]})${randomFilename}' where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
          if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Record not updated" });
    }
    res.status(200).json({status:200, message: "Record updated successfully" });
    })
    })
})


app.put('/deletesinglerecord/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`UPDATE income_table SET IsDeleted=1 where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(300).json({ message: "Record deleted successfully" });
        
    })
})


app.post('/addexpense',(req,res)=>{
    console.log(req.body)
    const invoicenumber=req.body.InvoiceNumber;
    const particulars=req.body.Particulars;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const paymentType=req.body.PaymentType;
    const accountType=req.body.AccountType;
    const amount=req.body.Amount;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
    const sql="INSERT INTO expense_table (InvoiceNumber,Particulars,PaymentType,AccountType,Amount,CGST,SGST,IGST,TotalAmount,DueDate,ActionDate) VALUES ?";
    const value=[[invoicenumber,particulars,paymentType,accountType,amount,cgst,sgst,igst,totalamount,duedate,actiondate]];
 pool.query(sql,[value],(err,data)=>{
     if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    
    return res.status(200).json({"message":"Record Inserted"})
 })
   
    
})
app.put('/updateexpense/:id',(req,res)=>{

const id=req.params.id;
  const invoicenumber=req.body.InvoiceNumber;
    const particulars=req.body.Particulars;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const paymentType=req.body.PaymentType;
    const accountType=req.body.AccountType;
    const amount=req.body.Amount;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
const sql="UPDATE expense_table SET InvoiceNumber=?,Particulars=?,DueDate=?,PaymentType=?,AccountType=?,Amount=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,ActionDate=? where id=?";
pool.query(sql,[invoicenumber,particulars,duedate,paymentType,accountType,amount,cgst,sgst,igst,totalamount,actiondate,id],(err,data)=>{
    if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
       if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Record not updated" });
    }
    res.status(200).json({ message: "Record updated successfully" });
})
})


app.get('/getDirectTotalExpenseRate',(req,res)=>{
    const sql="Select sum(TotalAmount) as Total from expense_table where PaymentType='Direct' and IsDeleted=0";
    pool.query(sql,(err,data)=>{
        if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})

app.get('/getIndirectTotalExpenseRate',(req,res)=>{
    const sql=`Select sum(TotalAmount) as Total from expense_table where PaymentType='Indirect' and IsDeleted=0`;
    pool.query(sql,(err,data)=>{
        if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})
app.get('/getexpensedetails',(req,res)=>{
    const sql="SELECT id,InvoiceNumber,CGST,Particulars,PaymentType,AccountType,Amount,SGST,IGST,TotalAmount,DueDate,ActionDate from expense_table where  IsDeleted=0";
    pool.query(sql,(err,data)=>{
        if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})

app.put('/deletesingleexpenserecord/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`UPDATE expense_table SET IsDeleted=1 where id=${id}`
    pool.query(sql,(err,data)=>{
        if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(300).json({ message: "Record deleted successfully" });
        
    })
})

app.get("/api/account-summary", (req, res) => {
  const query = "SELECT * FROM account_summary";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({ results });
  });
});

app.post("/api/account-summary", (req, res) => {
  const { account, limit_amount, balance, date } = req.body;
  const query =
    "INSERT INTO account_summary (account, limit_amount, balance, date, created_at, updated_at, is_deleted) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0)";
  const values = [account, limit_amount, balance, date];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding a new record: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Record added successfully", id: result.insertId });
  });
});

app.put("/api/account-summary/:id", (req, res) => {
  const accountId = req.params.id;
  const { account, limit_amount, balance, date } = req.body;
  const query =
    "UPDATE account_summary SET account = ?, limit_amount = ?, balance = ?, date = ? WHERE id = ?";
  const values = [account, limit_amount, balance, date, accountId];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating record: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Record updated successfully" });
    console.log("Updating record with ID:", accountId);
    console.log("Request body:", req.body);
  });
});

app.delete("/api/account-summary/:id", (req, res) => {
  const accountId = req.params.id;
  const query = "DELETE FROM account_summary WHERE id = ?";
  const values = [accountId];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error deleting record: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
    console.log("Deleting record with ID:", accountId);
  });
});

app.post("/api/login", async (req, res) => {
  console.log("api login")
  const { email, password } = req.body;
  console.log(req.body)
  const getUserQuery = "SELECT * FROM userlogin WHERE email = ?";
  pool.query(getUserQuery, [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
      return;
    }
    console.log(results);
    if (results.length > 0) {
      const user = results[0];
      console.log(user, "user", "password", password);
      if (user.password === password) {
        var token = jwt.sign({email:req.body.email,id:results[0].id}, 'mysecret');   
  res.status(200).json({ userId: user.id, message: "Login successful" ,token:token});

        
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
});




app.listen(8089,()=>{
    console.log("listening backend")
})

