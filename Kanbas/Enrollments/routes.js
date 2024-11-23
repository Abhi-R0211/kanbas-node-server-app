import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        try {
          const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
          if (!newEnrollment) {
            return res
              .status(400)
              .json({ error: "User is already enrolled in this course" });
          }
          res.status(201).json(newEnrollment);
        } catch (error) {
          console.error("Error enrolling user:", error);
          res.status(500).json({ error: "Failed to enroll user" });
        }
      });
      app.delete("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        try {
          const removedEnrollment = enrollmentsDao.unenrollUserFromCourse(
            userId,
            courseId
          );
          if (!removedEnrollment) {
            return res.status(404).json({ error: "Enrollment not found" });
          }
          res.status(200).json(removedEnrollment);
        } catch (error) {
          console.error("Error unenrolling user:", error);
          res.status(500).json({ error: "Failed to unenroll user" });
        }
      });
      app.get("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        try {
          const enrollments = enrollmentsDao.findEnrollmentsForUser(userId);
          res.status(200).json(enrollments);
        } catch (error) {
          console.error("Error fetching enrollments:", error);
          res.status(500).json({ error: "Failed to fetch enrollments" });
        }
      });
      app.get("/api/enrollments", (req, res) => {
        try {
          const enrollments = enrollmentsDao.findAllEnrollments();
          res.json(enrollments);
        } catch (error) {
          console.error("Error fetching enrollments:", error);
          res.status(500).json({ error: "Failed to fetch enrollments" });
        }
      });
}