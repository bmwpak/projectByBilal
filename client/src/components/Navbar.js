import React , {useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";

import { UserContext } from "../App";


const Navbar = () => {

 
  const {state , dispatch} = useContext(UserContext);

 

//   useEffect(() => {
//     const data = String(window.localStorage.getItem('json'));
//     const formData = JSON.parse(data);

//     dispatch(formData.state);
//     // GetContext();

//   },[]);

//   useEffect(() =>{
//     window.localStorage.setItem("json",JSON.stringify(state));
// });

  const RenderMenu = () => {

    if(!state){
      return(
        <>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Signup</NavLink>
                </li>
               
                
                
              </ul>
              
            </div> 
        </>
      )
    }else{

      return(
        <>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active"> 
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ads">Ads</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
              </li>              
              
            </ul>
            
          </div>
        </>
      )
    }

  };

  return(
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">Cross-Ads</NavLink>
  
        <RenderMenu />
  
      </nav>
    </>
  )
}

export default Navbar;