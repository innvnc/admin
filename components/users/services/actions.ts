import { request } from '@/components';
import { IUsersResponse } from '../interfaces';


export const getUsers = (): Promise<IUsersResponse[]> => request<IUsersResponse[]>( "/auth/users", "GET" );

export const getUser = ( id: string ): Promise<IUsersResponse[]> => request<IUsersResponse[]>( `/auth/${ id }`, "GET" );

export const deleteUser = ( id: string ): Promise<void> => request<void>( `/auth/user/${ id }`, "DELETE" );

