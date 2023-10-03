const mysql = require('mysql');
const pool = mysql.createPool({
      host:"localhost",
    user:"root",
    password:"aafiya.",
    database:"finance"
});
module.exports = pool;