import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUsersResponse } from "../interfaces";
import { updateUser } from '../services';
import { UserInputs } from "../validators";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation( {
    mutationFn: ( { id, data }: { id: string; data: UserInputs; } ) =>
      updateUser( id, data ),
    onSuccess: ( data ) => {
      queryClient.invalidateQueries( {
        queryKey: [ "users" ],
      } );

      queryClient.invalidateQueries( {
        queryKey: [ "user" ],
      } );

      return data;
    },
    retry: 2,
    retryDelay: ( attemptIndex ) => Math.min( 1000 * 2 ** attemptIndex, 10000 ),
  } );

  const updateUserInfo = async (
    id: string,
    data: UserInputs,
  ): Promise<IUsersResponse> => {
    const result = await mutation.mutateAsync( { id, data } );

    return result;
  };

  return {
    error: mutation.error,
    isError: mutation.isError,
    isPending: mutation.isPending,
    updateUserInfo,
  };
};