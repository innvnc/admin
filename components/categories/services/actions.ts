import { request } from '@/components';
import { Category, CategoryCreate, CategoryUpdate } from '@/interfaces';


export const createCategory = ( data: CategoryCreate ): Promise<Category> =>
  request<Category>( '/api/categories/', 'POST', data );

export const deleteCategory = ( id: string ): Promise<void> =>
  request<void>( `/api/categories/${ id }`, 'DELETE' );

export const getCategories = (): Promise<Category[]> =>
  request<Category[]>( '/api/categories/', 'GET' );

export const getCategoryById = ( id: string ): Promise<Category> =>
  request<Category>( `/api/categories/${ id }`, 'GET' );

export const updateCategory = ( id: string, data: CategoryUpdate ): Promise<Category> =>
  request<Category>( `/api/categories/${ id }`, 'PATCH', data );