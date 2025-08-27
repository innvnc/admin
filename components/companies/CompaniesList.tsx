'use client';

import { CompaniesTableColumns } from "./components/CompaniesTableColumns";


import { UI } from "@/components/shared";
import { GenericTable } from "@/components/shared/ui";
import { useCompaniesListHelper } from './helpers';
import { CompanyFormLayout, CompanyViewModal, DeleteCompanyModal } from './components';

export const CompaniesList = () => {
  const {
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
  } = useCompaniesListHelper();

  return (
    <div className="companies-list">
      <div className="companies-list__container">
        <UI.Card>
          <UI.CardBody>
            <GenericTable
              addButtonComponent={ <CompanyFormLayout name="empresa" /> }
              addButtonText="Agregar Empresa"
              columns={ CompaniesTableColumns( {
                onView: handleViewCompany,
                onEdit: handleEditCompany,
                onDelete: handleDeleteCompany,
              } ) }
              initialRowsPerPage={ 5 }
              initialSortColumn="name"
              initialSortDirection="ascending"
              initialVisibleColumns={ [
                "name",
                "email",
                "phone",
                "address",
                "creationDate",
                "createdBy",
                "actions",
              ] }
              items={ companies || [] }
              noItemsMessage="No se encontraron empresas"
              primaryKey="id"
              searchFields={ [ "name", "email", "phone", "address" ] }
              title="Empresas"
              onAdd={ () => { } }
            />
          </UI.CardBody>
        </UI.Card>
      </div>

      { isOpen && (
        <CompanyFormLayout
          id={ selectedCompanyId }
          isOpen={ isOpen }
          name="empresa"
          onOpenChange={ onOpenChange }
        />
      ) }

      <CompanyViewModal
        id={ viewCompanyId }
        isOpen={ isViewOpen }
        onClose={ () => setIsViewOpen( false ) }
      />

      <DeleteCompanyModal
        companyName={ companyName || "" }
        isOpen={ isDeleteModalOpen }
        isPending={ isPending }
        onCancel={ () => setIsDeleteModalOpen( false ) }
        onConfirm={ onConfirmDelete }
      />
    </div>
  );
};
