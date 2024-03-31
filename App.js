// // App.js
// import express from 'express';
// import hello from './Hi.js';
// import Lab5 from './Lab.js';
// import cors from "cors";
// // import CourseRoutes from "../public/Kanbas/Courses/routes.js";

// const app = express();
// // app.get('/hello', (req, res) => {res.send('Hello World!')})
// app.use(cors());
// app.use(express.json());
// // CourseRoutes(app);
// // Lab5(app);
// hello(app);

// app.listen(4000, () => {
//   console.log('Server is running on http://localhost:4000');
// });
// import express from 'express'
// import Hello from "./Hi.js"
// import Lab5 from './Lab.js';
// import cors from "cors";
// import CourseRoutes from "./courses/routes.js"; // I changed here from ./Kanbas/courses/routes.js to without Kanbas
// const app = express();
// app.use(cors());
// CourseRoutes(app);

// Hello(app);
// Lab5(app);
// app.listen(4000)

import express from "express";
import Hello from "./Hi.js";
import Courses from "./courses/routes.js";
import Modules from "./modules/routes.js";
import cors from "cors";
import Lab5 from "./Lab.js";
// import session from "express-session";
// import SessionExercises from "./SessionExercises.js";
// import Users from "./Users/routes.js";

const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(express.json());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );


Lab5(app);
Hello(app);
Courses(app);
 Modules(app);
// SessionExercises(app);
// Users(app);

app.listen(process.env.PORT || 4000);