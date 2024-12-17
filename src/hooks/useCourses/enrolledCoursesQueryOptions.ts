import { ENROLLED_COURSES } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const enrolledCoursesQueryOptions = () =>
  queryOptions({
    queryKey: ['enrolledCourses'],
    queryFn: async () =>
      Axios.get<Course[]>(ENROLLED_COURSES())
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          throw err;
        })
  });
