import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ICoursesResponse } from '@/interfaces';
import { CourseInputs } from '../validators';
import { updateCourse } from '../services';



export const useUpdateCourse = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation<ICoursesResponse, Error, { course: CourseInputs; id: string; }>( {

    mutationFn: ( { id, course } ) => updateCourse( id, course ),

    onSuccess: ( data ) => {

      queryClient.invalidateQueries( {
        queryKey: [ 'course' ]
      } );

      queryClient.invalidateQueries( {
        queryKey: [ 'courses' ]
      } );

      return data;
    }
  } );

  const courseUpdate = async ( course: CourseInputs, id: string ): Promise<ICoursesResponse> => {
    const result = await mutation.mutateAsync( { id, course } );
    return result;
  };

  return {
    courseUpdate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error
  };
};