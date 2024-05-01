import React, { useEffect, useState } from "react";
import axios from 'axios';



function App() {
  const [blogs, setBlogs] = useState([]);
  
axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

useEffect(() => {
  axios
    .get("http://localhost:4000")
    .then((response) => {
      console.log(response.data);
      setBlogs(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


  return (
    <div className="app">
      {blogs.map((blog) => {
        return (
          <div key={blog._id} className="blog" data-blogid={blog._id}>
            <h3 className="blogtitle">
              <a href={`displayblog?id=${blog._id}`}>
                {blog.data.blogtitle}
              </a>
            </h3>
            <h5>{blog.data.blogdescription}</h5>
            <p>written by: {blog.data.authorname}</p>
            <p> written on {blog.data.date}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
