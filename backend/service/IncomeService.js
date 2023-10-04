
// module.exports=function(){
// const pool = require('../db/db');
// this.addService=async(data,callback)=>{
//     var response={}
//     try{
//         console.log(data)
//     }
//     catch(err)
//     {

//     }
// }
// }


module.exports = function() {
    var addIncomeRepo = require('../repository/IncomeRepository')
   

    this.addIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var addIncomeresult = await incomedataObject.addIncomeData(incomeData)
                console.log(addIncomeresult)
                if (addIncomeresult.result.length > 0) {
                    if (addIncomeresult.error == 'true') {
                        response.error = "true"
                        response.message = "admin login failed"
                        resolve(response)
                    } else {
                            response.error = "false"
                            response.message = "record inserted"
                            
                            response.result = resp
                            resolve(response)
                         
                    }
                } else {
                    response.error = "true"
                    response.message = "invalid admin"
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

}