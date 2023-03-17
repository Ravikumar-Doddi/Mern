import axios from "axios";
import Cookies from "js-cookie";
import { useState ,useEffect } from "react"
import { NavLink,useNavigate,useLocation } from "react-router-dom";

const Edit = () =>{
    
    const [userName,setUserName] = useState("");
    const [isUserEmpty,setEmptyUser] = useState(false);
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [alreadyUser,setUser] = useState(false)
    const [isValidPassword,setValidPassword] = useState(true);
    const [isPasswordMatch,setPasswordMatch] = useState(true);
    
    const navigate = useNavigate();
    const location = useLocation();

    const mailValue = location.state.email 

    useEffect(() => {
    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken === undefined){
        navigate("/login")
        
    }
    
    }, [])
    
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

        if(password.length >=8  && !isUserEmpty){
            const jwtToken = Cookies.get('jwt_token')
        const apiUrl = 'http://localhost:8081/edituser'
        const userDetails = {name : userName,email: mailValue,password : password}
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          method: 'PUT',
          body : JSON.stringify(userDetails),
        }
        const response = await fetch(apiUrl, options)
        const jsonProduct = await response.json()
        if(jsonProduct.success){
            window.alert(jsonProduct.message)
            navigate("/")
        }

}
    }
    return(
        <div className="text-center d-flex justify-content-center align-items-center m-4 ">
            <div className="bg-dark col-lg-6">
                <i className="fa fa-user text-warning" style={{fontSize:200}}/>
                <h1 className="text-white">Edit User</h1>
                <form className="m-3" onSubmit={handleSubmit}>
                    <input type='text' className="form-control" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <br/>
                    {isUserEmpty && <p style={{color:"red"}}>*Required</p>}
                    <input type='email' className="form-control" placeholder="Email" value={mailValue} readOnly/>
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
                    
                </form>
            </div>
        </div>
    )
}

export default Edit



