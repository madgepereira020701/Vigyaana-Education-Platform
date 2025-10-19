const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  getMyCourses,
} = require("../controllers/enrollController");

// URL -> controller function mapping
router.post("/", enrollCourse); // POST /api/enroll
router.get("/my-courses", getMyCourses); // GET /api/enroll/my-courses

module.exports = router;
