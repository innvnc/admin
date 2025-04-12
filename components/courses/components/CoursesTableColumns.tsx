import { ColumnDefinition, Icons } from '@/components/shared/ui';
import { ICoursesResponse } from '@/interfaces';
import { UI } from '@/components/shared';

interface Props {
  onEdit: ( id: string ) => void;
  onDelete: ( id: string, title: string ) => void;
}

export const CoursesTableColumns = ( { onEdit, onDelete }: Props ): ColumnDefinition[] => [
  {
    name: 'TÍTULO',
    uid: 'title',
    searchable: true,
    sortable: true,
  },
  {
    name: 'SLUG',
    uid: 'slug',
    searchable: true,
    sortable: true,
  },
  {
    name: 'DESCRIPCIÓN',
    uid: 'description',
    searchable: true,
    sortable: true,
  },
  {
    name: 'PRECIO',
    uid: 'price',
    searchable: true,
    sortable: true,
  },
  {
    name: 'PÚBLICO',
    uid: 'isPublic',
    sortable: true,
    renderCell: ( item: ICoursesResponse ) => (
      <div className="flex justify-center items-center">
        { item.isPublic ? (
          <Icons.IoEyeOutline className="text-success-500" size={ 20 } />
        ) : (
          <Icons.IoEyeOffOutline className="text-danger-500" size={ 20 } />
        ) }
      </div>
    ),
  },
  {
    name: 'CATEGORÍAS',
    uid: 'categories',
    sortable: false,
    renderCell: ( item: ICoursesResponse ) => (
      <div className="flex flex-wrap gap-1">
        { item.categories.map( ( category ) => (
          <div
            key={ category.id }
            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            { category.title }
          </div>
        ) ) }
      </div>
    ),
  },
  {
    name: 'FECHA DE CREACIÓN',
    uid: 'creationDate',
    sortable: true,
    renderCell: ( item: ICoursesResponse ) => <span>{ item.creationDate }</span>,
  },
  {
    name: 'CREADO POR',
    uid: 'createdBy',
    sortable: true,
    renderCell: ( item: ICoursesResponse ) => (
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
    renderCell: ( item: ICoursesResponse ) => (
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
              onPress={ () => onEdit( item.id ) }
              textValue="Editar"
            >
              Editar
            </UI.DropdownItem>
            <UI.DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={ <Icons.IoTrashOutline className="text-danger" /> }
              onPress={ () => onDelete( item.id, item.title ) }
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
