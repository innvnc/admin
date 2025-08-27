import { useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import { useAddCompany, useGetCompanies, useGetCompany, useUpdateCompany } from "../hooks";
import { CompanyInputs } from "../validators";

const normalizeString = ( str: string ) =>
  str
    .normalize( "NFD" )
    .replace( /[\u0300-\u036f]/g, "" )
    .replace( /[^\w\s]/gi, "" )
    .trim()
    .toLowerCase();

export const useCompaniesFormHelper = (
  id: string | undefined,
  form: UseFormReturn<CompanyInputs>,
) => {
  const { addNewCompany } = useAddCompany();
  const { companyUpdate } = useUpdateCompany();
  const { company } = useGetCompany( id || "" );
  const { companies = [] } = useGetCompanies();

  const existingNames = useMemo(
    () =>
      companies
        .filter( ( c ) => ( id ? c.id !== id : true ) )
        .map( ( c ) => normalizeString( c.name ) ),
    [ companies, id ],
  );

  useEffect( () => {
    form.reset( {
      address: company?.address ?? "",
      description: company?.description ?? "",
      email: company?.email ?? "",
      name: company?.name ?? "",
      phone: company?.phone ?? "",
    } );
  }, [ company, form ] );

  const validateUniqueName = ( value: string ) => {
    const normalizedInput = normalizeString( value );

    return existingNames.includes( normalizedInput )
      ? "Esta empresa ya existe."
      : true;
  };

  const handleSave = async ( data: CompanyInputs, onClose: () => void ) => {
    await ( id ? companyUpdate( data, id ) : addNewCompany( data ) );
    onClose();
  };

  return {
    handleSave,
    validateUniqueName,
    existingNames,
  };
};
