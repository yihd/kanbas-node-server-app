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

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/Kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  
app.use(session(sessionOptions));

app.use(express.json());

// Register routes
Lab5(app);
Hello(app);
Courses(app);
ModuleRoutes(app);
Assignments(app);
SessionExercises(app);
Users(app);

app.listen(4000 || process.env.PORT);
