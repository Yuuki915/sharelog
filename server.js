const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const blogRouter = require("./routes/blogs");
const Blog = require("./models/Blog");
const app = express();

mongoose.connect("mongodb://localhost:27017/0527-mid-proj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ timeCreated: "desc" });

  res.render("index", { blogs: blogs });
});
// app.get("/", (req, res) => {
//   const blogs = [
//     {
//       title: "My life in Canada",
//       snippet: "Hello, welcome to my blog.",
//       createdAt: new Date(),
//     },
//   ];
//   res.render("index", { blogs: blogs });
// });

app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/blogs", blogRouter);

app.listen(5000);
