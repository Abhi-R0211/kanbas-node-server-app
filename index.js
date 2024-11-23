import express from 'express';
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import CourseRoutes from './Kanbas/Courses/routes.js';
import "dotenv/config";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';
//test comment
const app = express()
app.use(cors({
    credentials: true,
    origin: "https://a5--kanbas-react-app-abhishek-raghuraman.netlify.app/#/Labs/Lab5" || "http://localhost:3000",
})); 
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
  session(sessionOptions)
);

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000)
