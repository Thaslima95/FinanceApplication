const incomeService=new (require('../service/IncomeService'))()
// module.exports=function(){
//     this.addCtrlr=(request,callback)=>{
//     incomeService.addService(request,(result)=>{
//         console.log(request)
//         callback(result)
//     })
// }
// }


module.exports = function() {
    var incomeService = require('../service/IncomeService')

    this.addIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.addIncomeService(req)
        if (addIncomeService.error == "true") {
            response.error = "true"
            response.message = addIncomeService.message
        } else {
            response.error = "false"
            response.message = addIncomeService.message
            response.data = addIncomeService.result
        }
        callback(response)
    }
}


