
import React, { useEffect, useState } from "react";
import "./home.css";
import BlogCard from "../components/blogCard";



 export  default function DisplayBlog() {
  
  
const [blogs,setBlogs]=useState([])

  useEffect(() => {
  
    fetch("http://localhost:4000/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         credentials: "include",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

 
 

  return (
    <div className="home">
    <h1>hello</h1>
    
   
     <BlogCard blog={blogs}/>
    </div>
  );
}

