import Database from "../Database/index.js";
import model from "./model.js";

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;

//   // Check if the user is already enrolled to prevent duplicates
//   const isAlreadyEnrolled = enrollments.some(
//     (enrollment) => enrollment.user === userId && enrollment.course === courseId
//   );

//   if (isAlreadyEnrolled) {
//     return null; // User is already enrolled
//   }

//   const newEnrollment = {
//     _id: Date.now().toString(),
//     user: userId,
//     course: courseId,
//   };
//   enrollments.push(newEnrollment);
//   return newEnrollment;
// }

// export function unenrollUserFromCourse(userId, courseId) {
//   const { enrollments } = Database;
//   const enrollmentIndex = enrollments.findIndex(
//     (enrollment) => enrollment.user === userId && enrollment.course === courseId
//   );

//   if (enrollmentIndex === -1) return null;

//   const [removedEnrollment] = enrollments.splice(enrollmentIndex, 1);
//   return removedEnrollment;
// }

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findAllEnrollments() {
  const { enrollments } = Database;
  return enrollments;
}


export async function findCoursesForUser(userId) {
  console.log("user id",userId);
  const enrollments = await model.find({ user: userId }).populate("course");
  console.log(enrollments);
  console.log('returning...');
  console.log(enrollments.map((enrollment) => enrollment.course));
  return enrollments.map((enrollment) => enrollment.course);
 }
 export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
 }
 export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
 }
 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 
