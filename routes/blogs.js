const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads/imgs");
  },

  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

router.get("/new", (req, res) => {
  res.render("newBlog");
});

router.get("/:slug", async (req, res) => {
  let blog = await Blog.findOne({ slug: req.params.slug });

  if (blog) {
    res.render("show", { blog: blog });
  } else {
    res.redirect("/blogs");
  }
});

// new post
router.post("/", upload.single("img"), async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    img: req.file.filename,
    placeName: req.body.placeName,
    country: req.body.country,
  });

  try {
    blog = await blog.save();

    res.redirect(`/blogs/${blog.slug}`);
  } catch (error) {
    console.log(error);
  }
});

// edit
router.get("/edit/:id", async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  res.render("edit", { blog: blog });
});

router.put("/:id", async (req, res) => {
  req.blog = await Blog.findById(req.params.id);
  let blog = req.blog;
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.placeName = req.body.placeName;
  blog.country = req.body.country;
  blog.body = req.body.body;

  try {
    blog = await blog.save();
    res.redirect(`/blogs/${blog.slug}`);
  } catch (error) {
    console.log(error);
    res.redirect(`blog/edit/${blog.id}`, { blog: blog });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/blogs");
});

module.exports = router;
