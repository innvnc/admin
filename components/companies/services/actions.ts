import { request } from '@/components/shared';
import { CompaniesResponse } from '../interfaces';
import { CompanyInputs } from '../validators';

export const createCompany = ( data: CompanyInputs ): Promise<CompaniesResponse> => request<CompaniesResponse>( "/companies/", "POST", data );

export const deleteCompany = ( id: string ): Promise<void> => request( `/companies/${ id }`, "DELETE" );

export const getCompanies = (): Promise<CompaniesResponse[]> => request<CompaniesResponse[]>( "/companies/", "GET" );

export const getCompanyById = ( id: string ): Promise<CompaniesResponse> => request<CompaniesResponse>( `/companies/${ id }`, "GET" );

export const updateCompany = ( id: string, data: CompanyInputs ): Promise<CompaniesResponse> => request<CompaniesResponse>( `/companies/${ id }`, "PATCH", data );
