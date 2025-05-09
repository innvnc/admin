
import { Icons } from '@/components/shared/ui';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { ClassSlide } from './class-slides';


interface Props {
  idClass: string | undefined;
}

export const CourseContentForm = ( { idClass }: Props ) => {

  return (
    <div>
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <Icons.IoVideocamOutline />
              <span>Video</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <div style={ { position: 'relative', paddingTop: '56.25%' } }>
                <iframe
                  src="https://iframe.mediadelivery.net/embed/423063/c42c9b5d-0275-4e72-9fe1-ed7e4561bac6?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style={ {
                    border: 0,
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '100%',
                  } }
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen={ true }
                ></iframe>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="Texto"
          title={
            <div className="flex items-center space-x-2">
              <Icons.IoReaderOutline />
              <span>Texto</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <p>Las <b>finanzas</b> son el arte y la ciencia de administrar el dinero. Abarcan un amplio espectro de actividades, desde la planificación y el presupuesto personal hasta la gestión de grandes carteras de inversión y las complejas operaciones financieras de las empresas multinacionales. En su núcleo, las finanzas buscan responder preguntas fundamentales sobre cómo obtener, asignar y utilizar los recursos financieros de manera eficiente a lo largo del tiempo, considerando siempre el factor del riesgo.</p><br />

              <p>A nivel individual, las <b>finanzas personales</b> se centran en la administración de los ingresos, el manejo de las deudas, el ahorro para objetivos futuros como la jubilación o la educación, y la inversión para hacer crecer el patrimonio. Una sólida comprensión de los principios financieros personales permite tomar decisiones informadas sobre préstamos, hipotecas, seguros y la planificación del futuro económico propio y familiar.</p><br />

              <p>En el ámbito empresarial, las <b>finanzas corporativas</b> se ocupan de las decisiones que toman las empresas en relación con sus inversiones, su financiación y la gestión de sus activos. Esto incluye evaluar proyectos de inversión a largo plazo, determinar la estructura de capital óptima (la combinación de deuda y capital), gestionar el flujo de efectivo y distribuir dividendos a los accionistas. El objetivo principal suele ser maximizar el valor de la empresa para sus propietarios.</p><br />

              <p>El <b>sistema financiero</b>, compuesto por instituciones, mercados e instrumentos, facilita el flujo de fondos entre quienes tienen un excedente de capital (ahorradores e inversores) y quienes necesitan financiación (empresas, gobiernos e individuos). Los mercados financieros, como las bolsas de valores y los mercados de bonos, proporcionan plataformas donde se negocian estos instrumentos, permitiendo la movilización del capital y la asignación eficiente de recursos en la economía.</p><br />

              <p>En resumen, las finanzas son una disciplina esencial que impacta a todos los niveles de la sociedad. Ya sea gestionando las finanzas personales, dirigiendo las estrategias financieras de una empresa o participando en los mercados financieros, comprender sus principios fundamentales es crucial para la toma de decisiones económicas acertadas y la consecución de objetivos financieros a corto y largo plazo.</p>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="Slides"
          title={
            <div className="flex items-center space-x-2">
              <Icons.IoAlbumsOutline />
              <span>Slides</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <ClassSlide />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div >
  );
};
