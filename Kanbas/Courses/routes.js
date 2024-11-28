import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import Database from "../Database/index.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    try {
      const { courses, enrollments } = Database;
      Database.courses = courses.filter((course) => course._id !== id);
      Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.course !== id
      );
      res.status(200).send({ success: true });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: "Error deleting course" });
    }
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });





}
