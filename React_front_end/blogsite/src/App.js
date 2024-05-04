import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/navbar";
import  Home from "./pages/home";
import Register from "./pages/register";

export default function App() {
  
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Home/>      
          <Routes>
            <Route path="/createblog" element={<Register/>} />
            <Route path="/register" element={<Register />} />
          
          </Routes>
        
      </div>
    </Router>
  );
}
