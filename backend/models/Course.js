const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: String,
  title: String,
  instructor: String,
  duration: String,
});

module.exports = mongoose.model("Course", courseSchema);
