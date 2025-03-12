'use client';
import Link from 'next/link';

import { ClockSvg } from '../shared/ui/svg';



interface Props {
  name:        string;
  description: string;
  category:    string;
  slug:        string;
  enabled:     boolean;
  duration:    number;
}

export const CoursesCard = ( {
  name,
  description,
  category,
  slug,
  enabled,
  duration,
}: Props ) => {
  
  const duration_hours = Math.floor( duration / 60 );
  const duration_minutes = duration % 60;

  return (
    <div className="courses_card">
      <div className="courses_card-header">

        <div className="courses_card-category">
          { category.toUpperCase() }
        </div>

        {
          !enabled && (
            <div className="courses_card-badge">
              <span className="courses_card-badge-text">
                EN BREVE!
              </span>
            </div>
          )
        }

      </div>

      <p className="courses_card-title">{ name }</p>
      <p className="courses_card-description">{ description }</p>

      <div className="courses_card-duration">

        <ClockSvg />

        <span className="courses_card-duration-text">
          { duration_hours + 'H ' + duration_minutes + 'm' }
        </span>
        
      </div>

      {
        enabled ? (
          <Link href={ `/curso/${ slug }` } className="courses_card-button">
            VER CURSO
          </Link>
        ) : (
          <button className="courses_card-button" disabled>
            + INFO
          </button>
        )
      }
    </div>
  );
};