const express = require("express");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const cors = require("cors");
const authcontroller = require("./controllers/auth");
require("dotenv").config(); // loads .env variables

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);

app.post("/passwordresetrequest", authcontroller.passwordresetrequest);
app.post("/updatepassword/:token", authcontroller.updatePassword);

app.post("/userregister", authcontroller.userregister);
app.post("/userlogin", authcontroller.userlogin);

app.listen(3000, () => console.log("Server running on port 3000"));
