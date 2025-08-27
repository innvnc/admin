import { UI } from "@/components";
import { Icons } from "@/components/shared/ui";
import { useGetCompany } from "../hooks";

interface Props {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyViewModal = ( { id, isOpen, onClose }: Props ) => {
  const { company } = useGetCompany( id || "" );

  return (
    <UI.Modal isOpen={ isOpen } onOpenChange={ onClose }>
      <UI.ModalContent>
        <UI.ModalHeader className="flex flex-row justify-center space-x-2">
          <Icons.IoBusinessOutline size={ 24 } />
          <h3 className="text-lg font-semibold">Ver empresa</h3>
        </UI.ModalHeader>

        <UI.ModalBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UI.Input isReadOnly label="Nombre" labelPlacement="outside" value={ company?.name ?? "" } />
            <UI.Input isReadOnly label="Correo electrónico" labelPlacement="outside" value={ company?.email ?? "" } />
            <UI.Input isReadOnly label="Teléfono" labelPlacement="outside" value={ company?.phone ?? "" } />
            <UI.Input isReadOnly label="Dirección" labelPlacement="outside" value={ company?.address ?? "" } />
          </div>
          <UI.Textarea isReadOnly label="Descripción" labelPlacement="outside" value={ company?.description ?? "" } />
        </UI.ModalBody>

        <UI.ModalFooter className="flex flex-row justify-center space-x-2">
          <UI.Button
            color="default"
            startContent={ <Icons.IoArrowBackOutline size={ 20 } /> }
            variant="flat"
            onPress={ onClose }
          >
            Cerrar
          </UI.Button>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
};
