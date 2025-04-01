import { UI } from '@/components';
import { Icons } from '@/components/shared/ui';


interface Props {
  id?: string;
  isOpen?: boolean;
  name: string;
  triggerElement?: React.ReactNode;
  onOpenChange?: ( isOpen: boolean ) => void;
}

export const CategoryForm = ( { id, triggerElement, isOpen: externalIsOpen, onOpenChange: externalOnOpenChange, name }: Props ) => {

  const internalDisclosure = UI.useDisclosure();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalDisclosure.isOpen;
  const onOpen = externalOnOpenChange ? () => externalOnOpenChange( true ) : internalDisclosure.onOpen;
  const onOpenChange = externalOnOpenChange || internalDisclosure.onOpenChange;

  return (
    <>
      { triggerElement ? (
        <span onClick={ onOpen } className="w-full cursor-pointer">
          { triggerElement }
        </span>
      ) : (
        <UI.Button onPress={ onOpen } variant="light" startContent={ <Icons.IoAddOutline size={ 24 } /> }>Crear { name }</UI.Button>
      ) }
      <UI.Modal isOpen={ isOpen } onOpenChange={ onOpenChange } backdrop="blur" isDismissable={ false }>
        <UI.ModalContent>
          { ( onClose ) => (
            <>
              <UI.ModalHeader className="flex flex-row gap-1 justify-center items-center">
                { id ?
                  ( <><Icons.IoPencilOutline /> Editar { name } </> )
                  : ( <><Icons.IoAddOutline /> Crear { name } </> )
                }
              </UI.ModalHeader>
              <UI.ModalBody>

              </UI.ModalBody>
              <UI.ModalFooter className="justify-center flex items-center space-x-3">
                <UI.Button color="danger" variant="light" onPress={ onClose } startContent={ <Icons.IoArrowBackOutline size={ 24 } /> }>
                  Cerrar
                </UI.Button>
                <UI.Button color="secondary" onPress={ onClose } startContent={ <Icons.IoSaveOutline size={ 24 } /> }>
                  Guardar
                </UI.Button>
              </UI.ModalFooter>
            </>
          ) }
        </UI.ModalContent>
      </UI.Modal>
    </>
  );
};