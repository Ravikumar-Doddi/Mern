import './index.css'
import {useNavigate} from 'react-router-dom'

const Profile = (props) =>{
    const {details,deleting} = props
    const {name,email,id} = details

    const navigate = useNavigate();

    const handleDelete = () =>{
        deleting(id,email)
    } 

    const handleEdit = () =>{
      navigate("/edit",{
        state :{
          "email" : email
        }
      })
    }
    return(
        <div>

      <div className='card'>
        <h4>Name : {details.name}</h4>
        <h4>Email : {details.email}</h4>
        <div className='btn-cont'>
        <button className='each-btn view-btn'>View</button>
        <button className='each-btn edit-btn' onClick={handleEdit}>Edit</button>
        <button className='each-btn del-btn' onClick={handleDelete}>Delete</button>
        </div>
      </div>
        </div>
    )
}

export default Profile
