import { Category } from '@/interfaces';
import { ColumnDefinition, Icons } from '@/components/shared/ui';
import { UI } from '@/components/shared';

interface Props {
  onEdit: ( id: string ) => void;
  onDelete: ( id: string ) => void;
}

export const CategoriesTableColumns = ( { onEdit, onDelete }: Props ): ColumnDefinition[] => [
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
              onPress={ () => onDelete( item.id ) }
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
