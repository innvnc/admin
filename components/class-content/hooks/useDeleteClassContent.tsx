import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteClassContent } from "../services";

export const useDeleteClassContent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation( {
    mutationFn: ( id: string ) => deleteClassContent( id ),
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: [ "classContents" ] } );
      queryClient.invalidateQueries( { queryKey: [ "classContent" ] } );
    },
  } );

  const deleteClassContentById = async ( id: string ): Promise<void> => {
    await mutation.mutateAsync( id );
  };

  return {
    deleteClassContentById,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};