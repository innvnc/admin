import { request } from '@/components';
import { IUsersResponse } from '../interfaces';
import { UserInputs } from '../validators';


export const getUsers = (): Promise<IUsersResponse[]> => request<IUsersResponse[]>( "/auth/users", "GET" );

export const getUser = ( id: string ): Promise<IUsersResponse> => request<IUsersResponse>( `/auth/user/id/${ id }`, "GET" );

export const deleteUser = ( id: string ): Promise<void> => request<void>( `/auth/user/${ id }`, "DELETE" );

export const updateUser = ( id: string, data: UserInputs ): Promise<IUsersResponse> => request<IUsersResponse>( `/auth/user/${ id }`, "PATCH", data );

