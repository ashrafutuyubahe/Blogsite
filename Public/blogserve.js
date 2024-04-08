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
        fullBlog();
        displaydata(responseText);
        
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
        <div class="blog" data-blogid="${element._id}"> 
          <h3 class="blogtitle"><a href="displayblog">${element.data.blogtitle}</a></h3>
          <h5>${element.data.blogdescription}</h5>
          <p>written by: ${element.data.authorname}</p>
        </div>
      `;
      section2.append(fetcheddata);
    });
  }

  function fullBlog() {
    $(".section2").on("click", ".blogtitle", function () {
      let blogid = $(this).closest(".blog").data("blogid");
          $.ajax({
        type: "get",
        url: '/displayblog',
        data: {
          id: blogid,
        },
        success: function (response) {
        displayFullBlog(response);
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    });
  }

  function displayFullBlog(blog) {
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blog.blogtitle}</title>
      </head>
      <body>
        <div class="blog">
          <h3>${blog.blogtitle}</h3>
          <h5>${blog.blogdescription}</h5>
          <p>written by: ${blog.authorname}</p>
          <p>${blog.blogcontent}</p>
        </div>
      </body>
      </html>
    `;
    $("body").html(html);
  }

  getData();
});
