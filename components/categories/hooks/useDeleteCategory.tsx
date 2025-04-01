import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCategory } from '../services';




export const useDeleteCategory = ( id: string ) => {

  const queryClient = useQueryClient();

  const mutation = useMutation( {

    mutationFn: () => deleteCategory( id ),

    onSuccess: () => {

      queryClient.invalidateQueries( {
        queryKey: [ 'categories' ]
      } );

      queryClient.invalidateQueries( {
        queryKey: [ 'category' ]
      } );

    }
  } );

  return mutation;
};
