import React, { useEffect, useState } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/blogs") // Note: you missed "http://" in the URL
      .then((response) => response.json())
      .then((blogs) => {
        setBlogs(blogs);
        console.log(blogs);
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
