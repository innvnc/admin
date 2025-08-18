import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "../services";

export const useDeleteUserById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation( {
    mutationFn: ( id: string ) => deleteUser( id ),
    onSuccess: () => {
      queryClient.invalidateQueries( {
        queryKey: [ "users" ],
      } );
      queryClient.invalidateQueries( {
        queryKey: [ "user" ],
      } );
    },
    retry: 2,
    retryDelay: ( attemptIndex ) => Math.min( 1000 * 2 ** attemptIndex, 10000 ),
  } );

  const removeUser = async ( id: string ): Promise<void> => {
    await mutation.mutateAsync( id );
  };

  return {
    error: mutation.error,
    isError: mutation.isError,
    isPending: mutation.isPending,
    removeUser,
  };
};