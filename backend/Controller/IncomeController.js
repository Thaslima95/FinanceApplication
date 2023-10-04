
module.exports = function() {
    var incomeService = require('../service/IncomeService')

    this.addIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.addIncomeService(req)
        if (addIncomeService.error == "true") {
            console.log(addIncomeService.message)
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.message = addIncomeService.message
            response.data = addIncomeService.result
             response.status=addIncomeService.status
        }
        console.log(response)
        callback(response)
    }

        this.getTotalIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.getTotalIncomeService(req)
        if (addIncomeService.error == "true") {
            console.log(addIncomeService.message)
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.message = addIncomeService.message
            response.data = addIncomeService.result
             response.status=addIncomeService.status
        }
        console.log(response)
        callback(response)
    }
}


