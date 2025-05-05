'use client';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useState, memo, useCallback } from 'react';

import { ClassForm } from './ClassForm';

interface Props {
  id?: string;
  sectionId: string;
  isOpen?: boolean;
  name: string;
  onOpenChange?: ( isOpen: boolean ) => void;
  triggerElement?: React.ReactNode;
}

export const ClassFormLayout = memo( ( {
  id,
  sectionId,
  isOpen: externalIsOpen,
  name,
  onOpenChange: externalOnOpenChange,
  triggerElement
}: Props ) => {
  const internalDisclosure = UI.useDisclosure();
  const [ isSubmitting, setIsSubmitting ] = useState( false );

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalDisclosure.isOpen;

  const onOpen = useCallback( () => {
    setIsSubmitting( false );
    if ( externalOnOpenChange ) {
      externalOnOpenChange( true );
    } else {
      internalDisclosure.onOpen();
    }
  }, [ externalOnOpenChange, internalDisclosure ] );

  const handleClose = useCallback( () => {
    if ( isSubmitting ) return;

    if ( externalOnOpenChange ) {
      externalOnOpenChange( false );
    } else {
      internalDisclosure.onClose();
    }

    setTimeout( () => {
      setIsSubmitting( false );
    }, 100 );
  }, [ isSubmitting, externalOnOpenChange, internalDisclosure ] );

  return (
    <>
      { triggerElement ? (
        <span className="w-full cursor-pointer" onClick={ onOpen }>
          { triggerElement }
        </span>
      ) : (
        <UI.Button
          onPress={ onOpen }
          startContent={ <Icons.IoAddOutline size={ 20 } /> }
          variant="light"
          size="sm"
        >
          Crear { name }
        </UI.Button>
      ) }

      { isOpen && (
        <UI.Modal
          backdrop="opaque"
          isOpen={ isOpen }
          onOpenChange={ handleClose }
          size="md"
          scrollBehavior="inside"
          classNames={ {
            base: "z-50"
          } }
        >
          <UI.ModalContent>
            { () => (
              <>
                <UI.ModalHeader className="flex flex-row gap-1 justify-center items-center">
                  { id ? (
                    <>
                      <Icons.IoPencilOutline size={ 24 } /> Editar { name }
                    </>
                  ) : (
                    <>
                      <Icons.IoAddOutline size={ 24 } /> Crear { name }
                    </>
                  ) }
                </UI.ModalHeader>

                <UI.ModalBody>
                  <ClassForm
                    id={ id }
                    sectionId={ sectionId }
                    onClose={ handleClose }
                    isSubmitting={ isSubmitting }
                    setIsSubmitting={ setIsSubmitting }
                  />
                </UI.ModalBody>

                <UI.ModalFooter className="justify-center flex items-center space-x-3">
                  <UI.Button
                    color="danger"
                    onPress={ handleClose }
                    startContent={ <Icons.IoArrowBackOutline size={ 20 } /> }
                    variant="light"
                    isDisabled={ isSubmitting }
                  >
                    Cerrar
                  </UI.Button>

                  <UI.Button
                    color="secondary"
                    form="class-form"
                    startContent={ isSubmitting ? null : <Icons.IoSaveOutline size={ 20 } /> }
                    type="submit"
                    isLoading={ isSubmitting }
                  >
                    { isSubmitting ? "Guardando..." : "Guardar" }
                  </UI.Button>
                </UI.ModalFooter>
              </>
            ) }
          </UI.ModalContent>
        </UI.Modal>
      ) }
    </>
  );
} );

ClassFormLayout.displayName = 'ClassFormLayout';