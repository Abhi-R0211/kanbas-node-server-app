import Database from "../Database/index.js";

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
  }

export function findAssignmentforCourse(courseId){
    const {assignments}=Database;
    return assignments.filter((assignment)=>assignment.course===courseId);
}

export function updateAssignment(assignmentId,updates){
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    if(!assignment) return null;
    Object.assign(assignment, updates);
    return assignment;
}

export function deleteAssignment(assignmentId){
    const { assignments } = Database;
    const assignmentExists = assignments.some((a) => a._id === assignmentId);
    if(!assignmentExists) return false;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    return true;
}