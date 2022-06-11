require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");

const authRoute = require("./routes/auth");
const blogsRoute = require("./routes/blogs");

const methodOverride = require("method-override");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("databbase connected!"))
  .catch((err) => console.log(err));

app.use("/", authRoute);
app.use("/", blogsRoute);

app.listen(process.env.PORT, () => console.log("Server is running!"));

//
//
//

// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const mathodOverride = require("method-override");
// const session = require("express-session");
// const passport = require("passport");
// const ejs = require("ejs");

// const authRoute = require("./routes/auth");
// const blogRouter = require("./routes/blogs");

// const Blog = require("./models/Blog");
// const methodOverride = require("method-override");
// const app = express();

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(express.static("public"));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => console.log("databbase connected!"))
//   .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.render("home");
// });
// app.get("/register", (req, res) => {
//   res.render("auth/register");
// });
// app.get("/login", (req, res) => {
//   res.render("auth/login");
// });

// app.get("/blogs", async (req, res) => {
//   let blogs = await Blog.find().sort({ timeCreated: "desc" });
//   res.render("blogs/blogs", { blogs: blogs });
// });

// app.use("/home", authRoute);
// app.use("/blogs", blogRouter);

// app.listen(process.env.PORT, () => console.log("Server is running!"));
