import { useQuery } from '@tanstack/react-query';

import { getCourseInstructorByCourseId } from '../services';
import { ICourseInstructor } from '../interfaces';





export const useGetCourseInstructorByCourseId = ( courseId: string ) => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: courseInstructor,
  } = useQuery<ICourseInstructor, Error>( {
    queryKey: [ 'courseInstructor', courseId ],
    queryFn: () => getCourseInstructorByCourseId( courseId ),
    refetchOnWindowFocus: false,
  } );

  return {
    courseInstructor,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
