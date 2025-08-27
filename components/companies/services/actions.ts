
import { request } from '@/components/shared';
import { CompaniesResponse } from '../interfaces';
import { CompanyInputs } from '../validators';



export const createCompany = ( data: CompanyInputs ): Promise<CompaniesResponse> => request<CompaniesResponse>( "/categories/", "POST", data );

export const getCompanies = (): Promise<CompaniesResponse[]> => request<CompaniesResponse[]>( "/companies/", "GET" );

export const getCompanieById = ( id: string ): Promise<CompaniesResponse> => request<CompaniesResponse>( `/companies/${ id }`, "GET" );

export const deleteCompanie = ( id: string ): Promise<void> => request( `/companies/${ id }`, "DELETE" );





