import { request } from '@/components';
import { CategoryInputs } from '../validators/categorySchema';
import { Category } from '@/interfaces';

export const createCategory = ( data: CategoryInputs ): Promise<Category> =>
  request<Category>( '/categories/', 'POST', data );

export const deleteCategory = async ( id: string ): Promise<void> => {
  await request( `/categories/${ id }`, 'DELETE' );
};

export const getCategories = (): Promise<Category[]> =>
  request<Category[]>( '/categories/', 'GET' );

export const getCategoryById = ( id: string ): Promise<Category> =>
  request<Category>( `/categories/${ id }`, 'GET' );

export const updateCategory = ( id: string, data: CategoryInputs ): Promise<Category> =>
  request<Category>( `/categories/${ id }`, 'PATCH', data );
