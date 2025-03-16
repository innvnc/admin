'use client';
import { useCallback, useMemo, useState, useRef, Key } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { ICoursesResponse } from '../../interfaces/courses-response';
import { Icons } from '../shared/ui';



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

interface Props {
  courseStatus: 'published' | 'deleted' | 'hidden';
}

const columns = [
  { name: 'TÍTULO', uid: 'title', sortable: true },
  { name: 'SLUG', uid: 'slug', sortable: true },
  { name: 'DESCRIPCIÓN', uid: 'description', sortable: true },
  { name: 'PRECIO', uid: 'price', sortable: true },
  { name: 'PÚBLICO', uid: 'isPublic', sortable: true },
  { name: 'CATEGORÍAS', uid: 'categories', sortable: false },
  { name: 'ACCIONES', uid: 'actions', sortable: false },
];

type CourseKey = 'title' | 'slug' | 'description' | 'price' | 'isPublic' | 'categories';

export const CoursesTable = ( { courseStatus }: Props ) => {
  const [ filterValue, setFilterValue ] = useState( '' );
  const [ selectedKeys, setSelectedKeys ] = useState<Selection>( new Set( [] ) );
  const [ visibleColumns, setVisibleColumns ] = useState<Selection>( new Set( columns.map( column => column.uid ) ) );
  const [ rowsPerPage, setRowsPerPage ] = useState( 5 );
  const [ sortDescriptor, setSortDescriptor ] = useState<SortDescriptor>( {
    column: 'title' as any,
    direction: 'ascending',
  } );
  const [ page, setPage ] = useState( 1 );
  const searchInputRef = useRef<HTMLInputElement>( null );

  const hasSearchFilter = Boolean( filterValue );

  const headerColumns = useMemo( () => {
    if ( visibleColumns === 'all' ) return columns;

    return columns.filter( column => Array.from( visibleColumns ).includes( column.uid ) );
  }, [ visibleColumns ] );

  const filteredItems = useMemo( () => {
    let filteredCourses = [ ...mockCourses ];

    if ( hasSearchFilter ) {
      filteredCourses = filteredCourses.filter( course =>
        Object.entries( course ).some( ( [ key, value ] ) => {
          if ( key === 'categories' && Array.isArray( value ) ) {
            return value.some( category =>
              category.title.toLowerCase().includes( filterValue.toLowerCase() )
            );
          }

          if ( typeof value === 'string' ) {
            return value.toLowerCase().includes( filterValue.toLowerCase() );
          }

          if ( typeof value === 'number' ) {
            return value.toString().includes( filterValue );
          }

          return false;
        } )
      );
    }

    return filteredCourses;
  }, [ mockCourses, filterValue ] );

  const sortedItems = useMemo( () => {
    if ( !sortDescriptor.column ) return filteredItems;

    return [ ...filteredItems ].sort( ( a, b ) => {
      const first = a[ sortDescriptor.column as keyof ICoursesResponse ];
      const second = b[ sortDescriptor.column as keyof ICoursesResponse ];

      if ( sortDescriptor.column === 'price' ) {
        return sortDescriptor.direction === 'ascending'
          ? Number( first ) - Number( second )
          : Number( second ) - Number( first );
      }

      if ( sortDescriptor.column === 'isPublic' ) {
        return sortDescriptor.direction === 'ascending'
          ? Number( first ) - Number( second )
          : Number( second ) - Number( first );
      }

      const cmp = ( first as string ).localeCompare( second as string );

      return sortDescriptor.direction === 'ascending' ? cmp : -cmp;
    } );
  }, [ sortDescriptor, filteredItems ] );

  const pages = Math.ceil( sortedItems.length / rowsPerPage );

  const items = useMemo( () => {
    const start = ( page - 1 ) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice( start, end );
  }, [ page, sortedItems, rowsPerPage ] );

  const renderCell = useCallback( ( course: ICoursesResponse, columnKey: CourseKey | 'actions' ) => {
    switch ( columnKey ) {
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-medium capitalize">{ course.title }</p>
          </div>
        );
      case 'slug':
        return <p className="text-medium">{ course.slug }</p>;
      case 'description':
        return (
          <div className="max-w-xs">
            <p className="text-medium truncate">{ course.description }</p>
          </div>
        );
      case 'price':
        return <p className="text-medium">${ course.price.toFixed( 2 ) }</p>;
      case 'isPublic':
        return (
          <Chip
            className="capitalize"
            color={ course.isPublic ? 'success' : 'danger' }
            size="sm"
            variant="flat"
          >
            { course.isPublic ? 'Sí' : 'No' }
          </Chip>
        );
      case 'categories':
        return (
          <div className="flex flex-wrap gap-1">
            { course.categories.map( ( category ) => (
              <Chip
                key={ category.id }
                className="capitalize"
                color="primary"
                size="sm"
                variant="flat"
              >
                { category.title }
              </Chip>
            ) ) }
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icons.IoCheckmarkOutline className="text-default-500" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Acciones disponibles">
                <DropdownItem key="view">Ver detalles</DropdownItem>
                <DropdownItem key="edit">Editar</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, [] );

  const onSearchChange = useCallback( ( value: string ) => {
    if ( value ) {
      setFilterValue( value );
      setPage( 1 );
    } else {
      setFilterValue( '' );
    }
  }, [] );

  const onClear = useCallback( () => {
    setFilterValue( '' );
    setPage( 1 );
    if ( searchInputRef.current ) {
      searchInputRef.current.focus();
    }
  }, [] );

  const topContent = useMemo( () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            ref={ searchInputRef }
            isClearable
            classNames={ {
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            } }
            placeholder="Buscar cursos..."
            size="sm"
            startContent={ <Icons.IoSearchCircleOutline className="text-default-300" /> }
            endContent={
              filterValue ? (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={ onClear }
                >
                  <Icons.IoIdCardOutline className="text-default-500" />
                </Button>
              ) : null
            }
            value={ filterValue }
            onValueChange={ onSearchChange }
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={ <Icons.IoCheckmarkOutline className="text-small" /> }
                  size="sm"
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Selecciona columnas visibles"
                closeOnSelect={ false }
                selectedKeys={ visibleColumns }
                selectionMode="multiple"
                onSelectionChange={ setVisibleColumns }
              >
                { columns.map( ( column ) => (
                  <DropdownItem key={ column.uid } className="capitalize">
                    { column.name }
                  </DropdownItem>
                ) ) }
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-primary text-white"
              endContent={ <Icons.IoAddOutline /> }
              size="sm"
            >
              Agregar Curso
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total { filteredItems.length } cursos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={ ( e ) => setRowsPerPage( Number( e.target.value ) ) }
              value={ rowsPerPage }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    onClear,
    filteredItems.length,
    rowsPerPage,
  ] );

  const bottomContent = useMemo( () => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={ page }
          total={ pages }
          onChange={ setPage }
        />
      </div>
    );
  }, [ page, pages ] );

  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de cursos"
        isHeaderSticky
        bottomContent={ bottomContent }
        bottomContentPlacement="outside"
        classNames={ {
          wrapper: "max-h-[600px]",
        } }
        selectedKeys={ selectedKeys }
        selectionMode="multiple"
        sortDescriptor={ sortDescriptor as any }
        topContent={ topContent }
        topContentPlacement="outside"
        onSelectionChange={ setSelectedKeys }
        onSortChange={ setSortDescriptor as any }
      >
        <TableHeader columns={ headerColumns }>
          { ( column ) => (
            <TableColumn
              key={ column.uid }
              align={ column.uid === 'actions' ? 'center' : 'start' }
              allowsSorting={ column.sortable }
            >
              { column.name }
            </TableColumn>
          ) }
        </TableHeader>
        <TableBody
          emptyContent="No se encontraron cursos"
          items={ items }
        >
          { ( item ) => (
            <TableRow key={ item.id }>
              { ( columnKey ) => (
                <TableCell>{ renderCell( item, columnKey as CourseKey | 'actions' ) }</TableCell>
              ) }
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
  );
};