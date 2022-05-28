const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const blogRouter = require("./routes/blogs");
const Blog = require("./models/Blog");
const app = express();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/0527-mid-proj",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ timeCreated: "desc" });
  res.render("index", { blogs: blogs });
});

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/blogs", blogRouter);

app.listen(process.env.PORT || 4000);
