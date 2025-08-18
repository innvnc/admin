import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services";

export const useGetUsers = () => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: users,
    refetch,
  } = useQuery( {
    queryKey: [ "users" ],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: ( attemptIndex ) => Math.min( 1000 * 2 ** attemptIndex, 10000 ),
    staleTime: 5 * 60 * 1000,
  } );

  return {
    error,
    isError,
    isFetching,
    isLoading,
    refetch,
    users,
  };
};