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
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Expense Tracker
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <div className="h-100 d-flex gap-4 align-items-center justify-content-center ">
              { IsLogIn ? 
              <>
                <p className="h-100 text-capitalize text-success fw-bold">{User}</p>
                <button onClick={handlerLogOut} className="btn btn-dark">Logout</button>
              </>:<>
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
