'use client';

import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"; // Asegúrate de importar useEffect
import { Controller, useForm } from "react-hook-form";

import { Icons } from '@/components/shared/ui';
import { UI } from '@/components/shared';
import { useClassContentFormHelper } from '../helpers';
import { useDeleteClassContent, useGetClassContentByClassId } from '../hooks';
import { ClassContentInputs, classContentSchema } from '../validators';


interface Props {
  idClass: string;
  // idClassContent?: string; // Parece no usarse, se podría limpiar si no es necesario en el componente padre
}

export const CourseClassContentVideoForm = ({ idClass }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClassContentIdForForm, setSelectedClassContentIdForForm] = useState<string | undefined>(undefined);
  const [classContentIdToDelete, setClassContentIdToDelete] = useState<string | undefined>(undefined);

  const createEditModalDisclosure = UI.useDisclosure();
  const deleteModalDisclosure = UI.useDisclosure();

  const { classContents, refetch: refetchClassContents } = useGetClassContentByClassId(idClass);
  const { deleteClassContentById, isPending: isDeleting } = useDeleteClassContent();


  const form = useForm<ClassContentInputs>({
    defaultValues: {
      content: "",
      contentType: "video",
      courseClassId: idClass,
    },
    mode: "onSubmit",
    resolver: zodResolver(classContentSchema),
  });

  const { handleSave } = useClassContentFormHelper(selectedClassContentIdForForm, form, idClass);

  useEffect(() => {
    if (!createEditModalDisclosure.isOpen) {
      setSelectedClassContentIdForForm(undefined);
    }
  }, [createEditModalDisclosure.isOpen]);

  const handleOpenCreateModal = () => {
    setSelectedClassContentIdForForm(undefined);
    form.reset({
      content: "",
      contentType: "video",
      courseClassId: idClass,
    });
    createEditModalDisclosure.onOpen();
  };

  const handleOpenEditModal = (contentId: string) => {
    const contentToEdit = classContents?.find(c => c.id === contentId);
    if (contentToEdit) {
      form.reset({
        content: contentToEdit.content,
        contentType: contentToEdit.contentType as "video" | "slides" | "text",
        courseClassId: contentToEdit.courseClass.id, // Asegúrate que sea el ID de la clase del curso, no del contenido.
        // Si classContent.courseClass.id es correcto, está bien.
      });
      setSelectedClassContentIdForForm(contentId);
      createEditModalDisclosure.onOpen();
    }
  };

  const handleOpenDeleteModal = (contentId: string) => {
    setClassContentIdToDelete(contentId);
    deleteModalDisclosure.onOpen();
  };

  const handleConfirmDelete = async () => {
    if (classContentIdToDelete) {
      try {
        await deleteClassContentById(classContentIdToDelete);
        addToast({
          title: "Éxito",
          description: "El video se ha eliminado correctamente.",
          color: "success",
        });
        refetchClassContents();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        console.error(`Error al eliminar el video:`, errorMessage);
        addToast({
          title: "Error",
          description: "No se pudo eliminar el video.",
          color: "danger",
        });
      } finally {
        deleteModalDisclosure.onClose();
        setClassContentIdToDelete(undefined);
      }
    }
  };


  const onSubmit = async (data: ClassContentInputs) => {
    setIsSubmitting(true);

    try {
      await handleSave(data, () => {
        createEditModalDisclosure.onClose(); // Esto llamará al useEffect y limpiará selectedClassContentIdForForm
        refetchClassContents();
      });

      addToast({
        title: "Éxito",
        description: selectedClassContentIdForForm // Aún se puede usar para el mensaje antes de que useEffect lo limpie
          ? `El video se ha actualizado correctamente.`
          : `El video se ha creado correctamente.`,
        color: "success",
      });
      // setSelectedClassContentIdForForm(undefined); // El useEffect ahora maneja esto al cerrar el modal.
      // Si se deja, no hay problema, solo es redundante si el modal se cierra inmediatamente.
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      console.error(`Error al guardar el video:`, errorMessage);

      addToast({
        title: "Error",
        description: `No se pudo ${selectedClassContentIdForForm ? "actualizar" : "crear"} el video. Verifique su conexión al servidor.`,
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <UI.Button
        size="md"
        startContent={<Icons.IoAddOutline size={24} />}
        variant="ghost"
        onPress={handleOpenCreateModal}
      >
        Nuevo video
      </UI.Button>

      <div className="space-y-3">
        {classContents?.filter(cc => cc.contentType === 'video').map((classContent) => (
          <div
            key={classContent.id}
            className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-white"
          >
            <span className="text-sm truncate" title={classContent.content}>{classContent.content}</span>
            <div className="flex items-center space-x-2">
              <UI.Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => handleOpenEditModal(classContent.id)}
                aria-label="Editar video"
              >
                <Icons.IoPencilOutline size={20} />
              </UI.Button>
              <UI.Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleOpenDeleteModal(classContent.id)}
                aria-label="Eliminar video"
              >
                <Icons.IoTrashOutline size={20} />
              </UI.Button>
            </div>
          </div>
        ))}
        {classContents?.filter(cc => cc.contentType === 'video').length === 0 && (
          <p className="text-sm text-gray-500">No hay videos asignados a esta clase.</p>
        )}
      </div>


      <UI.Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={createEditModalDisclosure.isOpen}
        onOpenChange={createEditModalDisclosure.onOpenChange}
      // onClose prop removida para evitar el error
      >
        <UI.ModalContent>
          <>
            <UI.ModalHeader className="flex flex-row gap-1 justify-center items-center">
              {selectedClassContentIdForForm ? (
                <>
                  <Icons.IoPencilOutline size={24} /> Editar video
                </>
              ) : (
                <>
                  <Icons.IoAddOutline size={24} /> Crear video
                </>
              )}
            </UI.ModalHeader>

            <UI.ModalBody>
              <UI.Form id="class-content-video-form" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <UI.Input
                      {...field}
                      errorMessage={form.formState.errors.content?.message}
                      isInvalid={Boolean(form.formState.errors.content)}
                      label="URL del video"
                      labelPlacement="outside"
                      placeholder="Ingresa la URL del video"
                    />
                  )}
                />
              </UI.Form>
            </UI.ModalBody>

            <UI.ModalFooter className="justify-center flex items-center space-x-3">
              <UI.Button
                color="danger"
                startContent={<Icons.IoArrowBackOutline size={24} />}
                variant="light"
                onPress={() => {
                  createEditModalDisclosure.onClose(); // Esto también activará el useEffect para limpiar el ID
                }}
              >
                Cerrar
              </UI.Button>

              <UI.Button
                color="secondary"
                form="class-content-video-form"
                isLoading={isSubmitting}
                startContent={<Icons.IoSaveOutline size={24} />}
                type="submit"
              >
                Guardar
              </UI.Button>
            </UI.ModalFooter>
          </>
        </UI.ModalContent>
      </UI.Modal>

      <UI.Modal
        backdrop="blur"
        isOpen={deleteModalDisclosure.isOpen}
        onOpenChange={deleteModalDisclosure.onOpenChange}
      >
        <UI.ModalContent>
          <UI.ModalHeader className="flex flex-col gap-1">
            Confirmar eliminación
          </UI.ModalHeader>
          <UI.ModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.
            </p>
          </UI.ModalBody>
          <UI.ModalFooter>
            <UI.Button
              variant="light"
              onPress={deleteModalDisclosure.onClose}
            >
              Cancelar
            </UI.Button>
            <UI.Button
              color="danger"
              isLoading={isDeleting}
              onPress={handleConfirmDelete}
            >
              Eliminar
            </UI.Button>
          </UI.ModalFooter>
        </UI.ModalContent>
      </UI.Modal>
    </div>
  );
};