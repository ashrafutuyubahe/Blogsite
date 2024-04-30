import {react, useEffect, useState} from 'react';

const [blogs,setblogs]=useState([]);


useEffect({
    fetchBlogs: () => {
    fetch("localhost:4000/blogs")
      .then((response) => {
        response.json();

      })
      .then((blogs) => {
        setblogs(blogs);
        console.log(blogs);

      });

  }
})


function App() {
  return (
   <>
  <div className='app'>
     {blogs.map((blog)=>{
      return 
      
     })}
  </div>
   
   </>
  );
}

export default App;
