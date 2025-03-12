import Link from 'next/link';

import { CourseCard } from './CourseCard';


export const MyCourses = () => {
  return (
    <div className="learning_my-courses">
      <div className="learning_my-courses-header">

        <span className="learning_my-courses-title">
          MIS CURSOS
        </span>

        <Link href="#" className="learning_my-courses-link">
          VER MIS 3 CURSOS →
        </Link>

      </div>

      <div className="learning_my-courses-grid">
        { [ 1, 2, 3 ].map( ( curso ) => (
          <CourseCard key={ curso } curso={ curso } />
        ) ) }
      </div>
      
    </div>
  );
};