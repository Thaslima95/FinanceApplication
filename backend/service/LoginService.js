
module.exports = function() {
    var loginRepo = require('../repository/LoginRepository')
    
   

 

     this.getListLoginService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var logindataObject = new loginRepo()
            try {
                var loginresult = await logindataObject.getListLoginData(incomeData)
           console.log("here1")
          console.log(loginresult)
               
                   
                    if (loginresult.error == 'false') {
                        console.log("response")
                      console.log(loginresult)
                        response.error = "false"
                        response.userid=loginresult.id
                       response.message=loginresult.message
                       response.status=loginresult.status
                       response.error="false"
                        resolve(response)
                    } else {
                            response.error = "true"
                            response.message = loginresult.message
                            response.status=loginresult.status
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