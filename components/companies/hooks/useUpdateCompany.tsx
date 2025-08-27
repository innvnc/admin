import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompanyInputs } from "../validators";
import { updateCompany } from "../services";

import { CompaniesResponse } from "../interfaces";

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CompaniesResponse,
    Error,
    { company: CompanyInputs; id: string }
  >({
    mutationFn: ({ id, company }) => updateCompany(id, company),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

      return data;
    },
  });

  const companyUpdate = async (
    company: CompanyInputs,
    id: string,
  ): Promise<CompaniesResponse> => {
    const result = await mutation.mutateAsync({ id, company });

    return result;
  };

  return {
    companyUpdate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
