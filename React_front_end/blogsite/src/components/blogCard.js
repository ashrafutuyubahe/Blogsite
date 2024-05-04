 import React from "react";

 export default function Card({blog}){
   
return(

   <div className="blogcard">
     <img src="girl wrting a blog.jpg" alt="image"/>
     {   blog && blog.map((blog) => (
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

)
}