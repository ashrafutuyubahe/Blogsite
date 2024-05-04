import React from "react"


export default function Card({ blog }) {
  const {images,blogs}=blog;
  return (
    
    <div className="blogcard">
      {blogs &&
        blogs.map((blogItem) => (
          <div key={blogItem._id} className="blog" data-blogid={blogItem._id}>
           <img key={images[0]._id} src={images[0].filename} alt="image" />
            <h3 className="blogtitle">
              <a href={`displayblog?id=${blogItem._id}`}>{blogItem.data.blogtitle}</a>
            </h3>
            <h5>{blogItem.data.blogdescription}</h5>
            <p>Written by: {blogItem.data.authorname}</p>
            <p>Written on {blogItem.data.date}</p>
          </div>
        ))}
    </div>
  );
}
