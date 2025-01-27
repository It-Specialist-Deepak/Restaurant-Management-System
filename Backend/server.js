const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/DB");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const corsOptions = {
  origin: "http://localhost:5173", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials like cookies or headers
};
app.use(cors(corsOptions));

// Import Routes
const menuRouter = require("./src/routes/menuRoute");
const authRouter = require("./src/routes/authRoute");
const cartRouter = require("./src/routes/cartRoute");
const orderRouter = require("./src/routes/orderRoute");

// API Routes
app.use("/api/v1", menuRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
