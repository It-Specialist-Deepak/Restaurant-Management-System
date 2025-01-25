const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./src/config/DB");
require("dotenv").config();

// Users Routes Imports
const menuRouter = require("./src/routes/menuRoute");
const authRouter = require("./src/routes/authRoute");
const cartRouter = require("./src/routes/cartRoute");
const orderRouter = require("./src/routes/orderRoute");
const staffAuthMiddleware = require("./src/middleware/staffAuthMiddleware");
const adminAuthMiddleware = require("./src/middleware/adminAuthMiddleware");
// Staff Routes Imports
const orderManageRouter = require("./src/routes/staffRoutes/orderManageRoute");
const menuManageRouter = require("./src/routes/staffRoutes/menuManageRoute");
//Manager Routes Imports
const careerRouter = require("./src/routes/managerRoutes/careerRoute");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// all api routes
app.use("/api/v1", menuRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

// staff api routes
app.use("/api/v1" , orderManageRouter);
app.use("/api/v1" , menuManageRouter);

// manager api routes
app.use("/api/v1" , careerRouter);

app.get("/staff-content", staffAuthMiddleware, (req, res) => {
  res.send("Welcome to staff content!");
});
// Admin-level content (accessible by admin only)
app.get("/admin-content", adminAuthMiddleware, (req, res) => {
  res.send("Welcome to admin content!");
});

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
