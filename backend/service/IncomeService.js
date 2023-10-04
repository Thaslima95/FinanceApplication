
module.exports = function() {
    var addIncomeRepo = require('../repository/IncomeRepository')
    
   

    this.addIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var addIncomeresult = await incomedataObject.addIncomeData(incomeData)
              console.log(addIncomeresult.result.length > 0)
              console.log("response1")
                if (addIncomeresult.result.length > 0) {
                   console.log("response2")
                    if (addIncomeresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "already exists"
                        response.status=addIncomeresult.status
                        resolve(response)
                    } else {
                        console.log("response3")
                        console.log(addIncomeresult)
                            response.error = "false"
                            response.message = "record inserted"
                            response.status=addIncomeresult.status
                            response.result = resp
                            console.log('response')
                            console.log(response)
                            resolve(response)
                         
                    }
                } else {
                    response.error = "false"
                    response.message = "record inserted"
                    response.status=addIncomeresult.status
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

    
    this.getTotalIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var getTotalIncomeresult = await incomedataObject.getTotalIncomeData(incomeData)
            
                if (getTotalIncomeresult.result.length > 0) {
                   
                    if (getTotalIncomeresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=getTotalIncomeresult.result[0]
                       
                        resolve(response)
                    } else {
                            response.error = "true"
                            response.message = "failed to fetch income rate"
                            resolve(response)
                         
                    }
                } else {
                    response.error = "true"
                    response.message = "No data"
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

     this.getUnpaidTotalIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var getTotalIncomeresult = await incomedataObject.getUnpaidTotalIncomeData(incomeData)
            
                if (getTotalIncomeresult.result.length > 0) {
                   
                    if (getTotalIncomeresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=getTotalIncomeresult.result[0]
                       
                        resolve(response)
                    } else {
                            response.error = "true"
                            response.message = "failed to fetch income rate"
                            resolve(response)
                         
                    }
                } else {
                    response.error = "true"
                    response.message = "No data"
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