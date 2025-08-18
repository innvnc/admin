// useGetUser.tsx
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../services";

export const useGetUserById = ( id: string ) => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: user,
  } = useQuery( {
    queryKey: [ "user", id ],
    queryFn: () => getUser( id ),
    enabled: !!id,
    retry: 3,
    retryDelay: ( attemptIndex ) => Math.min( 1000 * 2 ** attemptIndex, 10000 ),
  } );

  return {
    error,
    isError,
    isFetching,
    isLoading,
    user,
  };
};