import { useState } from "react";
import { addToast } from "@heroui/react";


import { UI } from "@/components/shared";
import { useGetUsers, useDeleteUserById } from '../hooks';

export const useUsersListHelper = () => {
  const { users, refetch } = useGetUsers();
  const { removeUser, isPending } = useDeleteUserById();
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();

  const [ selectedUserId, setSelectedUserId ] = useState<string | undefined>( undefined );
  const [ userToDelete, setUserToDelete ] = useState<string | undefined>( undefined );
  const [ userFullName, setUserFullName ] = useState<string | undefined>( undefined );
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( false );

  const handleEditUser = ( id: string ) => {
    setSelectedUserId( id );
    onOpen();
  };

  const handleDeleteUser = ( id: string, fullName: string ) => {
    setUserToDelete( id );
    setUserFullName( fullName );
    setIsDeleteModalOpen( true );
  };

  const onConfirmDelete = async () => {
    if ( !userToDelete || !userFullName ) return;

    try {
      await removeUser( userToDelete );
      await refetch();

      addToast( {
        title: "Éxito",
        description: `El usuario "${ userFullName }" ha sido eliminado correctamente.`,
        color: "success",
      } );

      setIsDeleteModalOpen( false );
      setUserToDelete( undefined );
      setUserFullName( undefined );
    } catch ( error ) {
      addToast( {
        title: "Error",
        description: `Hubo un problema al eliminar el usuario "${ userFullName }".`,
        color: "danger",
      } );
    }
  };

  return {
    users,
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
  };
};