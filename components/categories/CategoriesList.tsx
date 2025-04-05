'use client';

import { useState } from 'react';

import { addToast } from '@heroui/react';

import { Category } from '@/interfaces';
import { ColumnDefinition, GenericTable, Icons } from '../shared/ui';
import { UI } from '../shared';
import { useGetCategories } from './hooks';
import { CategoryFormLayout } from './components';
import { useDeleteCategory } from './hooks/useDeleteCategory';

export const CategoriesList = () => {
  const { categories, refetch } = useGetCategories();
  const { deleteCategoryById, isPending } = useDeleteCategory();
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();
  const [ selectedCategoryId, setSelectedCategoryId ] = useState<string | undefined>( undefined );
  const [ categoryToDelete, setCategoryToDelete ] = useState<string | undefined>( undefined );
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( false );

  const handleEditCategory = ( id: string ) => {
    setSelectedCategoryId( id );
    onOpen();
  };

  const handleDeleteCategory = ( id: string ) => {
    setCategoryToDelete( id );
    setIsDeleteModalOpen( true );
  };

  const onConfirmDelete = async () => {
    if ( !categoryToDelete ) return;

    try {
      await deleteCategoryById( categoryToDelete );

      await refetch();

      addToast( {
        title: 'Éxito',
        description: 'La categoría ha sido eliminada correctamente.',
        color: 'success',
      } );

      setIsDeleteModalOpen( false );
      setCategoryToDelete( undefined );
    } catch ( error ) {
      addToast( {
        title: 'Error',
        description: 'Hubo un problema al eliminar la categoría.',
        color: 'danger',
      } );
    }
  };

  const categoryColumns: ColumnDefinition[] = [
    { name: 'TÍTULO', uid: 'title', sortable: true, searchable: true },
    { name: 'SLUG', uid: 'slug', sortable: true, searchable: true },
    {
      name: 'VISIBLE',
      uid: 'status',
      sortable: true,
      renderCell: ( item: Category ) => (
        <div
          className={ `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${ item.status
              ? 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100'
              : 'bg-red-50 text-red-700 border border-red-100 hover:bg-red-100'
            } transition-colors` }
        >
          { item.status ? 'Visible' : 'Oculto' }
        </div>
      ),
    },
    {
      name: 'FECHA DE CREACIÓN',
      uid: 'creationDate',
      sortable: true,
      renderCell: ( item: Category ) => <span>{ item.creationDate }</span>,
    },
    {
      name: 'CREADO POR',
      uid: 'createdBy',
      sortable: true,
      renderCell: ( item: Category ) => (
        <div className="flex items-center gap-2">
          <span>{ item.createdBy.name }</span>
          <span>{ item.createdBy.lastName }</span>
        </div>
      ),
    },
    {
      name: 'ACCIONES',
      uid: 'actions',
      sortable: false,
      renderCell: ( item: Category ) => (
        <div className="relative flex items-center justify-center">
          <UI.Dropdown>
            <UI.DropdownTrigger>
              <UI.Button isIconOnly size="sm" variant="light">
                <Icons.IoEllipsisVerticalOutline className="text-default-500" />
              </UI.Button>
            </UI.DropdownTrigger>
            <UI.DropdownMenu aria-label="Acciones disponibles">
              <UI.DropdownItem
                key="edit"
                startContent={ <Icons.IoPencilOutline className="text-default-500" /> }
                onPress={ () => handleEditCategory( item.id ) }
                textValue="Editar"
              >
                Editar
              </UI.DropdownItem>
              <UI.DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={ <Icons.IoTrashOutline className="text-danger" /> }
                onPress={ () => handleDeleteCategory( item.id ) }
                textValue="Eliminar"
              >
                Eliminar
              </UI.DropdownItem>
            </UI.DropdownMenu>
          </UI.Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="categories-list">
      <div className="categories-list__container">
        <UI.Card>
          <UI.CardBody>
            <GenericTable
              title="Categorías"
              columns={ categoryColumns }
              items={ categories || [] }
              primaryKey="id"
              searchFields={ [ 'title', 'slug' ] }
              onAdd={ () => { } }
              addButtonComponent={ <CategoryFormLayout name="categoría" /> }
              addButtonText="Agregar Categoría"
              noItemsMessage="No se encontraron categorías"
              initialVisibleColumns={ [
                'title',
                'slug',
                'status',
                'creationDate',
                'createdBy',
                'actions',
              ] }
              initialSortColumn="title"
              initialSortDirection="ascending"
              initialRowsPerPage={ 5 }
            />
          </UI.CardBody>
        </UI.Card>
      </div>

      { isOpen && (
        <CategoryFormLayout
          id={ selectedCategoryId }
          isOpen={ isOpen }
          onOpenChange={ onOpenChange }
          name="categoría"
        />
      ) }

      <UI.Modal isOpen={ isDeleteModalOpen } onOpenChange={ () => setIsDeleteModalOpen( false ) }>
        <UI.ModalContent>
          <UI.ModalHeader>
            <h3 className="text-lg font-semibold">Confirmar eliminación</h3>
          </UI.ModalHeader>
          <UI.ModalBody>
            <p>¿Estás seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer.</p>
          </UI.ModalBody>
          <UI.ModalFooter>
            <UI.Button variant="flat" color="default" onPress={ () => setIsDeleteModalOpen( false ) }>
              Cancelar
            </UI.Button>
            <UI.Button color="danger" onPress={ onConfirmDelete } isLoading={ isPending }>
              Eliminar
            </UI.Button>
          </UI.ModalFooter>
        </UI.ModalContent>
      </UI.Modal>
    </div>
  );
};
