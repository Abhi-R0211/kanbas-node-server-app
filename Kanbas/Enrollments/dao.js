import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}
export function findEnrollmentsByUserId(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}
export function addEnrollments(enrollment) {
  const newEnrollment = { ...enrollment, _id: Date.now().toString() };
  Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}