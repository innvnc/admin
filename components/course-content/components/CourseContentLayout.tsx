'use client';

import { useState } from 'react';
import { addToast } from '@heroui/react';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useDeleteCourseSection, useGetCourseSectionsByCourseId } from '../hooks';
import { CourseSectionFormLayout, DeleteCourseSectionModal } from './course-sections';

export const CourseContentLayout = ({ courseId, courseTitle }: { courseId?: string, courseTitle?: string; }) => {
  const { courseSections = [], isLoading, refetch } = useGetCourseSectionsByCourseId(courseId || '');
  const { courseSectionDelete, isPending } = useDeleteCourseSection();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>(undefined);
  const [sectionToDelete, setSectionToDelete] = useState<string | undefined>(undefined);
  const [sectionTitle, setSectionTitle] = useState<string | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const mockClasses = {
    "1": [
      { id: "1-1", title: "Clase 1: Bienvenida al curso", duration: "10:25" },
      { id: "1-2", title: "Clase 2: Configuración del entorno", duration: "15:40" },
    ],
    "2": [
      { id: "2-1", title: "Clase 1: Fundamentos teóricos", duration: "20:15" },
      { id: "2-2", title: "Clase 2: Ejercicios prácticos", duration: "18:50" },
    ],
    "3": [
      { id: "3-1", title: "Clase 1: Técnicas avanzadas", duration: "25:30" },
      { id: "3-2", title: "Clase 2: Casos de estudio", duration: "28:45" },
    ]
  };

  const getClassesForSection = (sectionId: string) => {
    return mockClasses[sectionId as keyof typeof mockClasses] || [];
  };

  const getClassContent = (classId: string) => {
    return {
      title: Object.values(mockClasses)
        .flat()
        .find(cls => cls.id === classId)?.title || "Contenido no disponible",
      content: "Este es el contenido detallado de la clase seleccionada. Aquí podrás encontrar videos, material descargable, recursos adicionales y ejercicios prácticos relacionados con esta lección específica del curso.",
      resources: [
        "Video de la clase",
        "Material de lectura en PDF",
        "Código de ejemplo",
        "Ejercicios prácticos"
      ]
    };
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
        title: 'Éxito',
        description: `La sección "${sectionTitle}" ha sido eliminada correctamente.`,
        color: 'success',
      });

      setIsDeleteModalOpen(false);
      setSectionToDelete(undefined);
      setSectionTitle(undefined);
    } catch (error) {
      addToast({
        title: 'Error',
        description: `Hubo un problema al eliminar la sección "${sectionTitle}".`,
        color: 'danger',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contenido del curso</h2>
          <CourseSectionFormLayout
            courseId={courseId || ''}
            name="sección"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <UI.Spinner size="lg" color="primary" />
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
          <div className="space-y-2">
            {courseSections.map((section) => {
              const classes = getClassesForSection(section.id);
              return (
                <UI.Card key={section.id} className="w-full">
                  <UI.CardHeader className="flex justify-between items-center pb-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{section.title}</span>
                      <UI.Chip size="sm" color="primary">
                        {classes.length} clases
                      </UI.Chip>
                    </div>
                    <div className="flex items-center gap-1">
                      <UI.Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEditSection(section.id)}
                      >
                        <Icons.IoPencilOutline className="text-default-500" size={16} />
                      </UI.Button>
                      <UI.Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => handleDeleteSection(section.id, section.title)}
                      >
                        <Icons.IoTrashOutline className="text-danger" size={16} />
                      </UI.Button>
                    </div>
                  </UI.CardHeader>
                  <UI.CardBody>
                    <UI.Listbox
                      aria-label={`Clases de ${section.title}`}
                      variant="flat"
                      selectionMode="single"
                      selectedKeys={[selectedClass || ""]}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0]?.toString();
                        if (selected) setSelectedClass(selected);
                      }}
                    >
                      {classes.map((cls) => (
                        <UI.ListboxItem
                          key={cls.id}
                          startContent={<Icons.IoPlayCircleOutline className="text-xl text-primary" />}
                          endContent={
                            <UI.Chip size="sm" variant="flat">
                              {cls.duration}
                            </UI.Chip>
                          }
                        >
                          {cls.title}
                        </UI.ListboxItem>
                      ))}
                    </UI.Listbox>
                  </UI.CardBody>
                </UI.Card>
              );
            })}
          </div>
        )}
      </div>

      <div className="md:col-span-2">
        {selectedClass ? (
          <UI.Card>
            <UI.CardHeader className="flex gap-3">
              <Icons.IoSchoolOutline className="text-2xl text-primary" />
              <div className="flex flex-col">
                <p className="text-md font-semibold">
                  {getClassContent(selectedClass).title}
                </p>
                <p className="text-small text-default-500">
                  {courseTitle || "Detalles de la clase"}
                </p>
              </div>
            </UI.CardHeader>
            <UI.CardBody>
              <p>{getClassContent(selectedClass).content}</p>
              <UI.Divider className="my-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Recursos disponibles</h3>
                <ul className="space-y-2">
                  {getClassContent(selectedClass).resources.map((resource, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icons.IoDocumentOutline className="text-primary" />
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </UI.CardBody>
            <UI.CardFooter>
              <UI.Button color="primary" endContent={<Icons.IoPlayOutline />}>
                Reproducir video
              </UI.Button>
            </UI.CardFooter>
          </UI.Card>
        ) : (
          <UI.Card>
            <UI.CardBody className="flex items-center justify-center min-h-64">
              <div className="text-center">
                <Icons.IoInformationCircleOutline className="text-5xl text-default-300 mx-auto mb-4" />
                <p className="text-default-500">
                  Selecciona una clase de la lista para ver su contenido
                </p>
              </div>
            </UI.CardBody>
          </UI.Card>
        )}
      </div>

      {selectedSectionId && (
        <CourseSectionFormLayout
          id={selectedSectionId}
          courseId={courseId || ''}
          isOpen={!!selectedSectionId}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedSectionId(undefined);
          }}
          name="sección"
        />
      )}

      <DeleteCourseSectionModal
        isOpen={isDeleteModalOpen}
        isPending={isPending}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        sectionTitle={sectionTitle || ''}
      />
    </div>
  );
};