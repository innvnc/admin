import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "../services";

export const useGetCompanies = () => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: companies,
    refetch,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(),
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    isFetching,
    isError,
    error,
    companies,
    refetch,
  };
};
