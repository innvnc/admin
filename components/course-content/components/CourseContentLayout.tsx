'use client';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useState } from 'react';

export const CourseContentLayout = ( { courseId, courseTitle }: { courseId?: string, courseTitle?: string; } ) => {
  const [ selectedClass, setSelectedClass ] = useState<string | null>( null );

  const sections = [
    {
      id: "1",
      title: "Sección 1: Introducción al curso",
      classes: [
        { id: "1-1", title: "Clase 1: Bienvenida al curso", duration: "10:25" },
        { id: "1-2", title: "Clase 2: Configuración del entorno", duration: "15:40" },
        { id: "1-3", title: "Clase 3: Primeros pasos", duration: "12:30" },
      ]
    },
    {
      id: "2",
      title: "Sección 2: Conceptos básicos",
      classes: [
        { id: "2-1", title: "Clase 1: Fundamentos teóricos", duration: "20:15" },
        { id: "2-2", title: "Clase 2: Ejercicios prácticos", duration: "18:50" },
        { id: "2-3", title: "Clase 3: Resolución de problemas", duration: "22:10" },
      ]
    },
    {
      id: "3",
      title: "Sección 3: Temas avanzados",
      classes: [
        { id: "3-1", title: "Clase 1: Técnicas avanzadas", duration: "25:30" },
        { id: "3-2", title: "Clase 2: Casos de estudio", duration: "28:45" },
        { id: "3-3", title: "Clase 3: Proyecto final", duration: "35:20" },
      ]
    }
  ];

  const handleClassClick = ( classId: string ) => {
    setSelectedClass( classId );
  };

  const getClassContent = ( classId: string ) => {
    return {
      title: sections
        .flatMap( section => section.classes )
        .find( cls => cls.id === classId )?.title || "Contenido no disponible",
      content: "Este es el contenido detallado de la clase seleccionada. Aquí podrás encontrar videos, material descargable, recursos adicionales y ejercicios prácticos relacionados con esta lección específica del curso.",
      resources: [
        "Video de la clase",
        "Material de lectura en PDF",
        "Código de ejemplo",
        "Ejercicios prácticos"
      ]
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <UI.Accordion selectionMode="multiple" defaultExpandedKeys={ [ "1" ] }>
          { sections.map( ( section ) => (
            <UI.AccordionItem
              key={ section.id }
              aria-label={ section.title }
              title={
                <div className="flex justify-between items-center">
                  <span>{ section.title }</span>
                  <UI.Chip size="sm" color="primary">
                    { section.classes.length } clases
                  </UI.Chip>
                </div>
              }
            >
              <div className="px-1">
                <UI.Listbox
                  aria-label={ `Clases de la ${ section.title }` }
                  variant="flat"
                  selectionMode="single"
                  selectedKeys={ [ selectedClass || "" ] }
                  onSelectionChange={ ( keys ) => {
                    const selected = Array.from( keys )[ 0 ]?.toString();
                    if ( selected ) setSelectedClass( selected );
                  } }
                >
                  { section.classes.map( ( cls ) => (
                    <UI.ListboxItem
                      key={ cls.id }
                      startContent={ <Icons.IoPlayCircleOutline className="text-xl text-primary" /> }
                      endContent={
                        <UI.Chip size="sm" variant="flat">
                          { cls.duration }
                        </UI.Chip>
                      }
                    >
                      { cls.title }
                    </UI.ListboxItem>
                  ) ) }
                </UI.Listbox>
              </div>
            </UI.AccordionItem>
          ) ) }
        </UI.Accordion>
      </div>

      <div className="md:col-span-2">
        { selectedClass ? (
          <UI.Card>
            <UI.CardHeader className="flex gap-3">
              <Icons.IoSchoolOutline className="text-2xl text-primary" />
              <div className="flex flex-col">
                <p className="text-md font-semibold">
                  { getClassContent( selectedClass ).title }
                </p>
                <p className="text-small text-default-500">
                  { courseTitle || "Detalles de la clase" }
                </p>
              </div>
            </UI.CardHeader>
            <UI.CardBody>
              <p>{ getClassContent( selectedClass ).content }</p>
              <UI.Divider className="my-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Recursos disponibles</h3>
                <ul className="space-y-2">
                  { getClassContent( selectedClass ).resources.map( ( resource, index ) => (
                    <li key={ index } className="flex items-center gap-2">
                      <Icons.IoDocumentOutline className="text-primary" />
                      <span>{ resource }</span>
                    </li>
                  ) ) }
                </ul>
              </div>
            </UI.CardBody>
            <UI.CardFooter>
              <UI.Button color="primary" endContent={ <Icons.IoPlayOutline /> }>
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
        ) }
      </div>
    </div>
  );
};