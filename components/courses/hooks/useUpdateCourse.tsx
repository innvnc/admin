import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CourseInputs } from '../validators';
import { ICoursesResponse } from '@/interfaces';
import { updateCourse as updateCourseService } from '../services';

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation( {
    mutationFn: ( { id, data }: { id: string; data: CourseInputs; } ) => updateCourseService( id, data ),
    onSuccess: ( data ) => {
      queryClient.invalidateQueries( {
        queryKey: [ 'courses' ]
      } );
      queryClient.invalidateQueries( {
        queryKey: [ 'course' ]
      } );
      return data;
    }
  } );

  const updateCourse = async ( id: string, data: CourseInputs ): Promise<ICoursesResponse> => {
    const result = await mutation.mutateAsync( { id, data } );
    return result;
  };

  return {
    updateCourse,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error
  };
};