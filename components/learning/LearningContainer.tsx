'use client';
import { CourseHighlight, MyCourses, RecommendedCourses, StatsSidebar } from './';


export const LearningContainer = () => {
  return (
    <div className="learning_container">

      <p className="learning_title">
        CONTINUAR ESTUDIANDO
      </p>

      <div className="learning_content">

        <div className="learning_main-section">
          <CourseHighlight />
          <MyCourses />
        </div>

        <StatsSidebar />

      </div>

      <RecommendedCourses />
      
    </div>
  );
};