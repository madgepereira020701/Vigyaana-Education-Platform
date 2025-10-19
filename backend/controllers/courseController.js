// backend/controllers/courseController.js
const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // fetch all courses from MongoDB
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCourses };
