"use client";

import { useState } from "react";

import { addToast } from "@heroui/react";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { UI } from "@/components/shared";
import { Icons } from "@/components/shared/ui";

import { useGetClasses, useRemoveClass } from "../hooks";
import { ICourseClassesResponse } from "../interfaces";
import { ClassInputs } from "../validators";
import { ClassFormModal } from "./ClassFormModal";
import { DeleteClassModal } from "./DeleteClassModal";
import { ClassItem } from "./ClassItem";
import { useUpdateClassWithPosition } from "../hooks/useUpdateClassWithPosition";

interface SortableClassProps {
  classItem: ICourseClassesResponse;
  onEdit: ( id: string ) => void;
  onDelete: ( id: string, title: string ) => void;
}

const SortableClass = ( { classItem, onEdit, onDelete }: SortableClassProps ) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable( { id: classItem.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  return (
    <div
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      className="cursor-grab active:cursor-grabbing"
    >
      <ClassItem
        classItem={ classItem }
        onDelete={ onDelete }
        onEdit={ onEdit }
      />
    </div>
  );
};

interface Props {
  sectionid: string;
}

export const CourseClass = ( { sectionid }: Props ) => {
  const {
    courseClasses = [],
    isLoading,
    refetch,
  } = useGetClasses( sectionid );

  const { removeClass, isPending: isDeletePending } = useRemoveClass();

  const { updateClassPosition, isPending: isUpdatePending } = useUpdateClassWithPosition();

  const [ isFormModalOpen, setIsFormModalOpen ] = useState( false );
  const [ selectedClassId, setSelectedClassId ] = useState<string | undefined>(
    undefined
  );

  const [ classToDelete, setClassToDelete ] = useState<string | undefined>(
    undefined
  );
  const [ classTitle, setClassTitle ] = useState<string | undefined>( undefined );
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( false );

  const sensors = useSensors(
    useSensor( PointerSensor ),
    useSensor( KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    } )
  );

  const handleDragEnd = async ( event: DragEndEvent ) => {
    const { active, over } = event;

    if ( over && active.id !== over.id ) {
      const activeClass = courseClasses.find(
        ( classItem ) => classItem.id === active.id
      );
      const overClass = courseClasses.find(
        ( classItem ) => classItem.id === over.id
      );

      if ( activeClass && overClass ) {
        try {
          const data: ClassInputs & { positionOrder?: number; } = {
            courseSectionId: sectionid,
            title: activeClass.title,
            description: activeClass.description,
          };

          if ( overClass.positionOrder !== undefined ) {
            data.positionOrder = overClass.positionOrder;
          }

          await updateClassPosition( activeClass.id, data );
          await refetch();

          addToast( {
            title: "Éxito",
            description: "Posición actualizada correctamente",
            color: "success",
          } );
        } catch ( error ) {
          addToast( {
            title: "Error",
            description: "No se pudo actualizar la posición de la clase",
            color: "danger",
          } );
        }
      }
    }
  };

  const handleEditClass = ( id: string ) => {
    setSelectedClassId( id );
    setIsFormModalOpen( true );
  };

  const handleDeleteClass = ( id: string, title: string ) => {
    setClassToDelete( id );
    setClassTitle( title );
    setIsDeleteModalOpen( true );
  };

  const handleAddClass = () => {
    setSelectedClassId( undefined );
    setIsFormModalOpen( true );
  };

  const onConfirmDelete = async () => {
    if ( !classToDelete || !classTitle ) return;

    try {
      await removeClass( classToDelete );
      await refetch();

      addToast( {
        title: "Éxito",
        description: `La clase "${ classTitle }" ha sido eliminada correctamente.`,
        color: "success",
      } );

      setIsDeleteModalOpen( false );
      setClassToDelete( undefined );
      setClassTitle( undefined );
    } catch ( error ) {
      addToast( {
        title: "Error",
        description: `Hubo un problema al eliminar la clase "${ classTitle }".`,
        color: "danger",
      } );
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Clases</h3>
        <UI.Button
          size="sm"
          color="primary"
          startContent={ <Icons.IoAddOutline size={ 16 } /> }
          onPress={ handleAddClass }
        >
          Agregar clase
        </UI.Button>
      </div>

      { isLoading ? (
        <div className="flex justify-center items-center h-32">
          <UI.Spinner color="primary" size="lg" />
        </div>
      ) : courseClasses.length === 0 ? (
        <UI.Card>
          <UI.CardBody className="flex items-center justify-center py-6">
            <div className="text-center">
              <Icons.IoInformationCircleOutline className="text-4xl text-default-300 mx-auto mb-3" />
              <p className="text-default-500">
                Esta sección aún no tiene clases
              </p>
            </div>
          </UI.CardBody>
        </UI.Card>
      ) : (
        <DndContext
          collisionDetection={ closestCenter }
          sensors={ sensors }
          onDragEnd={ handleDragEnd }
        >
          <SortableContext
            items={ courseClasses.map( ( classItem ) => ( { id: classItem.id } ) ) }
            strategy={ verticalListSortingStrategy }
          >
            <div className="space-y-2">
              { courseClasses.map( ( classItem ) => (
                <SortableClass
                  key={ classItem.id }
                  classItem={ classItem }
                  onDelete={ handleDeleteClass }
                  onEdit={ handleEditClass }
                />
              ) ) }
            </div>
          </SortableContext>
        </DndContext>
      ) }

      <ClassFormModal
        isOpen={ isFormModalOpen }
        courseSectionId={ sectionid }
        classId={ selectedClassId }
        onClose={ () => {
          setIsFormModalOpen( false );
          setSelectedClassId( undefined );
        } }
      />

      <DeleteClassModal
        isOpen={ isDeleteModalOpen }
        isPending={ isDeletePending }
        classTitle={ classTitle || "" }
        onCancel={ () => setIsDeleteModalOpen( false ) }
        onConfirm={ onConfirmDelete }
      />
    </div>
  );
};