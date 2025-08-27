import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCompany } from "../services";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });

  const deleteCompanyById = async (id: string): Promise<void> => {
    await mutation.mutateAsync(id);
  };

  return {
    deleteCompanyById,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
