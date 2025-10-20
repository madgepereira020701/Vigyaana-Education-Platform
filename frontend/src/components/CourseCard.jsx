import React from "react";

const CourseCard = ({ course, onEnroll, isLoggedIn, enrolled }) => {
  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to enroll in a course.");
      return;
    }
    onEnroll(course);
  };

  return (
    <div
      className="card shadow-sm mb-4"
      style={{ width: "18rem", borderRadius: "10px" }}
    >
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={handleClick}
          disabled={enrolled}
        >
          {enrolled ? "Enrolled" : "Enroll"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
