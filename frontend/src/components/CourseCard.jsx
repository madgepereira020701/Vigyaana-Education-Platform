import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
      style={{
        width: "18rem",
        borderRadius: "10px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text mb-1">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="card-text text-muted">
          <strong>Duration:</strong> {course.duration}
        </p>

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={handleClick}
          disabled={enrolled} // disable if already enrolled
        >
          {enrolled ? "Enrolled" : "Enroll"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
