import { UI } from "@/components";
import { ColumnDefinition, Icons } from "@/components/shared/ui";
import { CompaniesResponse } from "../interfaces";

interface Props {
  onView: ( id: string ) => void;
  onEdit: ( id: string ) => void;
  onDelete: ( id: string, name: string ) => void;
}

export const CompaniesTableColumns = ( {
  onView,
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
      name: "EMAIL",
      uid: "email",
      searchable: true,
      sortable: true,
    },
    {
      name: "TELÉFONO",
      uid: "phone",
      searchable: true,
      sortable: true,
    },
    {
      name: "DIRECCIÓN",
      uid: "address",
      searchable: true,
      sortable: true,
    },
    {
      name: "FECHA DE CREACIÓN",
      uid: "creationDate",
      sortable: true,
      renderCell: ( item: CompaniesResponse ) => <span>{ item.creationDate }</span>,
    },
    {
      name: "CREADO POR",
      uid: "createdBy",
      sortable: true,
      renderCell: ( item: CompaniesResponse ) => (
        <div className="flex items-center gap-2">
          <span>{ item.createdBy.name }</span>
          <span>{ item.createdBy.lastName }</span>
        </div>
      ),
    },
    {
      name: "ACCIONES",
      uid: "actions",
      sortable: false,
      renderCell: ( item: CompaniesResponse ) => (
        <div className="relative flex items-center justify-center">
          <UI.Dropdown>
            <UI.DropdownTrigger>
              <UI.Button isIconOnly size="sm" variant="light">
                <Icons.IoEllipsisVerticalOutline className="text-default-500" />
              </UI.Button>
            </UI.DropdownTrigger>
            <UI.DropdownMenu aria-label="Acciones disponibles">
              <UI.DropdownItem
                key="view"
                startContent={ <Icons.IoEyeOutline className="text-default-500" /> }
                textValue="Ver"
                onPress={ () => onView( item.id ) }
              >
                Ver
              </UI.DropdownItem>
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
                onPress={ () => onDelete( item.id, item.name ) }
              >
                Eliminar
              </UI.DropdownItem>
            </UI.DropdownMenu>
          </UI.Dropdown>
        </div>
      ),
    },
  ];
