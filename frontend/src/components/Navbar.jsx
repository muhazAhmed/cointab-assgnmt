import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../images/logo.png"

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar' data-aos="slide-down">
      <div className='container'>
        <div className='logo'>
        <Link to="/">
        <img src={Logo} alt="logo" />
        </Link>
        </div>
        <div className="links">
            <Link className="link" to="/">
              <h6>Home</h6>
            </Link>
            <Link className="link" to="/about">
              <h6>About</h6>
            </Link>
            <Link className="link" to="/contact">
              <h6>Contact Us</h6>
            </Link>

            <span style={{"color" : "rgb(62, 223, 255)"}}>{currentUser?.username}</span>
            {currentUser ? (
              <Link to="/login" style={{"textDecoration" : "none"}}>
            <span style={{"color" : "red"}} onClick={logout}>Logout</span></Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar