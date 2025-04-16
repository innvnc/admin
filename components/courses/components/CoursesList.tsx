'use client';

import { useMemo, useState } from 'react';

import { UI } from '@/components/shared';
import { GenericTable, Icons } from '@/components/shared/ui';

import { useCoursesListHelper } from '../helpers';
import { CoursesTableColumns } from './CoursesTableColumns';
import { CourseFormLayout } from './CourseFormLayout';
import { DeleteCourseModal } from './DeleteCourseModal';
import { CourseContentModal } from '@/components/course-content';

export const CoursesList = () => {
  const {
    courses,
    handleDeleteCourse,
    handleEditCourse,
    isDeleteModalOpen,
    isOpen,
    isPending,
    onConfirmDelete,
    onOpenChange,
    selectedCourseId,
    setIsDeleteModalOpen,
    courseTitle,
  } = useCoursesListHelper();

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentCourseId, setContentCourseId] = useState<string>('');
  const [contentCourseTitle, setContentCourseTitle] = useState<string>('');

  const handleViewContent = (id: string, title: string) => {
    setContentCourseId(id);
    setContentCourseTitle(title);
    setIsContentModalOpen(true);
  };

  const publishedCourses = useMemo(
    () => courses?.filter((course) => course.isPublic),
    [courses]
  );

  const draftCourses = useMemo(
    () => courses?.filter((course) => !course.isPublic && course.status),
    [courses]
  );

  const deletedCourses = useMemo(
    () => courses?.filter((course) => !course.status),
    [courses]
  );

  const courseMenuOptions = [
    {
      key: 'published',
      label: 'Publicados',
      icon: <Icons.IoBookmarkOutline className="text-default-500" />,
      items: publishedCourses || [],
    },
    {
      key: 'draft',
      label: 'Borradores',
      icon: <Icons.IoFolderOutline className="text-default-500" />,
      items: draftCourses || [],
    },
    {
      key: 'deleted',
      label: 'Eliminados',
      icon: <Icons.IoTrashOutline className="text-default-500" />,
      items: deletedCourses || [],
    },
  ];

  return (
    <div className="courses-list">
      <div className="courses-list__container">
        <UI.Tabs aria-label="Options" isVertical>
          {courseMenuOptions.map((option) => (
            <UI.Tab
              key={option.key}
              title={
                <div className="courses-list__tab-title">
                  <span className="courses-list__icon">{option.icon}</span>
                  <span className="courses-list__label">{option.label}</span>
                </div>
              }
            >
              <UI.Card>
                <UI.CardBody>
                  <GenericTable
                    title={option.label}
                    columns={CoursesTableColumns({
                      onEdit: handleEditCourse,
                      onDelete: handleDeleteCourse,
                      onViewContent: handleViewContent,
                    })}
                    items={option.items}
                    primaryKey="id"
                    searchFields={['title', 'slug', 'description', 'price']}
                    onAdd={() => {}}
                    addButtonComponent={<CourseFormLayout name="curso" />}
                    addButtonText="Agregar Curso"
                    noItemsMessage={`No se encontraron cursos ${option.label.toLowerCase()}`}
                    initialVisibleColumns={[
                      'title',
                      'slug',
                      'description',
                      'price',
                      'isPublic',
                      'categories',
                      'creationDate',
                      'createdBy',
                      'actions',
                    ]}
                    initialSortColumn="title"
                    initialSortDirection="ascending"
                    initialRowsPerPage={5}
                  />
                </UI.CardBody>
              </UI.Card>
            </UI.Tab>
          ))}
        </UI.Tabs>
      </div>

      {isOpen && (
        <CourseFormLayout
          id={selectedCourseId}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          name="curso"
        />
      )}

      <DeleteCourseModal
        isOpen={isDeleteModalOpen}
        isPending={isPending}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        courseTitle={courseTitle || ''}
      />

      <CourseContentModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        courseId={contentCourseId}
        courseTitle={contentCourseTitle}
      />
    </div>
  );
};