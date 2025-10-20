# Course Enrollment System
Find website live at: [https://inquisitive-druid-af8f26.netlify.app/](https://inquisitive-druid-af8f26.netlify.app/)

## Tech Used
- **Frontend:** React.js, Vite, Netlify  
- **Backend:** Node.js, Express.js, MongoDB, Render  
- **Database:** MongoDB Atlas  
- **Authentication:** JSON Web Token (JWT)  
- **Styling:** CSS  
- **Package Management:** npm  

---
## How to Run the Project Locally

### 1. Frontend
1. Navigate to the frontend folder: cd frontend  
2. Install dependencies: npm install  
3. Run the development server: npm run dev  

### 2. Backend
1. Navigate to the backend folder: cd backend  
2. Install dependencies: npm install  
3. Run the backend server: npm run dev  

---

## Live Deployment

### 1. Backend (Render)
1. Created a new Render Web Service.  
2. Linked the GitHub repository and set:  
   - Branch: main  
   - Language: Node  
   - Root Directory: backend  
   - Build Command: npm install  
   - Start Command: npx nodemon  
3. Added environment variables (MongoDB URL, Frontend URL, JWT Secret).  
4. Deployed successfully and replaced all localhost links in the frontend with the Render web service URL.

### 2. Frontend (Netlify)
1. Built the project:  
   - cd frontend  
   - npm run build  
2. Deployed the generated dist/ folder by dragging and dropping it into Netlify.  
3. Each time the code is updated, rebuild using npm run build before redeploying.  

---

## Brief Explanation of Approach

1. The project follows a modular and structured MERN architecture.  
2. The backend is placed in a dedicated `/backend` folder with routes, controllers, and models clearly separated.  
3. JWT authentication is implemented for signup and login, ensuring secure access to the dashboard and enrollment endpoints.  
4. The MongoDB Atlas database is organized under the Vigyanna project, with three collections—courses, enrollments, and users—each handling its respective data schema.  
5. The backend is deployed on Render with environment variables for secure configuration.  
6. The frontend is built using React and Vite, connected to the backend API, and hosted on Netlify for live access.  

<!--
## Project Structure

### Backend
Root directory for backend: `/backend`  

#### Key Folders and Files
- **config/db.js**  
  Contains MongoDB Atlas connection logic.

- **controllers/**
  - **auth.js:** Handles login and signup functionality.  
  - **courseController.js:** Fetches available courses from the database.  
  - **enrollController.js:** Handles course enrollment logic. Ensures users cannot enroll in the same course twice and manages enrollment data.

- **middleware/auth.js**  
  Middleware to verify and secure routes using JWT tokens.

- **models/**
  - **course.js**
    ```js
    const mongoose = require("mongoose");

    const courseSchema = new mongoose.Schema({
      id: String,
      title: String,
      instructor: String,
      duration: String,
    });

    module.exports = mongoose.model("Course", courseSchema);
    ```
  - **enrollment.js**  
    Defines schema for enrolled courses.
  - **user.js**  
    Defines schema for users. Passwords are hashed.

- **routes/**
  - **courseRoutes.js**
    ```js
    const express = require("express");
    const router = express.Router();
    const { getCourses } = require("../controllers/courseController");

    // Maps the route to the controller function
    router.get("/", getCourses);

    module.exports = router;
    ```
  - **enrollRoutes.js**
    ```js
    const express = require("express");
    const router = express.Router();
    const {
      enrollCourse,
      getMyCourses,
    } = require("../controllers/enrollController");

    // URL -> Controller mapping
    router.post("/", enrollCourse); // POST /api/enroll
    router.get("/my-courses", getMyCourses); // GET /api/enroll/my-courses

    module.exports = router;
    ```

- **app.js**  
  Main entry file for backend configuration and route handling.

---

### Database Structure (MongoDB Atlas)
Created under a project named **Vigyanna**, within a database called **TEST**.

#### Collections:

**Courses Collection:**
```json
{
  "id": "C001",
  "title": "Introduction to JavaScript",
  "instructor": "Alice Johnson",
  "duration": "4 weeks",
  "_id": "ObjectId(...)"
}

-->
