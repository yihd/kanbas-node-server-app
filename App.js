import "dotenv/config";
import express from "express";
import Hello from "./Hi.js";
import Courses from './Courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import cors from "cors";
import Lab5 from "./Lab.js";
import Assignments from "./Kanbas/assignments/routes.js";
import session from "express-session";
import SessionExercises from "./SessionExercises.js";
// import SecurityController from "./SecurityController.js";
// import UserRoutes from "./Kanbas/users/routes.js";
import Users from "./users/routes.js";
import mongoose from "mongoose";



const CONNECTION_STRING = process.env.DB_CONNECTION_STRING 
// console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS settings
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === 'development') {
        callback(null, true); // Allow all origins in development
      } else {
        const allowedOrigins = [process.env.FRONTEND_URL]; // Only allow specific origin in production
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    }
}));

// Session settings
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
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

Lab5(app);
Hello(app);
Courses(app);
ModuleRoutes(app);
// SecurityController(app);
Assignments(app);
SessionExercises(app);
Users(app);
const port = process.env.PORT || 4000;
app.listen(port);
// app.listen(4000);
// app.listen(process.env.PORT || 4000);