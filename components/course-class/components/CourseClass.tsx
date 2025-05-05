
interface Props {
  sectionId: string;
}

export const CourseClass = ( { sectionId }: Props ) => {

  return (
    <div>{ sectionId }</div>
  );
};
