import { useState,useEffect } from "react"
import { useNavigate,useLocation, NavLink } from "react-router-dom"
import Profile from '../Profile'
import Cookies from "js-cookie";
import './index.css'

const Home = () =>{
    const navigate = useNavigate();
    const [data,setData] = useState([])

    const removeItem = async(id) =>{
      const confirmBox = window.confirm(
        "Do you really want to delete this User"
      )
      if(confirmBox === true){
      const fileredItems = data.filter(each => each.id !== id)
      setData(fileredItems)
    
      const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `http://localhost:8081/hardDelete/${id}`
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'DELETE',
        }
        const response = await fetch(apiUrl, options)


      } 
    }
  
   const getProducts = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = 'http://localhost:8081/getAllUsers'
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        const jsonProduct = await response.json()
        setData(jsonProduct.data)
        
    }
    useEffect(() =>{
      const jwttoken = Cookies.get("jwt_token")
      if(jwttoken === undefined){
        navigate("/login")
      }
      else{
        navigate("/")
      }
     
      getProducts()
      
    },[])
    
    return(
        <div className="container">
        {data.map((each) =>(
          <Profile details = {each} key = {each.id} deleting = {removeItem}/>
    ))}
    <NavLink to="/signup"><button className="btn btn-outline-success add-btn">Add User</button></NavLink>
        </div>

    )
}
export default Home


