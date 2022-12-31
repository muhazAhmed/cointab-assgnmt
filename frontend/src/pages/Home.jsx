import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import Logo from "../images/home.svg";



const Home = () => {

    const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='home' data-aos="zoom-in">
    <div className='img'>
    <img src={Logo} alt="logo"/></div>
    <div >
        <h3 style={{"display" : "flex", justifyContent : "center"}}>User Name : <span>{currentUser?.username}</span></h3>
        <h3 style={{"display" : "flex", alignItems : "center", flexDirection : "column"}}>Email : <span>{currentUser?.email}</span></h3>
    </div>
    <div className='home-btn'>
    {currentUser ? (
              <Link to="/login" style={{"textDecoration" : "none", backgroundColor : "transparent"}}>
            <button onClick={logout}>Logout</button></Link>
          ) : (
            <Link className="link" to="/login">
              <button>Login</button>
            </Link>
          )}
    </div>
    </div>
  )
}

export default Home
