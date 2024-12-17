import { COURSE } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const courseQueryOptions = ({ uuid }: { uuid: string }) =>
  queryOptions({
    queryKey: ['course', uuid],
    queryFn: async () =>
      Axios.get<FullCourse>(COURSE(uuid))
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          throw err;
        })
  });
