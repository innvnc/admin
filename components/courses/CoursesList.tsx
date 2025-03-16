'use client';
import { UI } from '../shared';
import { getCourseMenuOptions } from './helpers';
import { ICoursesResponse } from '../../interfaces/courses-response';
import { ColumnDefinition, GenericTable, Icons } from '../shared/ui';
import { useCallback } from 'react';

// Ejemplo de datos para la tabla
const mockCourses: ICoursesResponse[] = [
  {
    id: '1',
    status: true,
    creationDate: '2023-01-15T10:30:00Z',
    title: 'Desarrollo Web con React',
    slug: 'desarrollo-web-react',
    description: 'Aprende a crear aplicaciones web modernas con React desde cero',
    price: 499,
    isPublic: true,
    createdBy: {
      id: 'user1',
      creationDate: '2022-05-10T08:15:00Z',
      lastActivity: '2023-08-20T14:45:00Z',
      isActive: true,
      username: 'profesor_react',
      clerkId: 'clerk123',
      name: 'Juan',
      lastName: 'García',
      phone: null,
      roles: [ 'instructor' ]
    },
    categories: [
      {
        id: 'cat1',
        status: true,
        creationDate: '2022-01-05T11:20:00Z',
        title: 'Desarrollo Web',
        slug: 'desarrollo-web',
        createdBy: {
          id: 'admin1',
          creationDate: '2021-12-01T10:00:00Z',
          lastActivity: '2023-08-22T16:30:00Z',
          isActive: true,
          username: 'admin',
          clerkId: 'clerk456',
          name: 'Admin',
          lastName: 'Sistema',
          phone: null,
          roles: [ 'admin' ]
        }
      },
      {
        id: 'cat2',
        status: true,
        creationDate: '2022-01-05T11:25:00Z',
        title: 'JavaScript',
        slug: 'javascript',
        createdBy: {
          id: 'admin1',
          creationDate: '2021-12-01T10:00:00Z',
          lastActivity: '2023-08-22T16:30:00Z',
          isActive: true,
          username: 'admin',
          clerkId: 'clerk456',
          name: 'Admin',
          lastName: 'Sistema',
          phone: null,
          roles: [ 'admin' ]
        }
      }
    ]
  },
  {
    id: '2',
    status: true,
    creationDate: '2023-02-20T14:45:00Z',
    title: 'TypeScript Avanzado',
    slug: 'typescript-avanzado',
    description: 'Domina TypeScript y lleva tus habilidades de desarrollo al siguiente nivel',
    price: 599,
    isPublic: true,
    createdBy: {
      id: 'user2',
      creationDate: '2022-03-15T09:30:00Z',
      lastActivity: '2023-08-21T11:20:00Z',
      isActive: true,
      username: 'typescript_master',
      clerkId: 'clerk789',
      name: 'María',
      lastName: 'Rodríguez',
      phone: null,
      roles: [ 'instructor', 'author' ]
    },
    categories: [
      {
        id: 'cat3',
        status: true,
        creationDate: '2022-01-06T10:15:00Z',
        title: 'TypeScript',
        slug: 'typescript',
        createdBy: {
          id: 'admin1',
          creationDate: '2021-12-01T10:00:00Z',
          lastActivity: '2023-08-22T16:30:00Z',
          isActive: true,
          username: 'admin',
          clerkId: 'clerk456',
          name: 'Admin',
          lastName: 'Sistema',
          phone: null,
          roles: [ 'admin' ]
        }
      }
    ]
  },
  {
    id: '3',
    status: true,
    creationDate: '2023-03-10T09:15:00Z',
    title: 'Next.js para Aplicaciones Modernas',
    slug: 'nextjs-aplicaciones-modernas',
    description: 'Construye aplicaciones web rápidas y SEO-friendly con Next.js',
    price: 749,
    isPublic: false,
    createdBy: {
      id: 'user1',
      creationDate: '2022-05-10T08:15:00Z',
      lastActivity: '2023-08-20T14:45:00Z',
      isActive: true,
      username: 'profesor_react',
      clerkId: 'clerk123',
      name: 'Juan',
      lastName: 'García',
      phone: null,
      roles: [ 'instructor' ]
    },
    categories: [
      {
        id: 'cat1',
        status: true,
        creationDate: '2022-01-05T11:20:00Z',
        title: 'Desarrollo Web',
        slug: 'desarrollo-web',
        createdBy: {
          id: 'admin1',
          creationDate: '2021-12-01T10:00:00Z',
          lastActivity: '2023-08-22T16:30:00Z',
          isActive: true,
          username: 'admin',
          clerkId: 'clerk456',
          name: 'Admin',
          lastName: 'Sistema',
          phone: null,
          roles: [ 'admin' ]
        }
      },
      {
        id: 'cat4',
        status: true,
        creationDate: '2022-01-07T13:40:00Z',
        title: 'React',
        slug: 'react',
        createdBy: {
          id: 'admin1',
          creationDate: '2021-12-01T10:00:00Z',
          lastActivity: '2023-08-22T16:30:00Z',
          isActive: true,
          username: 'admin',
          clerkId: 'clerk456',
          name: 'Admin',
          lastName: 'Sistema',
          phone: null,
          roles: [ 'admin' ]
        }
      }
    ]
  }
];

export const CoursesList = () => {
  const courseMenuOptions = getCourseMenuOptions();

  const handleAddCourse = useCallback( () => {
    console.log( 'Agregar nuevo curso' );
    // Aquí iría la lógica para agregar un nuevo curso
  }, [] );

  // Definición de columnas para la tabla de cursos
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
      )
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
      )
    }
  ];

  return (
    <div className="courses-list">
      <div className="courses-list__container">
        <UI.Tabs aria-label="Options" isVertical>
          {
            courseMenuOptions.map( ( option ) => (
              <UI.Tab
                key={ option.key }
                title={
                  <div className="courses-list__tab-title">
                    <span className="courses-list__icon">
                      { option.icon }
                    </span>
                    <span className="courses-list__label">
                      { option.label }
                    </span>
                  </div>
                }
              >
                <UI.Card>
                  <UI.CardBody>
                    <GenericTable<ICoursesResponse>
                      title="Cursos"
                      columns={ courseColumns }
                      items={ mockCourses }
                      primaryKey="id"
                      searchFields={ [ 'title', 'slug', 'description', 'price', 'isPublic' ] }
                      onAdd={ handleAddCourse }
                      addButtonText="Agregar Curso"
                      noItemsMessage="No se encontraron cursos"
                      initialVisibleColumns={ [ 'title', 'slug', 'description', 'price', 'isPublic', 'categories', 'actions' ] }
                      initialSortColumn="title"
                      initialSortDirection="ascending"
                      initialRowsPerPage={ 5 }
                    />
                  </UI.CardBody>
                </UI.Card>
              </UI.Tab>
            ) )
          }
        </UI.Tabs>
      </div>
    </div>
  );
};