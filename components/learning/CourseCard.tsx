interface CourseCardProps {
  curso: number;
}

export const CourseCard = ( { curso }: CourseCardProps ) => {
  return (
    <div className="learning_my-course-card">

      <span className="learning_my-course-progress">
        CLASE { curso }/8
      </span>

      <p className="learning_my-course-title">Curso { curso }</p>

      <div className="learning_my-course-footer">
        <span className="learning_my-course-percentage">
          25% COMPLETO
        </span>

        <div className="learning_my-course-progress-bar">
          <div className="learning_my-course-progress-bar-filled"></div>
        </div>
        
      </div>
    </div>
  );
};