'use client';
import { useCallback, useMemo } from 'react';

import { UI } from '../../shared';
import { ICoursesResponse } from '../../../interfaces/courses-response';
import { ColumnDefinition, GenericTable, Icons } from '../../shared/ui';
import { useGetCourses } from '../hooks';

export const CoursesList = () => {
  const { courses } = useGetCourses();

  const handleAddCourse = useCallback( () => {
    console.log( 'Agregar nuevo curso' );
    // Aquí iría la lógica para agregar un nuevo curso
  }, [] );

  const courseColumns: ColumnDefinition[] = [
    { name: 'TÍTULO', uid: 'title', sortable: true, searchable: true },
    { name: 'SLUG', uid: 'slug', sortable: true, searchable: true },
    { name: 'DESCRIPCIÓN', uid: 'description', sortable: true, searchable: true },
    { name: 'PRECIO', uid: 'price', sortable: true, searchable: true },
    { name: 'PÚBLICO', uid: 'isPublic', sortable: true },
    {
      name: 'CATEGORÍAS',
      uid: 'categories',
      sortable: false,
      renderCell: ( item: ICoursesResponse ) => (
        <div className="flex flex-wrap gap-1">
          { item.categories.map( ( category ) => (
            <div
              key={ category.id }
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              { category.title }
            </div>
          ) ) }
        </div>
      ),
    },
    {
      name: 'ACCIONES',
      uid: 'actions',
      sortable: false,
      renderCell: ( item: ICoursesResponse ) => (
        <div className="relative flex items-center justify-center">
          <UI.Dropdown>
            <UI.DropdownTrigger>
              <UI.Button isIconOnly size="sm" variant="light">
                <Icons.IoEllipsisVerticalOutline className="text-default-500" />
              </UI.Button>
            </UI.DropdownTrigger>
            <UI.DropdownMenu aria-label="Acciones disponibles">
              <UI.DropdownItem
                key="view"
                startContent={ <Icons.IoEyeOutline className="text-default-500" /> }
              >
                Ver detalles
              </UI.DropdownItem>
              <UI.DropdownItem
                key="edit"
                startContent={ <Icons.IoPencilOutline className="text-default-500" /> }
              >
                Editar
              </UI.DropdownItem>
              <UI.DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={ <Icons.IoTrashOutline className="text-danger" /> }
              >
                Eliminar
              </UI.DropdownItem>
            </UI.DropdownMenu>
          </UI.Dropdown>
        </div>
      ),
    },
  ];

  const publishedCourses = useMemo(
    () => courses?.filter( ( course ) => course.isPublic ),
    [ courses ]
  );
  const draftCourses = useMemo(
    () => courses?.filter( ( course ) => !course.isPublic && course.status ),
    [ courses ]
  );
  const deletedCourses = useMemo(
    () => courses?.filter( ( course ) => !course.status ),
    [ courses ]
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
          { courseMenuOptions.map( ( option ) => (
            <UI.Tab
              key={ option.key }
              title={
                <div className="courses-list__tab-title">
                  <span className="courses-list__icon">{ option.icon }</span>
                  <span className="courses-list__label">{ option.label }</span>
                </div>
              }
            >
              <UI.Card>
                <UI.CardBody>
                  <GenericTable<ICoursesResponse>
                    title={ option.label }
                    columns={ courseColumns }
                    items={ option.items }
                    primaryKey="id"
                    searchFields={ [ 'title', 'slug', 'description', 'price', 'isPublic' ] }
                    onAdd={ handleAddCourse }
                    addButtonText="Agregar Curso"
                    noItemsMessage={ `No se encontraron cursos ${ option.label.toLowerCase() }` }
                    initialVisibleColumns={ [
                      'title',
                      'slug',
                      'description',
                      'price',
                      'isPublic',
                      'categories',
                      'actions',
                    ] }
                    initialSortColumn="title"
                    initialSortDirection="ascending"
                    initialRowsPerPage={ 5 }
                  />
                </UI.CardBody>
              </UI.Card>
            </UI.Tab>
          ) ) }
        </UI.Tabs>
      </div>
    </div>
  );
};