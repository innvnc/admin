
interface Props {
  courseStatus: 'published' | 'deleted' | 'hidden';
}

export const CoursesTable = ( { courseStatus }: Props ) => {

  return (
    <div>{ courseStatus }</div>
  );
};
