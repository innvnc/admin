import { UI } from '@/components';



export const StatsSidebar = () => {
  return (
    <div className="learning_sidebar">

      <p className="learning_sidebar-title">
        ESTADISTICAS
      </p>

      <div className="learning_stats-container">

        <div className="learning_stats-card">

          <span className="learning_stats-card-label">
            CURSOS EN PROCESO
          </span>

          <span className="learning_stats-card-value">4</span>
        </div>

        <div className="learning_stats-card learning_stats-card--highlighted">
          <span className="learning_stats-card-label">
            CURSOS COMPLETOS
          </span>
          <span className="learning_stats-card-value">1</span>
        </div>

      </div>

      <div className="learning_avatar-container">
        <UI.Image
          src={ 'https://i.imgur.com/agk7yHz.png' }
        />
      </div>

    </div>
  );
};