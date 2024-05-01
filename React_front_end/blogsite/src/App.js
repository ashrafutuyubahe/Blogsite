import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/navbar";
import DisplayBlog from "./components/blogdisplay";
import Register from "./pages/register";

export default function App() {
  return (
    <Router>
      <div className="app">
        <NavBar /> 
        <main>
          <Routes>
            <Route path="/createblog" element={<DisplayBlog />} />
            <Route path="/register" element={<Register />} />
          
          </Routes>
        </main>
      </div>
    </Router>
  );
}
