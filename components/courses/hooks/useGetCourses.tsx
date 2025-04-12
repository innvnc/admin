import { useQuery } from '@tanstack/react-query';

import { getCourses } from '../services';



export const useGetCourses = () => {

  const { isLoading, isFetching, isError, error, data: courses, refetch } = useQuery( {
    queryKey: [ 'courses' ],
    queryFn: () => getCourses(),
    refetchOnWindowFocus: false
  } );

  return {
    isLoading,
    isFetching,
    isError,
    error,
    courses,
    refetch
  };
};