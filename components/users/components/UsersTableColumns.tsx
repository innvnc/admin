import { ColumnDefinition, Icons } from "@/components/shared/ui";
import { IUsersResponse } from "../interfaces";
import { UI } from "@/components/shared";

interface Props {
  onEdit: ( id: string ) => void;
  onDelete: ( id: string, fullName: string ) => void;
}

export const UsersTableColumns = ( {
  onEdit,
  onDelete,
}: Props ): ColumnDefinition[] => [
    {
      name: "NOMBRE",
      uid: "name",
      searchable: true,
      sortable: true,
    },
    {
      name: "APELLIDO",
      uid: "lastName",
      searchable: true,
      sortable: true,
    },
    {
      name: "USERNAME",
      uid: "username",
      searchable: true,
      sortable: true,
    },
    {
      name: "SLUG",
      uid: "slug",
      searchable: true,
      sortable: true,
    },
    {
      name: "ROLES",
      uid: "roles",
      sortable: true,
      renderCell: ( item: IUsersResponse ) => (
        <div className="flex flex-row space-x-1">
          { item.roles.map( ( role ) => (
            <UI.Chip key={ role } color="primary" variant="flat">
              { role }
            </UI.Chip>
          ) ) }
        </div>
      ),
    },
    {
      name: "FECHA DE CREACIÓN",
      uid: "creationDate",
      sortable: true,
      renderCell: ( item: IUsersResponse ) => <span>{ item.creationDate }</span>,
    },
    {
      name: "ACTIVO",
      uid: "isActive",
      sortable: true,
      renderCell: ( item: IUsersResponse ) => (
        <div className="flex justify-center items-center">
          { item.isActive ? (
            <Icons.IoCheckmarkCircleOutline className="text-success-500" size={ 20 } />
          ) : (
            <Icons.IoCloseCircleOutline className="text-danger-500" size={ 20 } />
          ) }
        </div>
      ),
    },
    {
      name: "ACCIONES",
      uid: "actions",
      sortable: false,
      renderCell: ( item: IUsersResponse ) => (
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
                startContent={
                  <Icons.IoPencilOutline className="text-default-500" />
                }
                textValue="Editar"
                onPress={ () => onEdit( item.id ) }
              >
                Editar
              </UI.DropdownItem>
              <UI.DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={ <Icons.IoTrashOutline className="text-danger" /> }
                textValue="Eliminar"
                onPress={ () => onDelete( item.id, `${ item.name } ${ item.lastName }` ) }
              >
                Eliminar
              </UI.DropdownItem>
            </UI.DropdownMenu>
          </UI.Dropdown>
        </div>
      ),
    },
  ];