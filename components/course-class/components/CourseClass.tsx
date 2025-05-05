'use client';

import { useState } from "react";
import { addToast } from '@heroui/react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useGetClasses, useRemoveClass, useUpdateClass } from '../hooks';
import { ICourseClassesResponse } from '../interfaces';
import { ClassFormLayout } from './ClassFormLayout';
import { DeleteClassModal } from './DeleteClassModal';


type ClassUpdateData = {
  title: string;
  description: string;
  slug: string;
  courseSectionId: string;
  positionOrder?: number;
};

const SortableClass = ( { courseClass, onEdit, onDelete }: {
  courseClass: ICourseClassesResponse,
  onEdit: ( id: string ) => void,
  onDelete: ( id: string, title: string ) => void;
} ) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable( { id: courseClass.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  return (
    <div ref={ setNodeRef } style={ style } { ...attributes } { ...listeners } className="cursor-grab active:cursor-grabbing">
      <UI.Card className="w-full">
        <UI.CardHeader className="flex justify-between items-center pb-0">
          <div className="flex items-center gap-2">
            <Icons.IoReorderThreeOutline className="text-default-400" size={ 20 } />
            <span className="font-medium">{ courseClass.title }</span>
          </div>
          <div className="flex items-center gap-1">
            <UI.Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={ () => onEdit( courseClass.id ) }
            >
              <Icons.IoPencilOutline className="text-default-500" size={ 16 } />
            </UI.Button>
            <UI.Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={ () => onDelete( courseClass.id, courseClass.title ) }
            >
              <Icons.IoTrashOutline className="text-danger" size={ 16 } />
            </UI.Button>
          </div>
        </UI.CardHeader>
        <UI.CardBody>
          <div className="flex justify-between items-center mt-2">
            <p className="text-small text-default-500 line-clamp-2">{ courseClass.description }</p>
            <UI.Chip size="sm" color="primary">
              Posición: { courseClass.positionOrder || 0 }
            </UI.Chip>
          </div>
        </UI.CardBody>
      </UI.Card>
    </div>
  );
};

export const CourseClass = ( { sectionId }: { sectionId: string; } ) => {
  const { courseClasses = [], isLoading, refetch } = useGetClasses( sectionId );
  const { removeClass, isPending: isDeletePending } = useRemoveClass();
  const { updateCourseClass, isPending: isUpdatePending } = useUpdateClass();
  const [ selectedClassId, setSelectedClassId ] = useState<string | undefined>( undefined );
  const [ classToDelete, setClassToDelete ] = useState<string | undefined>( undefined );
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
      const activeClass = courseClasses.find( cls => cls.id === active.id );
      const overClass = courseClasses.find( cls => cls.id === over.id );

      if ( activeClass && overClass ) {
        try {
          const data: ClassUpdateData = {
            title: activeClass.title,
            description: activeClass.description,
            slug: activeClass.slug,
            courseSectionId: sectionId,
          };

          if ( overClass.positionOrder !== undefined ) {
            data.positionOrder = overClass.positionOrder;
          }

          await updateCourseClass( activeClass.id, data as any );
          await refetch();

          addToast( {
            title: 'Éxito',
            description: 'Posición actualizada correctamente',
            color: 'success',
          } );
        } catch ( error ) {
          addToast( {
            title: 'Error',
            description: 'No se pudo actualizar la posición de la clase',
            color: 'danger',
          } );
        }
      }
    }
  };

  const handleEditClass = ( id: string ) => {
    setSelectedClassId( id );
  };

  const handleDeleteClass = ( id: string, title: string ) => {
    setClassToDelete( id );
    setClassTitle( title );
    setIsDeleteModalOpen( true );
  };

  const onConfirmDelete = async () => {
    if ( !classToDelete || !classTitle ) return;

    try {
      await removeClass( classToDelete );
      await refetch();

      addToast( {
        title: 'Éxito',
        description: `La clase "${ classTitle }" ha sido eliminada correctamente.`,
        color: 'success',
      } );

      setIsDeleteModalOpen( false );
      setClassToDelete( undefined );
      setClassTitle( undefined );
    } catch ( error ) {
      addToast( {
        title: 'Error',
        description: `Hubo un problema al eliminar la clase "${ classTitle }".`,
        color: 'danger',
      } );
    }
  };

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center py-4">
        <UI.Spinner size="md" color="primary" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold">Clases de la sección</h3>
        <ClassFormLayout
          sectionId={ sectionId }
          name="clase"
        />
      </div>

      { courseClasses.length === 0 ? (
        <div className="text-center py-4">
          <Icons.IoInformationCircleOutline className="text-4xl text-default-300 mx-auto mb-2" />
          <p className="text-default-500 text-sm">
            Esta sección aún no tiene clases
          </p>
        </div>
      ) : (
        <DndContext
          sensors={ sensors }
          collisionDetection={ closestCenter }
          onDragEnd={ handleDragEnd }
        >
          <SortableContext
            items={ courseClasses.map( cls => ( { id: cls.id } ) ) }
            strategy={ verticalListSortingStrategy }
          >
            <div className="space-y-2">
              { courseClasses.map( ( courseClass ) => (
                <SortableClass
                  key={ courseClass.id }
                  courseClass={ courseClass }
                  onEdit={ handleEditClass }
                  onDelete={ handleDeleteClass }
                />
              ) ) }
            </div>
          </SortableContext>
        </DndContext>
      ) }

      { selectedClassId && (
        <ClassFormLayout
          id={ selectedClassId }
          sectionId={ sectionId }
          isOpen={ !!selectedClassId }
          onOpenChange={ ( isOpen ) => {
            if ( !isOpen ) setSelectedClassId( undefined );
          } }
          name="clase"
        />
      ) }

      <DeleteClassModal
        isOpen={ isDeleteModalOpen }
        isPending={ isDeletePending }
        onCancel={ () => setIsDeleteModalOpen( false ) }
        onConfirm={ onConfirmDelete }
        classTitle={ classTitle || '' }
      />
    </div>
  );
};