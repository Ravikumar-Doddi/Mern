require('dotenv').config();

const {verify} = require('jsonwebtoken')

const authenticate = (req,res,next) =>{
    let token = req.headers.authorization;
    if(typeof(token) !== "undefined"){
        let finalToken = token.split(" ")[1]
        verify(finalToken,process.env.SECRET_KEY, (error,user) =>{
            if(!error){
                req.user = user
                next();
            }
            else{
                res.send({success : false,message : "Unauthorized"});
            }

        })
    }
    else{
        res.send({success: false,message : "Unauthorized"});

    }


}

module.exports = authenticate
