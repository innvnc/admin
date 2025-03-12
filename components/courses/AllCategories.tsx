'use client';

import { CoursesCard } from './CoursesCard';



interface CourseType {
  name:        string;
  description: string;
  category:    string;
  slug:        string;
  enabled:     boolean;
  duration:    number;
}

interface CategoryData {
  name:    string;
  courses: CourseType[];
}

export const AllCategories = () => {

  const allCoursesData: CourseType[] = [
    {
      "name": "Gestión Empresarial",
      "description": "Aprendé estrategias clave para liderar, planificar y gestionar eficientemente recursos en empresas de cualquier tamaño.",
      "category": "FINANZAS",
      "slug": "gestion-empresarial",
      "enabled": true,
      "duration": 629
    },
    {
      "name": "Proceso de Importación",
      "description": "Conocé las últimas normativas argentinas sobre de la importación de bienes y servicios.",
      "category": "FINANZAS",
      "slug": "proceso-de-importacion",
      "enabled": true,
      "duration": 588
    },
    {
      "name": "Finanzas para PyMes",
      "description": "Gestioná de manera eficiente las finanzas de tu PyME y tomá decisiones estratégicas para el crecimiento sostenible de tu negocio.",
      "category": "FINANZAS",
      "slug": "finanzas-para-pymes",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Criptoactivos",
      "description": "Explorá el fascinante mundo de los criptoactivos y aprendé a invertir y operar con monedas digitales de manera informada y segura.",
      "category": "FINANZAS",
      "slug": "criptoactivos",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Macroeconomía",
      "description": "Analizá el comportamiento de las economías a gran escala y comprende los factores que influyen en el crecimiento y desarrollo económico.",
      "category": "ECONOMÍA",
      "slug": "macroeconomia",
      "enabled": true,
      "duration": 605
    },
    {
      "name": "Historia Económica Global",
      "description": "Explorá los eventos clave que han moldeado la economía global y su impacto en el mundo actual.",
      "category": "ECONOMÍA",
      "slug": "historia-economica-global",
      "enabled": true,
      "duration": 352
    },
    {
      "name": "Historia Económica Argentina",
      "description": "Explorá los hitos clave de la historia económica argentina y comprendé cómo se han formado las estructuras económicas actuales del país.",
      "category": "ECONOMÍA",
      "slug": "historia-economica-argentina",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Microeconomía",
      "description": "Comprendé los fundamentos del comportamiento económico a nivel individual y empresarial para tomar decisiones informadas y estratégicas.",
      "category": "ECONOMÍA",
      "slug": "microeconomia",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Programación Desde Cero",
      "description": "Iniciá tu camino como programador aprendiendo las bases fundamentales del código en un lenguaje accesible para principiantes.",
      "category": "PROGRAMACIÓN",
      "slug": "programacion-desde-cero",
      "enabled": true,
      "duration": 469
    },
    {
      "name": "Introducción a Blockchain",
      "description": "Descubrí los fundamentos de la tecnología blockchain y su impacto en las industrias modernas.",
      "category": "PROGRAMACIÓN",
      "slug": "introduccion-a-blockchain",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Desarrollo de Frontend",
      "description": "Aprendé a crear interfaces web atractivas y funcionales que mejoren la experiencia del usuario.",
      "category": "PROGRAMACIÓN",
      "slug": "desarrollo-de-frontend",
      "enabled": false,
      "duration": 610
    },
    {
      "name": "Desarrollo de Backend",
      "description": "Domina la lógica y estructura detrás de las aplicaciones web con las principales herramientas y lenguajes backend.",
      "category": "PROGRAMACIÓN",
      "slug": "desarrollo-de-backend",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Proceso de Importación",
      "description": "Conocé las últimas normativas argentinas sobre de la importación de bienes y servicios.",
      "category": "DERECHO",
      "slug": "proceso-de-importacion-derecho",
      "enabled": true,
      "duration": 588
    },
    {
      "name": "Derecho Comercial",
      "description": "Explorá las leyes que regulan las actividades comerciales, contratos y negocios para operar en un entorno legal seguro.",
      "category": "DERECHO",
      "slug": "derecho-comercial",
      "enabled": true,
      "duration": 564
    },
    {
      "name": "Contratos",
      "description": "Conocé los fundamentos legales y financieros detrás de los contratos para garantizar acuerdos claros y efectivos.",
      "category": "DERECHO",
      "slug": "contratos",
      "enabled": true,
      "duration": 568
    },
    {
      "name": "Derecho Laboral",
      "description": "Conocé y actualizate sobre las nuevas regulaciones en materia de derecho laboral argentino.",
      "category": "DERECHO",
      "slug": "derecho-laboral",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Gestión Empresarial",
      "description": "Aprendé estrategias clave para liderar, planificar y gestionar eficientemente recursos en empresas de cualquier tamaño.",
      "category": "ADMINISTRACIÓN",
      "slug": "gestion-empresarial-administracion",
      "enabled": true,
      "duration": 629
    },
    {
      "name": "Régimen Tributario",
      "description": "Comprendé el marco tributario y fiscal para gestionar eficientemente las obligaciones impositivas de una empresa.",
      "category": "ADMINISTRACIÓN",
      "slug": "regimen-tributario",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Teoría de la Decisión",
      "description": "Tomá decisiones estratégicas con fundamentos sólidos y herramientas analíticas para maximizar resultados.",
      "category": "ADMINISTRACIÓN",
      "slug": "teoria-de-la-decision",
      "enabled": false,
      "duration": 600
    },
    {
      "name": "Recursos Humanos",
      "description": "Gestioná el talento humano de manera estratégica para impulsar el éxito organizacional.",
      "category": "ADMINISTRACIÓN",
      "slug": "recursos-humanos",
      "enabled": false,
      "duration": 600
    }
  ];

  const categoryNames = Array.from( new Set( allCoursesData.map( course => course.category ) ) );

  const categoriesWithCourses: CategoryData[] = categoryNames.map( categoryName => {
    return {
      name: categoryName,
      courses: allCoursesData.filter( course => course.category === categoryName )
    };
  } );

  return (
    <div className="courses_categories-section">
      {
        categoriesWithCourses.map( ( category ) => (
          <div key={ category.name } className="allcategories-category">

            <div className="allcategories-header">
              <h4 className="courses_section-title">{ category.name }</h4>
            </div>

            <div className="allcategories-grid">
              {
                category.courses.map( ( course ) => (
                  <CoursesCard
                    key={ course.slug }
                    name={ course.name }
                    description={ course.description }
                    category={ course.category }
                    slug={ course.slug }
                    enabled={ course.enabled }
                    duration={ course.duration }
                  />
                ) )
              }
            </div>
          </div>
        ) )
      }
    </div>
  );
};