import { COURSES } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteCourses = ({ pageSize }: { pageSize: number }) => {
  const query = useInfiniteQuery<CoursesPaginated, Error>({
    queryKey: ['courses', pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await Axios.get<CoursesPaginated>(COURSES(), {
        params: { pageNumber: pageParam, pageSize }
      });
      return response.data;
    },
    getNextPageParam: lastPage => {
      // If there are more pages, return the next page number, otherwise undefined
      if (lastPage.page.number + 1 < lastPage.page.totalPages) {
        return lastPage.page.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0
  });

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage
  };
};
