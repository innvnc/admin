import { ClassInputs } from '../validators';
import { IClassCourseResponse, ICourseClassesResponse } from '../interfaces';
import { request } from '@/components';


export const getClasses = (): Promise<ICourseClassesResponse[]> =>
  request<ICourseClassesResponse[]>( '/course-classes/', 'GET' );

export const createClass = ( data: ClassInputs ): Promise<IClassCourseResponse> =>
  request<IClassCourseResponse>( '/course-classes/', 'POST', data );

export const deleteClass = async ( id: string ): Promise<void> =>
  await request( `/course-classes/${ id }`, 'DELETE' );

export const getClassById = ( id: string ): Promise<IClassCourseResponse> =>
  request<IClassCourseResponse>( `/course-classes/${ id }`, 'GET' );

export const updateClass = ( id: string, data: ClassInputs ): Promise<IClassCourseResponse> =>
  request<IClassCourseResponse>( `/course-classes/${ id }`, 'PATCH', data );