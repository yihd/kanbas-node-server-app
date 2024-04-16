import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

// Route imports
import Hello from "./Hi.js";
import Courses from './Courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import Lab5 from "./Lab.js";
import Assignments from "./Kanbas/assignments/routes.js";
import SessionExercises from "./SessionExercises.js";
import Users from "./users/routes.js";

// Database connection
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);
// const cors = require("cors"); //this is a library to config easily cors
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure CORS with specific settings
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL  // Ensure FRONTEND_URL is correctly set in .env
}));

// Configure session with specific options
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
  cookie: {}
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.sameSite = "none";
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.domain = process.env.HTTP_SERVER_DOMAIN;
}

app.use(session(sessionOptions));

// Register routes
Lab5(app);
Hello(app);
Courses(app);
ModuleRoutes(app);
Assignments(app);
SessionExercises(app);
Users(app);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
