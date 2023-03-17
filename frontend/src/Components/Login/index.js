import React, { useEffect, useState } from "react"
import {NavLink,useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import  axios from 'axios';
import './index.css'

const Login = () =>{
    
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : '',
        password : ""
})
    const [isCorrectPassword,setPassword] = useState(true)

    const successView = (jwt_token,loginUser) =>{
        Cookies.set("jwt_token",jwt_token,{expires:30})
        navigate("/",{
            state :{
              "user" : loginUser
            }
          })
          
        setPassword(true)
    }

    useEffect(() =>{

        const jwtTokenId = Cookies.get("jwt_token")
        if(jwtTokenId !== undefined){
            navigate("/")
        }
        else{
            renderUi();
        }
    
    })

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await axios.post("http://localhost:8081/login",data).then(res =>{
            if(res.data.success){
                successView(res.data.token,res.data.data)
            }
            else{
                setPassword(false)
            }
           
        })

    }

    const changeHandler = (e) =>{
        setData({...data,[e.target.name]: e.target.value})
    }

    const renderUi = () =>{
        return(

            <div className="text-center d-flex justify-content-center align-items-center m-4 ">
        <div className="bg-dark col-lg-6">
            <i className="fa fa-user text-warning" style={{fontSize:200}}/>
            <h1 className="text-white">LogIn</h1>
            <form className="m-3" onSubmit={handleSubmit}>
                
                <input type='email' className="form-control" name="email" placeholder="Email" onChange={changeHandler}/>
                <br/>
               
                <input type='password' className="form-control" name="password" placeholder="Password" onChange={changeHandler}/><br/>
                <br/>
                <input type='submit' value = 'submit' className="btn btn-warning"/>

                <p className="text-white ml-2">Don't Have an Account?</p> 
                <NavLink to='/signup'><button className="btn btn-outline-info">Register</button></NavLink>
            </form>
        </div>
    </div>

        )
    }
    return(
        
        <div className="text-center d-flex justify-content-center align-items-center m-4 ">
        <div className="bg-dark col-lg-6">
            <i className="fa fa-user text-warning" style={{fontSize:200}}/>
            <h1 className="text-white">LogIn</h1>
            <form className="m-3" onSubmit={handleSubmit}>
                
                <input type='email' className="form-control" name="email" placeholder="Email" onChange={changeHandler}/>
                <br/>
               
                <input type='password' className="form-control" name="password" placeholder="Password" onChange={changeHandler}/><br/>
                <br/>
                <input type='submit' value = 'submit' className="btn btn-warning"/>
                {isCorrectPassword ? null : <p className="pass-err">*Invalid Email Password</p>}

                <p className="text-white ml-2">Don't Have an Account?</p> 
                <NavLink to='/signup'><button className="btn btn-outline-info">Register</button></NavLink>
            </form>
        </div>
    </div>

    )
}

export default Login


