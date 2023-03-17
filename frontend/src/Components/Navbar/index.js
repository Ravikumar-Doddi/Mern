import Cookies from "js-cookie"
import { useState } from "react"
import { NavLink,useNavigate } from "react-router-dom"


const Navbar = () =>{
  const jwtToken = Cookies.get("jwt_token");
  const navigate = useNavigate();


  const handleLogOut = () =>{
    Cookies.remove("jwt_token")
    navigate("/login")
    
  }
  

    return(
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/#"><b className="text-warning">FULL</b> Stack Application</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link active"  aria-current="page">Home</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="/#">Action</a></li>
            <li><a className="dropdown-item" href="/#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/#">Something else here</a></li>
          </ul>
        </li>
        
      </ul>
      <form className="d-flex">
        <NavLink to='/login'><button className="btn btn-outline-primary me-2" ><i className="fa fa-user"/>Sign In</button></NavLink>
        {jwtToken === undefined ? <NavLink to='/signup'><button className="btn btn-outline-success"><i className="fa fa-user-plus"/>Sign Up</button></NavLink> : null}
        {jwtToken !== undefined ? <NavLink to='/login'><button className="btn btn-outline-success" onClick={handleLogOut}><i/>Log Out</button></NavLink> : null }
      </form>
    </div>
  </div>
</nav>

    )
}


export default Navbar

