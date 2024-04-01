const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Blog = require("./blogschema");


const app = express();
const PORT = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "Blogsite")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "blog.html"));
});

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Testing",
  });

  console.log("hello there...");
});

app.post("/addblog", async (req, res) => {
  try {
    const newBlog = new Blog({
      blogtitle: req.body.blogtitle,
      blogcontent: req.body.blogcontent,
      authorname: req.body.authorname,
      datecreated: req.body.datecreated,
    });
J
    await newBlog.save();
    return res.status(201).send("Blog added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    let blogListHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>List of Blogs</title>
          <style>
              form {
                  position: relative;
                  left: 200px;
                  padding: 30px;
                  margin: 20px;
                  background-color: white;
                  border: 1px solid black;
                  border-radius: 3px;
                  box-shadow: 3px;
                  width: 100vh;
              }

              body {
                  margin: 0;
                  padding: 0;
                  background-color: rgb(218, 209, 209);
              }

              button {
                  float: right;
                  display: relative;
                  top: 50px;
                  right: 10px;
                  float: right;
                  size: 4px;
                  margin: 2px;
              }
          </style>       
      </head>
      <body>
          <h1>List of Blogs</h1>
    `;

    blogs.forEach((blog) => {
      blogListHTML += `
        <form id="updateForm">
          <input type="hidden" id="blogId" name="blogId" value="${blog._id}">
          <label for="blogTitle">Blog Title:</label>
          <input type="text" id="blogTitle" name="blogTitle" value="${blog.blogtitle}"><br>

          <label for="blogContent">Blog Content:</label><br>
          <textarea id="blogContent" name="blogContent">${blog.blogcontent}</textarea><br>

          <label for="authorName">Author Name:</label>
          <input type="text" id="authorName" name="authorName" value="${blog.authorname}"><br>

         

          <button type="button" id="updatebtn">Update Blog</button>
          <button type="button" id="updatebtn">DELETE Blog</button>
        </form>
      `;
    });

    blogListHTML += `
      </body>
      </html>
    `;

    res.send(blogListHTML);
    console.log();
  } catch (err) {
    console.error("Error retrieving blogs:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.put("/updateblog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = {
      blogtitle: req.body.blogTitle,
      blogcontent: req.body.blogContent,
      authorname: req.body.authorName,
    };

    await Blog.findByIdAndUpdate(blogId, updatedBlog);

    res.status(200).send("Blog updated successfully!");
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`the server is running on port of ${PORT} and be happy`);
});












