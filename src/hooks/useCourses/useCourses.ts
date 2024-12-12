import { useSuspenseQuery } from '@tanstack/react-query';
import { courseQueryOptions } from './useCourseQueryOptions';
import { coursesQueryOptions } from './useCoursesQueryOptions';

interface UseCoursesProps {
  pagination?: Pagination;
  uuid?: string;
}

const useCourses = ({ pagination, uuid }: UseCoursesProps) => {
  const {
    data: courses,
    refetch: refetchCourses,
    error: coursesError,
    isLoading: coursesIsLoading
  } = useSuspenseQuery(
    coursesQueryOptions({
      pageNumber: pagination?.pageNumber,
      pageSize: pagination?.pageSize
    })
  );

  const {
    data: course,
    refetch: refetchCourse,
    error: courseError,
    isLoading: courseIsLoading
  } = useSuspenseQuery(courseQueryOptions({ uuid: uuid || '' }));

  return {
    courses,
    coursesError,
    coursesIsLoading,
    refetchCourses,

    course,
    courseError,
    courseIsLoading,
    refetchCourse
  };
};

export default useCourses;
