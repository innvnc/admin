import { useQuery } from "@tanstack/react-query";

import { getCompanyById } from "../services";

export const useGetCompany = (id: string) => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: company,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => getCompanyById(id),
  });

  return {
    isLoading,
    isFetching,
    isError,
    error,
    company,
  };
};
