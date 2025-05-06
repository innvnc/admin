'use client';

import { UI } from '@/components/shared';
import { GenericTable } from '@/components/shared/ui';

import { CategoriesTableColumns, CategoryFormLayout, DeleteCategoryModal } from './components';
import { useCategoriesListHelper } from './helpers';

export const CategoriesList = () => {
  const {
    categories,
    handleDeleteCategory,
    handleEditCategory,
    isDeleteModalOpen,
    isOpen,
    isPending,
    onConfirmDelete,
    onOpenChange,
    selectedCategoryId,
    setIsDeleteModalOpen,
    categoryTitle,
  } = useCategoriesListHelper();

  return (
    <div className="categories-list">
      <div className="categories-list__container">
        <UI.Card>
          <UI.CardBody>
            <GenericTable
              title="Categorías"
              columns={ CategoriesTableColumns( {
                onEdit: handleEditCategory,
                onDelete: handleDeleteCategory,
              } ) }
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
                'visible',
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

      <DeleteCategoryModal
        isOpen={ isDeleteModalOpen }
        isPending={ isPending }
        onCancel={ () => setIsDeleteModalOpen( false ) }
        onConfirm={ onConfirmDelete }
        categoryTitle={ categoryTitle || '' }
      />
    </div>
  );
};
