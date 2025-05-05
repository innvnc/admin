"use client";
import { useState } from "react";
import { addToast } from "@heroui/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  useDeleteCourseSection,
  useGetCourseSectionsByCourseId,
  useUpdateCourseSection,
} from "../hooks";
import { ICourseSection } from "../interfaces";

import {
  CourseSectionFormLayout,
  DeleteCourseSectionModal,
} from "./course-sections";

import { UI } from "@/components/shared";
import { Icons } from "@/components/shared/ui";
import { CourseClass } from "@/components/course-class";

type SectionUpdateData = {
  title: string;
  description: string;
  slug: string;
  courseId: string;
  positionOrder?: number;
};

const SortableSection = ({
  section,
  onEdit,
  onDelete,
}: {
  section: ICourseSection;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <UI.Card className="w-full">
        <UI.CardHeader className="flex justify-between items-center pb-0">
          <div className="flex items-center gap-2">
            <Icons.IoReorderThreeOutline
              className="text-default-400"
              size={20}
            />
            <span className="font-medium">{section.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <UI.Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => onEdit(section.id)}
            >
              <Icons.IoPencilOutline className="text-default-500" size={16} />
            </UI.Button>
            <UI.Button
              isIconOnly
              color="danger"
              size="sm"
              variant="light"
              onPress={() => onDelete(section.id, section.title)}
            >
              <Icons.IoTrashOutline className="text-danger" size={16} />
            </UI.Button>
          </div>
        </UI.CardHeader>
        <UI.CardBody>
          <div className="flex justify-between items-center mt-2">
            <CourseClass sectionId={section.id} />
            <UI.Chip color="primary" size="sm">
              Posición: {section.positionOrder || 0}
            </UI.Chip>
          </div>
        </UI.CardBody>
      </UI.Card>
    </div>
  );
};

export const CourseContentLayout = ({
  courseId,
  courseTitle,
}: {
  courseId?: string;
  courseTitle?: string;
}) => {
  const {
    courseSections = [],
    isLoading,
    refetch,
  } = useGetCourseSectionsByCourseId(courseId || "");
  const { courseSectionDelete, isPending: isDeletePending } =
    useDeleteCourseSection();
  const { updateSection, isPending: isUpdatePending } =
    useUpdateCourseSection();
  const [selectedSectionId, setSelectedSectionId] = useState<
    string | undefined
  >(undefined);
  const [sectionToDelete, setSectionToDelete] = useState<string | undefined>(
    undefined,
  );
  const [sectionTitle, setSectionTitle] = useState<string | undefined>(
    undefined,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeSection = courseSections.find(
        (section) => section.id === active.id,
      );
      const overSection = courseSections.find(
        (section) => section.id === over.id,
      );

      if (activeSection && overSection) {
        try {
          const data: SectionUpdateData = {
            title: activeSection.title,
            description: activeSection.description,
            slug: activeSection.slug,
            courseId: courseId || "",
          };

          if (overSection.positionOrder !== undefined) {
            data.positionOrder = overSection.positionOrder;
          }

          await updateSection(activeSection.id, data as any);
          await refetch();

          addToast({
            title: "Éxito",
            description: "Posición actualizada correctamente",
            color: "success",
          });
        } catch (error) {
          addToast({
            title: "Error",
            description: "No se pudo actualizar la posición de la sección",
            color: "danger",
          });
        }
      }
    }
  };

  const handleEditSection = (id: string) => {
    setSelectedSectionId(id);
  };

  const handleDeleteSection = (id: string, title: string) => {
    setSectionToDelete(id);
    setSectionTitle(title);
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!sectionToDelete || !sectionTitle) return;

    try {
      await courseSectionDelete(sectionToDelete);
      await refetch();

      addToast({
        title: "Éxito",
        description: `La sección "${sectionTitle}" ha sido eliminada correctamente.`,
        color: "success",
      });

      setIsDeleteModalOpen(false);
      setSectionToDelete(undefined);
      setSectionTitle(undefined);
    } catch (error) {
      addToast({
        title: "Error",
        description: `Hubo un problema al eliminar la sección "${sectionTitle}".`,
        color: "danger",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contenido del curso</h2>

          <CourseSectionFormLayout courseId={courseId || ""} name="sección" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <UI.Spinner color="primary" size="lg" />
          </div>
        ) : courseSections.length === 0 ? (
          <UI.Card>
            <UI.CardBody className="flex items-center justify-center">
              <div className="text-center">
                <Icons.IoInformationCircleOutline className="text-5xl text-default-300 mx-auto mb-4" />
                <p className="text-default-500">
                  Este curso aún no tiene secciones
                </p>
              </div>
            </UI.CardBody>
          </UI.Card>
        ) : (
          <DndContext
            collisionDetection={closestCenter}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={courseSections.map((section) => ({ id: section.id }))}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {courseSections.map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    onDelete={handleDeleteSection}
                    onEdit={handleEditSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="md:col-span-2">
        <UI.Card>
          <UI.CardBody className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Icons.IoInformationCircleOutline className="text-5xl text-default-300 mx-auto mb-4" />
              <p className="text-default-500">
                Selecciona una sección para ver detalles o arrastra para
                reordenar
              </p>
            </div>
          </UI.CardBody>
        </UI.Card>
      </div>

      {selectedSectionId && (
        <CourseSectionFormLayout
          courseId={courseId || ""}
          id={selectedSectionId}
          isOpen={!!selectedSectionId}
          name="sección"
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedSectionId(undefined);
          }}
        />
      )}

      <DeleteCourseSectionModal
        isOpen={isDeleteModalOpen}
        isPending={isDeletePending}
        sectionTitle={sectionTitle || ""}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};
