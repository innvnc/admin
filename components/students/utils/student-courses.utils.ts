import { IStudentCoursesDetailItem } from '../interfaces';


export const getStudentCoursesInfo = ( t: ( key: string ) => string ): IStudentCoursesDetailItem[] => [
  {
    title: t( 'student_course_first_title' ),
    description: t( 'student_course_first_description' ),
    img: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276724/dxfdg5vquuhhlzhzf596.svg',
  },
  {
    title: t( 'student_course_second_title' ),
    description: t( 'student_course_second_description' ),
    img: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276719/fer39gvlsrhvannccohq.svg',
  },
  {
    title: t( 'student_course_third_title' ),
    description: t( 'student_course_third_description' ),
    img: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276731/cwioo1snvba3j1wqr5tb.svg',
  },
  {
    title: t( 'student_course_fourth_title' ),
    description: t( 'student_course_fourth_description' ),
    img: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276732/qoqliec4hs6ffz9mretq.svg',
  },
];