import { courseQueryOptions } from '@/hooks/useCourses/courseQueryOptions';
import CoursePage from '@/pages/CoursePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/course/$courseUuid')({
  loader: ({ context: { queryClient }, params }) => {
    queryClient.ensureQueryData(
      courseQueryOptions({ uuid: params.courseUuid })
    );
  },
  component: CoursePage
});
