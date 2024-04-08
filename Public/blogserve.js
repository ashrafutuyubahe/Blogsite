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
        <h3 class="blogtitle"><a href="displayblog?id=${element._id}">${element.data.blogtitle}</a></h3>
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
        url: "/displayblog",
        data: {
          id: blogid
        },
        success: function (response) {
          alert('hello');
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    });
  }

  getData();
});
