import React from "react";
import './app.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayBlog from './components/blogdisplay'
import NavBar from "./components/navbar";

export default function App() {
  return (
    <Router>
     <div className="app">
     <NavBar />
        {/* <DisplayBlog /> */}
        <Routes>
          <Route path="/createblog" />
          <Route path="/register"/>
          <Route path="/login" />
        </Routes>
     </div>
    </Router>
  );
}
