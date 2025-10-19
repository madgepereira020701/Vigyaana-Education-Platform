import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/enroll/my-courses?userId=abc123")
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data));
  }, []);

  return (
    <div
      style={{
        padding: "40px 60px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1e293b",
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        My Enrolled Courses
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px", // 👈 same spacing as CourseCatalog
          justifyContent: "center",
        }}
      >
        {enrolledCourses.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "1.1rem",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "40px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          enrolledCourses.map((course) => (
            <div
              key={course.courseId}
              style={{
                width: "18rem", // 👈 same width as CourseCard
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "20px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <h3
                style={{
                  color: "#1d4ed8",
                  fontSize: "1.25rem",
                  marginBottom: "10px",
                }}
              >
                {course.title}
              </h3>
              <p>Course ID: {course.courseId}</p>
              <p>Instructor: {course.instructor}</p>
              <p>Duration: {course.duration}</p>
              <p style={{ color: "#475569", fontSize: "0.95rem" }}>
                Enrolled At:{" "}
                <span style={{ fontWeight: "500" }}>
                  {new Date(course.enrolledAt).toLocaleString()}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
