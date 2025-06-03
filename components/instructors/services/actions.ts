import { request } from "@/components";
import { CourseInstructorInputs } from '../validators';
import { ICourseInstructor } from '../interfaces';


export const getCourseInstructors = (): Promise<ICourseInstructor[]> => request<ICourseInstructor[]>( "/course-instructors/", "GET" );

export const createCourseInstructor = ( data: CourseInstructorInputs ): Promise<ICourseInstructor> => request<ICourseInstructor>( "/course-instructors/", "POST", data );

export const deleteCourseInstructor = ( id: string ): Promise<void> => request( `/course-instructors/${ id }`, "DELETE" );

export const getCourseInstructorById = ( id: string ): Promise<ICourseInstructor> => request<ICourseInstructor>( `/course-instructors/${ id }`, "GET" );

export const updateCourseInstructor = ( id: string, data: CourseInstructorInputs ): Promise<ICourseInstructor> => request<ICourseInstructor>( `/course-instructors/${ id }`, "PATCH", data );
