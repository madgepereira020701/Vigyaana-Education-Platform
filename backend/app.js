const express = require("express");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
