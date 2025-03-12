import { ClipCoursesSvg, ClockSvg } from '../shared/ui/svg';



interface Props {
  title:       string;
  description: string;
  num_classes: number;
  duration:    number;
}

export const DiplomaProgramsCard = ( {
  title,
  description,
  num_classes,
  duration,
}: Props ) => {

  const duration_hours = Math.floor( duration / 60 );
  const duration_minutes = duration % 60;

  return (
    <div className="diploma-card">

      <div className="diploma-card__layer-2" />

      <div className="diploma-card__layer-1" />

      <div className="diploma-card__content">

        <p className="diploma-card__title">
          { title }
        </p>

        <p className="diploma-card__description">
          { description }
        </p>

        <div className="diploma-card__meta">

          <div className="diploma-card__duration">

            <ClockSvg />

            <span className="diploma-card__meta-text">
              { duration_hours + 'H ' + duration_minutes + 'm' }
            </span>
          </div>

          <div className="diploma-card__classes">

            <ClipCoursesSvg width={ 13 } height={ 13 } />

            <span className="diploma-card__meta-text">
              { num_classes + ' CLASES' }
            </span>
          </div>

        </div>

        <a
          href="/contact"
          className="diploma-card__button"
        >
          VER DIPLOMATURA
        </a>

      </div>
    </div>
  );
};