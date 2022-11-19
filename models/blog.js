const mongoose = require("mongoose");
// Defines schema of the blog collection in the database which contains following attributes and all are required
const BlogSchema = mongoose.Schema({
  heading: { type: String, required: true },
  short_description: { type: String, required: true },
  long_description: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("blog", BlogSchema);
