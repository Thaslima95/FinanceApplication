const incomeService=new (require('../service/IncomeService'))()
module.exports=function(){
    this.addCtrlr=(request,callback)=>{
    incomeService.addService(request,(result)=>{
        console.log(request)
        callback(result)
    })
}
}


