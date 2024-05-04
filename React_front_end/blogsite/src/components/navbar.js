import React from "react";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <div className="navbar">
        <Link to="/home" style={{ textDecoration: "none", color:"white"  }}>
        <span>Home</span>
      </Link>
      <Link to="/createblog" style={{ textDecoration: "none", color:"white"  }}>
        <span>Create Blog</span>
      </Link>
      <Link to="/register" style={{ textDecoration: "none", color:"white"  }}>
        <span> Register</span>
      </Link>
      <Link to="/Login" style={{ textDecoration: "none", color:"white"  }}>
        <span>Login</span>
      </Link>
    </div>
  );
}
