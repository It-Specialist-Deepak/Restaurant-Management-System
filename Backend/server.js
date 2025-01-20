const express = require ("express");
const app = express();
const cors = require ("cors");
const connectDB = require("./src/config/DB");
require('dotenv').config();

// All Routes Imports
const menuRouter = require("./src/routes/menuRoute")
const authRouter = require("./src/routes/authRoute")
const cartRouter = require("./src/routes/cartRoute")
const orderRouter = require("./src/routes/orderRoute")

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// all api routes
app.use("/api/v1", menuRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);


app.get("/", (req , res ) => {
    res.send("Hello from Server")
})

PORT= process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));