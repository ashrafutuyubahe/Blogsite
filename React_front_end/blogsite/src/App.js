import React, { useEffect, useState } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Optionally, you can include credentials if needed
        credentials: "include",
      },
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
    <div className="app">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog" data-blogid={blog._id}>
          <h3 className="blogtitle">
            <a href={`displayblog?id=${blog._id}`}>{blog.data.blogtitle}</a>
          </h3>
          <h5>{blog.data.blogdescription}</h5>
          <p>written by: {blog.data.authorname}</p>
          <p> written on {blog.data.date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
