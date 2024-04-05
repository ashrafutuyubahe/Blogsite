function diretoregister() {
  const userclickedlink = document.getElementById("register");
  userclickedlink.addEventListener("click", (event) => {
    event.preventDefault();

    const href = userclickedlink.getAttribute("href");

    window.location.href = href;
  });
}
function directLogin() {
  const userclickedlink = document.getElementById("login");
  userclickedlink.addEventListener("click", (event) => {
    event.preventDefault();

    const href = userclickedlink.getAttribute("href");

    window.location.href = href;
  });
}
function directCreateblog() {
  const userclickedlink = document.getElementById("create");
  userclickedlink.addEventListener("click", (event) => {
    event.preventDefault();

    const href = userclickedlink.getAttribute("href");

    window.location.href = href;
  });
}
directCreateblog();
directLogin();
diretoregister();

$(document).ready(function () {
  function getData() {
    $.ajax({
      type: "get",
      url: "/blogs",
      dataType: "json",
      success: function (responseText) {
        displaydata(responseText);
        fullBlog();
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }

  function displaydata(data) {
    let section2 = $(".section2");
    section2.empty();

    data.forEach((element) => {
      let fetcheddata = `
  <div class="blog">
    <h3 id="blogtitle" data-blogid="${element._id}"><a href="displayblog">${element.blogtitle}</a></h3>
     <h5>${element.blogdescription}</h5>
    <p>written by:${element.authorname}</p>
    
  </div>
`;
      section2.append(fetcheddata);
    });
  }
  function fullBlog() {
    $(".blog").on('click', function () {
      let blogid = $(this).find("#blogtitle").data('blogid');
  
      $.ajax({
        type: 'GET',
        url: 'displayblog',
        data: {
          id: blogid 
        },
        dataType: 'json',
        success: function (response) {
          displayFullBlog(response);
          console.log( blogid)
        },
        error: function (error) {
          console.error("Error:", error);
          console.log( blogid)
        }
      });
    });
  }
  
  
  function displayFullBlog(blog){
 return   blog= 
 `
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>blog</title>
 </head>
 <body>
   <div class="blog">
       <h3> id="blogtitle" ${blog.blogtitle } </h3>
       <h5>${blog.blogdescription}</h5>
       <p>written by:${blog.authorname}</p>
       <p>written by:${blog.blogcontent}</p>
    
    
       
     </div>
     
 </body>
 </html>
   `;
  }

  getData();
});
