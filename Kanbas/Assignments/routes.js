import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
    //creates new assignment for a module
    app.post("/api/modules/:moduleId/assignments", (req, res) => {
        const { moduleId } = req.params;
        const {
          title,
          description,
          dueDate,
          availableFrom,
          availableUntil,
          points,
        } = req.body;
        try {
            const newAssignment = {
              title,
              description,
              points,
              dueDate: dueDate || null,
              availableFrom: availableFrom || null,
              availableUntil: availableUntil || null,
              module: moduleId,
              _id: Date.now().toString(), 
            };
            const createdAssignment = assignmentsDao.createAssignment(newAssignment);
            res.status(201).json(createdAssignment); 
          } catch (error) {
            console.error("Error creating assignment:", error);
            res.status(500).json({ error: "Failed to create assignment" });
          }
        });

    //updating assignment
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const updates = req.body;
        try {
          const updatedAssignment = assignmentsDao.updateAssignment(
            assignmentId,
            updates
          );
          if (!updatedAssignment) {
            return res.status(404).json({ error: "Assignment not found" });
          }
          res.json(updatedAssignment);
        } catch (error) {
          console.error("Error updating assignment:", error);
          res.status(500).json({ error: "Failed to update assignment" });
        }
      });

    //delete assignment
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        try {
          const status = assignmentsDao.deleteAssignment(assignmentId);
          if (!status) {
            return res.status(404).json({ error: "Assignment not found" });
          }
          res.sendStatus(204); // No Content
        } catch (error) {
          console.error("Error deleting assignment:", error);
          res.status(500).json({ error: "Failed to delete assignment" });
        }
      });
    
      //get assignments for a course
      app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        try {
          const assignments = assignmentsDao.findAssignmentforCourse(courseId);
          res.json(assignments);
        } catch (error) {
          console.error("Error fetching assignments for course:", error);
          res.status(500).json({ error: "Failed to fetch assignments" });
        }});

    //add assignment for a course id
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const newAssignment = { ...req.body, course: courseId };
      
        try {
          const createdAssignment = assignmentsDao.createAssignment(newAssignment);
          res.status(201).json(createdAssignment);
        } catch (error) {
          console.error("Error creating assignment:", error);
          res.status(500).json({ error: "Failed to create assignment" });
        }
      });
}