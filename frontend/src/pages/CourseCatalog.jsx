import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3000/api/enroll/my-courses?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data.map((c) => c.courseId)))
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

      setEnrolledCourses((prev) => [...prev, course.id]);
      setToastMessage("Enrolled successfully!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Enrollment error:", err);
      setToastMessage(err.message || "Something went wrong.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Course Catalog</h2>

      {/* Toast Message */}
      {toastMessage && (
        <div
          className="position-fixed top-0 end-0 m-3 p-2 rounded text-white"
          style={{ backgroundColor: "#22c55e", zIndex: 1050 }}
        >
          {toastMessage}
        </div>
      )}

      <div className="row g-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="col-12 col-md-6 col-lg-3"
          >
            <CourseCard
              course={course}
              onEnroll={handleEnroll}
              isLoggedIn={!!userId}
              enrolled={enrolledCourses.includes(course.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
