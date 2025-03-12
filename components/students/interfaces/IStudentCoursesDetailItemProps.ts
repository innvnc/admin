
export interface IStudentCoursesDetailItemProps {
  title:       string
  description: string
  img:         string
}

export interface IStudentCoursesDetailItem {
  title:       string;
  description: string;
  img:         string;
}

export interface IStudentCoursesDetailItemProps extends IStudentCoursesDetailItem {
  key?: number;
}