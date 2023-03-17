const commonResponse = ({res,success = false,message = "",data = null,token,loginUser}) =>{
    if(success){
        res.send({success,message,data,token,loginUser})
    }
    else{
        res.send({success,message,data})
    }

}

module.exports = {commonResponse}


