import { CoursesCard } from './CoursesCard';




const coursesData = [
  {
    "name":        "Gestión Empresarial",
    "description": "Aprendé estrategias clave para liderar, planificar y gestionar eficientemente recursos en empresas de cualquier tamaño.",
    "category":    "FINANZAS",
    "slug":        "gestion-empresarial",
    "enabled":     true,
    "duration":    629
  },
  {
    "name":        "Proceso de Importación",
    "description": "Conocé las últimas normativas argentinas sobre la importación de bienes y servicios.",
    "category":    "FINANZAS",
    "slug":        "proceso-de-importacion",
    "enabled":     true,
    "duration":    588
  },
  {
    "name":        "Programación Desde Cero",
    "description": "Iniciá tu camino como programador aprendiendo las bases fundamentales del código en un lenguaje accesible para principiantes.",
    "category":    "PROGRAMACIÓN",
    "slug":        "programacion-desde-cero",
    "enabled":     true,
    "duration":    469
  },
  {
    "name":        "Derecho Comercial",
    "description": "Explorá las leyes que regulan las actividades comerciales, contratos y negocios para operar en un entorno legal seguro.",
    "category":    "DERECHO",
    "slug":        "derecho-comercial",
    "enabled":     true,
    "duration":    564
  }
];

export const TopCourses = () => {
  return (
    <div className="courses_top-section">

      <h4 className="courses_section-title mb-5">TOP CURSOS</h4>

      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-14">
        {
          coursesData.map((course) => (
            <CoursesCard
              key={course.slug}
              name={course.name}
              description={course.description}
              category={course.category}
              slug={course.slug}
              enabled={course.enabled}
              duration={course.duration}
            />
          ))
        }
      </div>
      
    </div>
  );
};
