import { COURSES } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const coursesQueryOptions = ({ pageNumber, pageSize }: Pagination) =>
  queryOptions({
    queryKey: ['courses', pageNumber, pageSize],
    queryFn: async () =>
      Axios.get<CoursesPaginated>(COURSES(), {
        params: {
          pageNumber,
          pageSize
        }
      })
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          throw err;
        })
  });
