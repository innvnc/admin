'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CategoryInputs, categorySchema, UI } from '@/components';
import { useCategoriesFormHelper } from '../helpers';


interface Props {
  id?:     string;
  onClose: () => void;
}

export const CategoryForm = ( { id, onClose }: Props ) => {

  const form = useForm<CategoryInputs>( {
    defaultValues: { title: '' },
    mode:          'onSubmit',
    resolver:      zodResolver( categorySchema )
  } );

  const { handleSave, validateUniqueTitle, existingTitles } = useCategoriesFormHelper( id, form );

  return (
    <UI.Form id="category-form" onSubmit={ form.handleSubmit( ( data ) => handleSave( data, onClose ) ) }>
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
