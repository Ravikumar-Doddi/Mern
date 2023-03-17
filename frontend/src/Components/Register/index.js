import axios from "axios";
import { useState } from "react"
import { NavLink,useNavigate } from "react-router-dom";
import './index.css'

const Register = () =>{
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [isUserEmpty,setEmptyUser] = useState(false);
    const [isEmailEmpty,setEmpty] = useState(false);
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [alreadyUser,setUser] = useState(false)
    const [isValidPassword,setValidPassword] = useState(true);
    const [isPasswordMatch,setPasswordMatch] = useState(true);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password.length >=8){
        setValidPassword(true);

        }
        else{
            setValidPassword(false)
        }
        if(userName.length === 0){
            setEmptyUser(true)
        }
        if(password !== confirmPassword){
            setPasswordMatch(false);
            
        }
        else{
            setPasswordMatch(true);
            }

        if(password.length >=8 && email.length >=13 && isUserEmpty){
            const response = await axios.post("http://localhost:8081/signup",{
            name : userName,
            email : email,
            password : password
                }).then(res =>{
            if(res.data.success && isPasswordMatch){
            return navigate("/login")
            }else{
                setUser(true)
            }
        })
        }

        if(email.length < 12){
        setEmpty(true) 
        }

    }

    return(
        <div className="text-center d-flex justify-content-center align-items-center m-4 ">
            <div className="bg-dark col-lg-6">
                <i className="fa fa-user text-warning" style={{fontSize:200}}/>
                <h1 className="text-white">Register</h1>
                <form className="m-3" onSubmit={handleSubmit}>
                    <input type='text' className="form-control" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <br/>
                    {isUserEmpty && <p style={{color:"red"}}>*Required</p>}
                    <input type='email' className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {isEmailEmpty ?  <p style = {{color : "red"}}>*Required</p> : null }
                    <br/>
                    <br/>
                    <input type='password' className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                    {!isValidPassword && <p style={{color:"red"}}>*Password should be 8 characters</p>}

                    <br/>
                    <input type='password' className="form-control" placeholder="ConfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <br/>
                    {!isPasswordMatch && <span style={{color:"red"}}>*Password should Match</span>}
                    {alreadyUser ? <p style={{color : "red"}}>User Already Exists</p> : null}
                    <input type='submit' value = 'submit' className="btn btn-warning"/>
                    <br/>
                    <br/>
                    <span className="text-white ml-2">Already Have an Account?</span> 
                    <NavLink to='/login'><button className="btn btn-outline-info">Login</button></NavLink>
                </form>
            </div>
        </div>
    )
}

export default Register




