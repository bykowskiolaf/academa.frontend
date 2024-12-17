import EnrolledCoursesPage from '@/pages/EnrolledCourses';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/courses/enrolled')({
  component: EnrolledCoursesPage
});
