'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addToast } from '@heroui/react';

import { CategoryInputs, categorySchema, UI } from '@/components';
import { useCategoriesFormHelper } from '../helpers';


interface Props {
  id?:     string;
  onClose: () => void;
}

export const CategoryForm = ( { id, onClose }: Props ) => {
  const form = useForm<CategoryInputs>( {
    defaultValues: { title: '' },
    mode: 'onSubmit',
    resolver: zodResolver( categorySchema ),
  } );

  const { handleSave, validateUniqueTitle, existingTitles } = useCategoriesFormHelper( id, form );

  const onSubmit = async ( data: CategoryInputs ) => {
    try {
      await handleSave( data, onClose );
      addToast( {
        title: 'Éxito',
        description: id ? 'La categoría se ha actualizado correctamente.' : 'La categoría se ha creado correctamente.',
        color: 'success',
      } );
    } catch ( error ) {
      addToast( {
        title: 'Error',
        description: 'Hubo un problema al guardar la categoría.',
        color: 'danger',
      } );
    }
  };

  return (
    <UI.Form id="category-form" onSubmit={ form.handleSubmit( onSubmit ) }>
      <Controller
        control={ form.control }
        name="title"
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            errorMessage={
              form.formState.errors.title?.message ||
              ( existingTitles.includes( field.value.toLowerCase() )
                ? 'Esta categoría ya existe.'
                : undefined )
            }
            isInvalid={
              Boolean( form.formState.errors.title ) ||
              existingTitles.includes( field.value.toLowerCase() )
            }
            label="Título"
            labelPlacement="outside"
            placeholder="Ingresa un título"
            onValueChange={ ( value ) => {
              field.onChange( value );
              validateUniqueTitle( value );
            } }
          />
        ) }
      />
    </UI.Form>
  );
};