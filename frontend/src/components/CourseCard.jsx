import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseCard = ({ course }) => {
  // Proper enroll handler with API call
  const handleEnroll = () => {
    fetch("http://localhost:3000/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "abc123",   // Replace with actual logged-in user ID
        courseId: course.id,
        title: course.title,
        instructor: course.instructor,
        duration: course.duration,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Enrollment failed");
        return res.json();
      })
      .then((data) => alert(data.message))
      .catch((err) => console.error("Enrollment error:", err));
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
      {course.image && (
        <img
          src={course.image}
          className="card-img-top"
          alt={course.title}
          style={{
            height: "160px",
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text mb-1">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="card-text text-muted">
          <strong>Duration:</strong> {course.duration}
        </p>
        <button className="btn btn-primary w-100 mt-2" onClick={handleEnroll}>
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
