const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  image: String,
  username: String,
});

module.exports = mongoose.model("post", PostSchema);
