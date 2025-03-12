export const CourseHighlight = () => {
  return (
    <div className="learning_course-highlight">

      <div className="learning_course-highlight-image-desktop"></div>

      <div className="learning_course-highlight-content">
        <div className="learning_course-highlight-header">

          <span className="learning_course-category-badge">
            PROGRAMACION
          </span>

          <span className="learning_course-progress-indicator">
            CLASE 2/8
          </span>

        </div>

        <p className="learning_course-highlight-title">
          PROGRAMACION BASICA
        </p>

        <p className="learning_course-highlight-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta turpis at pretium molestie. Morbi tincidunt velit.
        </p>

        <div className="learning_course-highlight-footer">
          <div className="learning_progress-container">

            <span className="learning_progress-text">
              25% COMPLETO
            </span>

            <div className="learning_progress-bar">
              <div className="learning_progress-bar-filled" style={ { width: '25%' } }></div>
            </div>

          </div>

          <button className="learning_continue-button">
            VOLVER AL CURSO
          </button>

        </div>
      </div>
      
      <div className="learning_course-highlight-image-mobile"></div>
    </div>
  );
};