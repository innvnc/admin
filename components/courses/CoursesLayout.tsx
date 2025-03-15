import { PageView } from '../layouts';

export const CoursesLayout = () => {
  return (
    <PageView
      content={
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Cursos Disponibles</h2>
          <p className="text-gray-600">
            Explora nuestra selección de cursos diseñados para mejorar tus habilidades.
          </p>
        </div>
      }
      imageUrl="https://i.imgur.com/kuaBMr3.png"
      subtitle="Administra y edita los cursos en esta sección"
      title="Panel de Cursos"
    />
  );
};
