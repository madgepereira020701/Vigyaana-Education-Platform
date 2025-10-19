const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  title: String,
  instructor: String,
  duration: String,
  enrolledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
