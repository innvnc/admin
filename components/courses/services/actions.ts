import { request } from '@/components';
import { ICoursesResponse } from '@/interfaces';


export const getCourses = (): Promise<ICoursesResponse[]> =>
  request<ICoursesResponse[]>( '/courses/', 'GET' );

// export const createCategory = ( data: CategoryInputs ): Promise<Category> =>
//   request<Category>( '/categories/', 'POST', data );

// export const deleteCategory = async ( id: string ): Promise<void> => {
//   await request( `/categories/${ id }`, 'DELETE' );
// };


// export const getCategoryById = ( id: string ): Promise<CategoriesResponse> =>
//   request<CategoriesResponse>( `/categories/${ id }`, 'GET' );

// export const updateCategory = ( id: string, data: CategoryInputs ): Promise<Category> =>
//   request<Category>( `/categories/${ id }`, 'PATCH', data );
