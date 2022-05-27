const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const domPurifier = require("dompurify");
// const { JSDOM } = require("jsdom");
// const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require("string-strip-html");

mongoose.plugin(slug);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  timeCreated: {
    type: Date,
    default: () => Date.now(),
  },
  img: {
    type: String,
    default: "placeholder.jpg",
  },
  placeName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    slug_padding_size: 2,
  },
});

// blogSchema.pre("validate", (next) => {
//   if (this.body) {
//     this.body = htmlPurify.sanitize(this.body);
//     this.snippet = stripHtml(this.body.substring(0, 200)).result;
//   }
//   next();
// });

module.exports = mongoose.model("Blog", blogSchema);
