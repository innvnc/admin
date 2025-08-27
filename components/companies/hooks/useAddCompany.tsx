import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCompany } from "../services";
import { CompanyInputs } from "../validators";

import { CompaniesResponse } from "../interfaces";

export const useAddCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (company: CompanyInputs) => createCompany(company),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

      return data;
    },
  });

  const addNewCompany = async (
    company: CompanyInputs,
  ): Promise<CompaniesResponse> => {
    const result = await mutation.mutateAsync(company);

    return result;
  };

  return {
    addNewCompany,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
