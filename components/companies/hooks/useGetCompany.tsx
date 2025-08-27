import { useQuery } from "@tanstack/react-query";

import { getCompanyById } from "../services";

export const useGetCompany = ( id: string ) => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: company,
  } = useQuery( {
    enabled: Boolean( id ),
    queryKey: [ "company", id ],
    queryFn: () => getCompanyById( id ),
    refetchOnWindowFocus: false,
  } );

  return {
    isLoading,
    isFetching,
    isError,
    error,
    company,
  };
};
