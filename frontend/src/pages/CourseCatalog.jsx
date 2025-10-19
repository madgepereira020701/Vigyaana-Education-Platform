import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userId = "abc123"; // mock user for now

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));

    fetch(`http://localhost:3000/api/my-courses?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data.map((c) => c._id)));
  }, []);

  const handleEnroll = async (courseId) => {
    await fetch("http://localhost:3000/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId }),
    });

    alert("Enrolled successfully!");
    setEnrolledCourses((prev) => [...prev, courseId]);
  };

  return (
<div>
  <h2>Course Catalog</h2>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px", // 👈 adds equal spacing between cards
    }}
  >
    {courses.map((course) => (
      <CourseCard
        key={course._id}
        course={course}
        enrolled={enrolledCourses.includes(course._id)}
        onEnroll={handleEnroll}
      />
    ))}
  </div>
</div>
  );
};

export default CourseCatalog;
