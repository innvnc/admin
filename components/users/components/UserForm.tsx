"use client";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/react";

import { UserInputs, userSchema } from "../validators";
import { UI } from "@/components";
import { useUserFormHelper } from '../helpers';
import { useGetUserById } from '../hooks';



interface Props {
  id?: string;
  onClose: () => void;
}

export const UserForm = ( { id, onClose }: Props ) => {
  const form = useForm<UserInputs>( {
    defaultValues: { name: "", lastName: "", roles: [ "user" ], slug: "" },
    mode: "onSubmit",
    resolver: zodResolver( userSchema ),
  } );

  const { handleSave } = useUserFormHelper( id, form );
  const { user } = useGetUserById( id || "" );

  useEffect( () => {
    if ( id && user ) {
      form.reset( {
        name: user.name,
        lastName: user.lastName,
        roles: user.roles,
        slug: user.slug,
      } );
    }
  }, [ id, user, form ] );

  const onSubmit = async ( data: UserInputs ) => {
    try {
      await handleSave(
        {
          name: data.name,
          lastName: data.lastName,
          roles: data.roles,
          slug: data.slug,
        },
        onClose,
      );

      addToast( {
        title: "Éxito",
        description: id
          ? `El usuario "${ data.name } ${ data.lastName }" se ha actualizado correctamente.`
          : `El usuario "${ data.name } ${ data.lastName }" se ha creado correctamente.`,
        color: "success",
      } );
    } catch ( error ) {
      addToast( {
        title: "Error",
        description: `Hubo un problema al guardar el usuario "${ data.name } ${ data.lastName }".`,
        color: "danger",
      } );
    }
  };

  return (
    <UI.Form id="user-form" onSubmit={ form.handleSubmit( onSubmit ) }>
      <Controller
        control={ form.control }
        name="name"
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            errorMessage={ form.formState.errors.name?.message }
            isInvalid={ Boolean( form.formState.errors.name ) }
            label="Nombre"
            labelPlacement="outside"
            placeholder="Ingresa el nombre"
            onValueChange={ field.onChange }
          />
        ) }
      />

      <Controller
        control={ form.control }
        name="lastName"
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            errorMessage={ form.formState.errors.lastName?.message }
            isInvalid={ Boolean( form.formState.errors.lastName ) }
            label="Apellido"
            labelPlacement="outside"
            placeholder="Ingresa el apellido"
            onValueChange={ field.onChange }
          />
        ) }
      />

      <Controller
        control={ form.control }
        name="roles"
        render={ ( { field } ) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Administrador</label>
            <UI.Switch
              color="success"
              isSelected={ field.value.includes( "admin" ) }
              onValueChange={ ( isSelected ) => {
                field.onChange( isSelected ? [ "user", "admin" ] : [ "user" ] );
              } }
            />
          </div>
        ) }
      />

      <Controller
        control={ form.control }
        name="slug"
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            errorMessage={ form.formState.errors.slug?.message }
            isInvalid={ Boolean( form.formState.errors.slug ) }
            label="Slug"
            labelPlacement="outside"
            placeholder="Ingresa el slug"
            onValueChange={ field.onChange }
          />
        ) }
      />
    </UI.Form>
  );
};