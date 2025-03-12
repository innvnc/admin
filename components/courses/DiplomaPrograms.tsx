import { ClipCoursesSvg } from '../shared/ui/svg';
import { DiplomaProgramsCard } from './DiplomaProgramsCard';



export const DiplomaPrograms = () => {

  const diplomaPrograms = [
    {
      title: "Política Económica",
      description: "Perfeccioná tus habilidades de análisis macroeconómico y entendé cómo las decisiones políticas influyen en el desarrollo de los países y los mercados.",
      num_classes: 10,
      duration: 600,
    },
    {
      title: "Inversiones Inmobiliarias",
      description: "Conocé todo del mercado inmobiliario y aprendé sobre diferentes tipos de proyectos de inversión, restauración de inmuebles y desarrollos industriales.",
      num_classes: 10,
      duration: 600,
    },
    {
      title: "Mercado de Capitales",
      description: "Descubrí cómo funciona el mercado de capitales y aprendé sobre las múltiples alternativas de inversión. Preparate para rendir el exámen de idóneo de la CNV.",
      num_classes: 10,
      duration: 600,
    }
  ];

  return (
    <div className="diploma-programs">

      <div className="diploma-programs__inner">
        <div className="diploma-programs__header">
          <div className="diploma-programs__title-container">
            
            <ClipCoursesSvg />

            <span className="diploma-programs__title">
              DIPLOMATURAS
            </span>

          </div>
        </div>

        <div className="diploma-programs__grid">
          {
            diplomaPrograms.map( ( program, index ) => (
              <DiplomaProgramsCard
                key={ index }
                title={ program.title }
                description={ program.description }
                num_classes={ program.num_classes }
                duration={ program.duration }
              />
            ) )
          }
        </div>

      </div>
    </div>
  );
};