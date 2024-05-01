import React from "react";
import {Link} from 'react-router-dom';
import './navbar.css';

 export default function NavBar(){




    return(
    <div className="navbar">
     <Link to="/createblog" style={{textDecoration:"none"}}><span>Create Blog</span></Link>
        <Link to="/register" style={{textDecoration:"none"}}><span> Register</span></Link>
        <Link to="/Login"style={{textDecoration:"none"}}><span>Login</span></Link>
       
    </div>
    
    
    
    )

}