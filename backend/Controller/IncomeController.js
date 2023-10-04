module.exports=function(){
    this.addCtrlr=(request,callback)=>{
    IncomeService.addService(request,(result)=>{
        console.log(request)
        callback(result)
    })
}
}


