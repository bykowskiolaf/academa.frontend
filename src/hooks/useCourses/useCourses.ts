import { COURSE_DROPOUT, COURSE_SIGNUP } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { courseQueryOptions } from './courseQueryOptions';
import { coursesQueryOptions } from './coursesQueryOptions';
import { enrolledCoursesQueryOptions } from './enrolledCoursesQueryOptions';

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
    data: enrolledCourses,
    refetch: refetchEnrolledCourses,
    error: enrolledCoursesError,
    isLoading: enrolledCoursesIsLoading
  } = useSuspenseQuery(enrolledCoursesQueryOptions());

  const {
    data: course,
    refetch: refetchCourse,
    error: courseError,
    isLoading: courseIsLoading
  } = uuid
    ? useSuspenseQuery(courseQueryOptions({ uuid }))
    : {
        data: undefined,
        refetch: async () => {},
        error: null,
        isLoading: false
      };

  const {
    mutateAsync: signUpToCourse,
    isPending: isSignUpToCoursePending,
    isError: isSignUpToCourseError
  } = useMutation({
    mutationKey: ['courseSignUp'],
    mutationFn: (uuid: string) =>
      Axios.post(COURSE_SIGNUP(uuid))
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          throw err;
        })
  });

  const {
    mutateAsync: dropCourse,
    isPending: isDropCoursePending,
    isError: isDropCourseError
  } = useMutation({
    mutationKey: ['courseDrop'],
    mutationFn: (uuid: string) =>
      Axios.delete(COURSE_DROPOUT(uuid))
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          throw err;
        })
  });

  return {
    courses,
    coursesError,
    coursesIsLoading,
    refetchCourses,

    enrolledCourses,
    enrolledCoursesError,
    enrolledCoursesIsLoading,
    refetchEnrolledCourses,

    course,
    courseError,
    courseIsLoading,
    refetchCourse,

    signUpToCourse,
    isSignUpToCourseError,
    isSignUpToCoursePending,

    dropCourse,
    isDropCourseError,
    isDropCoursePending
  };
};

export default useCourses;
