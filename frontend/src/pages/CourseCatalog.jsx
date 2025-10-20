import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const userId = localStorage.getItem("userId"); // only userId

  // Fetch all courses
  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Fetch enrolled courses
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3000/api/enroll/my-courses?userId=${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setEnrolledCourses(data.map((c) => c.courseId)) // store courseIds only
      )
      .catch((err) => console.error("Error fetching enrolled courses:", err));
  }, [userId]);

  // Handle enrollment
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
          courseId: course.id, // backend expects courseId
          title: course.title,
          instructor: course.instructor,
          duration: course.duration,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to enroll");

      alert(data.message);
      setEnrolledCourses((prev) => [...prev, course._id]);
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Course Catalog</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEnroll={handleEnroll}
            isLoggedIn={!!userId}
            enrolled={enrolledCourses.includes(course._id)} // pass enrolled status
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
