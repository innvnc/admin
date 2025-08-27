"use client";

import { useEffect } from "react";

import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useCompaniesFormHelper } from "../helpers";
import { useGetCompany } from "../hooks";
import { CompanyInputs, companySchema } from "../validators";
import { UI } from "@/components";
import { Icons } from "@/components/shared/ui";

interface Props {
  id?: string;
  onClose: () => void;
  onSavingChange?: ( saving: boolean ) => void;
}

export const CompanyForm = ( { id, onClose, onSavingChange }: Props ) => {
  const form = useForm<CompanyInputs>( {
    defaultValues: {
      address: "",
      description: "",
      email: "",
      name: "",
      phone: "",
    },
    mode: "onSubmit",
    resolver: zodResolver( companySchema ),
  } );

  const { handleSave, validateUniqueName, existingNames, isSaving } = useCompaniesFormHelper( id, form );
  const { company } = useGetCompany( id || "" );

  useEffect( () => {
    if ( onSavingChange ) onSavingChange( Boolean( isSaving ) );
  }, [ isSaving, onSavingChange ] );

  useEffect( () => {
    if ( id && company ) {
      form.reset( {
        address: company.address,
        description: company.description,
        email: company.email,
        name: company.name,
        phone: company.phone,
      } );
    }
  }, [ id, company, form ] );

  const onSubmit = async ( data: CompanyInputs ) => {
    try {
      await handleSave(
        {
          address: data.address,
          description: data.description,
          email: data.email,
          name: data.name,
          phone: data.phone,
        },
        onClose,
      );

      addToast( {
        title: "Éxito",
        description: id
          ? `La empresa "${ data.name }" se ha actualizado correctamente.`
          : `La empresa "${ data.name }" se ha creado correctamente.`,
        color: "success",
      } );
    } catch ( error ) {
      addToast( {
        title: "Error",
        description: `Hubo un problema al guardar la empresa "${ data.name }".`,
        color: "danger",
      } );
    }
  };

  return (
    <UI.Form id="company-form" onSubmit={ form.handleSubmit( onSubmit ) }>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Controller
          control={ form.control }
          name="name"
          render={ ( { field } ) => (
            <UI.Input
              { ...field }
              errorMessage={
                form.formState.errors.name?.message ||
                ( existingNames.includes( field.value.trim().toLowerCase() )
                  ? "Esta empresa ya existe."
                  : undefined )
              }
              isInvalid={
                Boolean( form.formState.errors.name ) ||
                existingNames.includes( field.value.trim().toLowerCase() )
              }
              label="Nombre"
              labelPlacement="outside"
              placeholder="Ingresa un nombre"
              startContent={ <Icons.IoBusinessOutline /> }
              onValueChange={ ( value ) => {
                field.onChange( value );
                validateUniqueName( value );
              } }
            />
          ) }
        />

        <Controller
          control={ form.control }
          name="email"
          render={ ( { field } ) => (
            <UI.Input
              { ...field }
              errorMessage={ form.formState.errors.email?.message }
              isInvalid={ Boolean( form.formState.errors.email ) }
              label="Correo electrónico"
              labelPlacement="outside"
              placeholder="Ingresa un correo electrónico"
              startContent={ <Icons.IoMailOutline /> }
            />
          ) }
        />

        <Controller
          control={ form.control }
          name="phone"
          render={ ( { field } ) => (
            <UI.Input
              { ...field }
              errorMessage={ form.formState.errors.phone?.message }
              isInvalid={ Boolean( form.formState.errors.phone ) }
              label="Teléfono"
              labelPlacement="outside"
              placeholder="Ingresa un teléfono"
              startContent={ <Icons.IoCallOutline /> }
            />
          ) }
        />

        <Controller
          control={ form.control }
          name="address"
          render={ ( { field } ) => (
            <UI.Input
              { ...field }
              errorMessage={ form.formState.errors.address?.message }
              isInvalid={ Boolean( form.formState.errors.address ) }
              label="Dirección"
              labelPlacement="outside"
              placeholder="Ingresa una dirección"
              startContent={ <Icons.IoLocationOutline /> }
            />
          ) }
        />
      </div>

      <Controller
        control={ form.control }
        name="description"
        render={ ( { field } ) => (
          <UI.Textarea
            { ...field }
            errorMessage={ form.formState.errors.description?.message }
            isInvalid={ Boolean( form.formState.errors.description ) }
            label="Descripción"
            labelPlacement="outside"
            placeholder="Ingresa una descripción"
            startContent={ <Icons.IoDocumentTextOutline /> }
          />
        ) }
      />
    </UI.Form>
  );
};
