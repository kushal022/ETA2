import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [IsLogIn, setIsLogIn] = useState(false);
  const [User, setUser] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    // const user = (localStorage.getItem('user'));
    if(user){
      setUser(user.username)
      setIsLogIn(true);
    } else{
      setIsLogIn(false)
    }
  },[])

  //* handlerLogOut
  const handlerLogOut =()=>{
    localStorage.removeItem('user')
    message.success('Logout Successfully')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary-subtle shadow-sm ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand fw-bold" >
              <img src="etaLogo.jpg" alt="logo" className="logo mx-3" />
              Expense Tracker
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
            </ul>
            <div className="h-100 d-flex gap-4 align-items-center justify-content-center ">
              { IsLogIn ? 
              <div className="h-100 d-flex gap-4 align-items-center justify-content-center">
                <p className="text-capitalize text-success fw-bold">Welcome {User}</p>
                <button onClick={handlerLogOut} className="btn btn-dark">Logout</button>
              </div>:<>
                <button className="btn btn-dark">Login</button>
                <button className="btn btn-bg-primary">Signup</button>
              </>  
            }
            </div>            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
