import { useState } from "react";
import { addToast } from "@heroui/react";

import { useDeleteCompany, useGetCompanies } from "../hooks";
import { UI } from "@/components/shared";

export const useCompaniesListHelper = () => {
  const { companies, refetch } = useGetCompanies();
  const { deleteCompanyById, isPending } = useDeleteCompany();
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();

  const [ selectedCompanyId, setSelectedCompanyId ] = useState<string | undefined>( undefined );
  const [ companyToDelete, setCompanyToDelete ] = useState<string | undefined>( undefined );
  const [ companyName, setCompanyName ] = useState<string | undefined>( undefined );
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( false );
  const [ isViewOpen, setIsViewOpen ] = useState( false );
  const [ viewCompanyId, setViewCompanyId ] = useState<string | undefined>( undefined );

  const handleViewCompany = ( id: string ) => {
    setViewCompanyId( id );
    setIsViewOpen( true );
  };

  const handleEditCompany = ( id: string ) => {
    setSelectedCompanyId( id );
    onOpen();
  };

  const handleDeleteCompany = ( id: string, name: string ) => {
    setCompanyToDelete( id );
    setCompanyName( name );
    setIsDeleteModalOpen( true );
  };

  const onConfirmDelete = async () => {
    if ( !companyToDelete || !companyName ) return;

    try {
      await deleteCompanyById( companyToDelete );
      await refetch();

      addToast( {
        title: "Éxito",
        description: `La empresa "${ companyName }" ha sido eliminada correctamente.`,
        color: "success",
      } );

      setIsDeleteModalOpen( false );
      setCompanyToDelete( undefined );
      setCompanyName( undefined );
    } catch ( error ) {
      addToast( {
        title: "Error",
        description: `Hubo un problema al eliminar la empresa "${ companyName }".`,
        color: "danger",
      } );
    }
  };

  return {
    companies,
    companyName,
    handleDeleteCompany,
    handleEditCompany,
    handleViewCompany,
    isDeleteModalOpen,
    isOpen,
    isPending,
    isViewOpen,
    onConfirmDelete,
    onOpenChange,
    selectedCompanyId,
    setIsDeleteModalOpen,
    setIsViewOpen,
    viewCompanyId,
  };
};
