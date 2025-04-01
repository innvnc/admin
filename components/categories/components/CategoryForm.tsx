import { UI } from '@/components';

interface Props {
  id?: string;
  triggerElement?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: ( isOpen: boolean ) => void;
}

export const CategoryForm = ( { id, triggerElement, isOpen: externalIsOpen, onOpenChange: externalOnOpenChange }: Props ) => {
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
        <UI.Button onPress={ onOpen }>Crear</UI.Button>
      ) }
      <UI.Modal isOpen={ isOpen } onOpenChange={ onOpenChange } backdrop="blur" isDismissable={ false }>
        <UI.ModalContent>
          { ( onClose ) => (
            <>
              <UI.ModalHeader className="flex flex-col gap-1">
                { id ? 'Editar Categoría' : 'Crear Categoría' }
              </UI.ModalHeader>
              <UI.ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                </p>
              </UI.ModalBody>
              <UI.ModalFooter>
                <UI.Button color="danger" variant="light" onPress={ onClose }>
                  Close
                </UI.Button>
                <UI.Button color="primary" onPress={ onClose }>
                  Action
                </UI.Button>
              </UI.ModalFooter>
            </>
          ) }
        </UI.ModalContent>
      </UI.Modal>
    </>
  );
};