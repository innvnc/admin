import { useQuery } from '@tanstack/react-query';

import { getCourseById } from '../services';

export const useGetCourse = ( id: string ) => {
  const { isLoading, isFetching, isError, error, data: course } = useQuery( {
    queryKey: [ 'course' ],
    queryFn: () => getCourseById( id )
  } );

  return {
    isLoading,
    isFetching,
    isError,
    error,
    course
  };
};