import Database from "../Database/index.js";
import model from "./model.js";

export function createAssignment(assignment) {
    delete assignment._id
    return model.create(assignment); 
}

export function findAssignmentforCourse(courseId){
    // const {assignments}=Database;
    // return assignments.filter((assignment)=>assignment.course===courseId);
    return model.find({ course: courseId });
}

export function updateAssignment(assignmentId,updates){
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // if(!assignment) return null;
    // Object.assign(assignment, updates);
    // return assignment;
    return model.updateOne({ _id: assignmentId }, updates);

}

export function deleteAssignment(assignmentId){
    // const { assignments } = Database;
    // const assignmentExists = assignments.some((a) => a._id === assignmentId);
    // if(!assignmentExists) return false;
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    // return true;
    return model.deleteOne({ _id: assignmentId });
}