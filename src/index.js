const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
require('dotenv').config();

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for all origins
app.use(morgan("dev")); // Logs HTTP requests in development

// API Routes
app.use("/api/users", userRouter); // Base URL for user-related routes
app.use("/api/notes", noteRouter); // Base URL for notes-related routes

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Notes API" });
});

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true); // Suppress mongoose strictQuery deprecation warning

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  });

