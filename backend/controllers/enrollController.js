// controllers/enrollController.js
const Enrollment = require("../models/Enrollment");

// POST /api/enroll
const enrollCourse = async (req, res) => {
  try {
    const { userId, courseId, title, instructor, duration } = req.body;

    // Check if already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Create new enrollment
    const enrollment = new Enrollment({
      userId,
      courseId,
      title,
      instructor,
      duration,
    });
    await enrollment.save();

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/enroll/my-courses?userId=abc123
const getMyCourses = async (req, res) => {
  try {
    const { userId } = req.query;
    const myEnrollments = await Enrollment.find({ userId });
    res.json(myEnrollments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { enrollCourse, getMyCourses };
