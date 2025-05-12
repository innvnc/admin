'use client';

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/react";


import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { ClassContentInputs, classContentSchema } from '../validators';
import { useClassContentFormHelper } from '../helpers';

interface Props {
  idClass: string;
  idClassContent?: string;
}

export const CourseClassContentVideoForm = ( { idClass, idClassContent }: Props ) => {
  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const internalDisclosure = UI.useDisclosure();

  const form = useForm<ClassContentInputs>( {
    defaultValues: {
      content: "",
      contentType: "video",
      courseClassId: idClass,
    },
    mode: "onSubmit",
    resolver: zodResolver( classContentSchema ),
  } );

  const { handleSave } = useClassContentFormHelper( idClassContent, form );

  const onSubmit = async ( data: ClassContentInputs ) => {
    setIsSubmitting( true );

    try {
      await handleSave( data, () => internalDisclosure.onClose() );

      addToast( {
        title: "Éxito",
        description: idClassContent
          ? `El video se ha actualizado correctamente.`
          : `El video se ha creado correctamente.`,
        color: "success",
      } );
    } catch ( error ) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      console.error( `Error al guardar el video:`, errorMessage );

      addToast( {
        title: "Error",
        description: `No se pudo ${ idClassContent ? "actualizar" : "crear" } el video. Verifique su conexión al servidor.`,
        color: "danger",
      } );
    } finally {
      setIsSubmitting( false );
    }
  };

  return (
    <>
      <UI.Button
        size="md"
        startContent={ <Icons.IoAddOutline size={ 24 } /> }
        variant="ghost"
        onPress={ internalDisclosure.onOpen }
      >
        Nuevo video
      </UI.Button>

      <UI.Modal
        backdrop="blur"
        isDismissable={ false }
        isOpen={ internalDisclosure.isOpen }
        onOpenChange={ internalDisclosure.onOpenChange }
      >
        <UI.ModalContent>
          <>
            <UI.ModalHeader className="flex flex-row gap-1 justify-center items-center">
              { idClassContent ? (
                <>
                  <Icons.IoPencilOutline size={ 24 } /> Editar video
                </>
              ) : (
                <>
                  <Icons.IoAddOutline size={ 24 } /> Crear video
                </>
              ) }
            </UI.ModalHeader>

            <UI.ModalBody>
              <UI.Form id="class-content-video-form" onSubmit={ form.handleSubmit( onSubmit ) }>
                <Controller
                  control={ form.control }
                  name="content"
                  render={ ( { field } ) => (
                    <UI.Input
                      { ...field }
                      errorMessage={ form.formState.errors.content?.message }
                      isInvalid={ Boolean( form.formState.errors.content ) }
                      label="URL del video"
                      labelPlacement="outside"
                      placeholder="Ingresa la URL del video"
                    />
                  ) }
                />
              </UI.Form>
            </UI.ModalBody>

            <UI.ModalFooter className="justify-center flex items-center space-x-3">
              <UI.Button
                color="danger"
                startContent={ <Icons.IoArrowBackOutline size={ 24 } /> }
                variant="light"
                onPress={ internalDisclosure.onClose }
              >
                Cerrar
              </UI.Button>

              <UI.Button
                color="secondary"
                form="class-content-video-form"
                isLoading={ isSubmitting }
                startContent={ <Icons.IoSaveOutline size={ 24 } /> }
                type="submit"
              >
                Guardar
              </UI.Button>
            </UI.ModalFooter>
          </>
        </UI.ModalContent>
      </UI.Modal>
    </>
  );
};