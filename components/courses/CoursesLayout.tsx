import { PageView } from "../layouts";

import { CoursesList } from "./components";

export const CoursesLayout = () => {
  return (
    <PageView
      content={<CoursesList />}
      imageUrl="https://i.imgur.com/kuaBMr3.png"
      subtitle="Administra y edita los cursos en esta sección"
      title="Panel de Cursos"
    />
  );
};
