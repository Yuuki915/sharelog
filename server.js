require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const ejs = require("ejs");
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

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/blogs", blogRouter);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/blogs", async (req, res) => {
  let blogs = await Blog.find().sort({ timeCreated: "desc" });

  res.render("blogs/blogs", { blogs: blogs });
});

app.get("/register", async (req, res) => {
  res.render("auth/register");
});

app.get("/login", async (req, res) => {
  res.render("auth/login");
});

app.listen(process.env.PORT || 4000);
