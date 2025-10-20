import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [toastMessage, setToastMessage] = useState(""); // <-- toast message
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("https://vigyaana-education-platform.onrender.com/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`https://vigyaana-education-platform.onrender.com/api/enroll/my-courses?userId=${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setEnrolledCourses(data.map((c) => c.courseId)) // store courseIds only
      )
      .catch((err) => console.error("Error fetching enrolled courses:", err));
  }, [userId]);

  const handleEnroll = async (course) => {
    if (!userId) {
      alert("Please log in to enroll in a course.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          courseId: course.id,
          title: course.title,
          instructor: course.instructor,
          duration: course.duration,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to enroll");

      // Add courseId to enrolledCourses and show toast
      setEnrolledCourses((prev) => [...prev, course._id]);
      setToastMessage("Enrolled successfully!");

      // Hide toast after 3 seconds
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Catalog</h2>

      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#22c55e",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {toastMessage}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEnroll={handleEnroll}
            isLoggedIn={!!userId}
            enrolled={enrolledCourses.includes(course._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
