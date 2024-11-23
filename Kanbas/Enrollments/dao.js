import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}


export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  const enrollmentIndex = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (enrollmentIndex === -1) return null;

  const [removedEnrollment] = enrollments.splice(enrollmentIndex, 1);
  return removedEnrollment;
}

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findAllEnrollments() {
  const { enrollments } = Database;
  return enrollments;
}
