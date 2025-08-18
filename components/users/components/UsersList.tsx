// UsersList.tsx
"use client";


import { GenericTable } from "@/components/shared/ui";
import { UI } from "@/components/shared";
import { useUsersListHelper } from '../helpers';
import { DeleteUserModal, UserFormLayout, UsersTableColumns } from './';


export const UsersList = () => {
  const {
    handleDeleteUser,
    handleEditUser,
    isDeleteModalOpen,
    isOpen,
    isPending,
    onConfirmDelete,
    onOpenChange,
    selectedUserId,
    setIsDeleteModalOpen,
    userFullName,
    users,
  } = useUsersListHelper();

  return (
    <div className="users-list">
      <div className="users-list__container">
        <UI.Card>
          <UI.CardBody>
            <GenericTable
              addButtonComponent={ <UserFormLayout name="usuario" /> }
              addButtonText="Agregar Usuario"
              columns={ UsersTableColumns( {
                onEdit: handleEditUser,
                onDelete: handleDeleteUser,
              } ) }
              initialRowsPerPage={ 5 }
              initialSortColumn="name"
              initialSortDirection="ascending"
              initialVisibleColumns={ [
                "name",
                "lastName",
                "slug",
                "roles",
                "actions",
              ] }
              items={ users || [] }
              noItemsMessage="No se encontraron usuarios"
              primaryKey="id"
              searchFields={ [ "name", "lastName", "slug", "roles" ] }
              title="Usuarios"
              onAdd={ () => { } }
            />
          </UI.CardBody>
        </UI.Card>
      </div>

      { isOpen && (
        <UserFormLayout
          id={ selectedUserId }
          isOpen={ isOpen }
          name="usuario"
          onOpenChange={ onOpenChange }
        />
      ) }

      <DeleteUserModal
        isOpen={ isDeleteModalOpen }
        isPending={ isPending }
        onCancel={ () => setIsDeleteModalOpen( false ) }
        onConfirm={ onConfirmDelete }
        userFullName={ userFullName || "" }
      />
    </div>
  );
};