'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UI } from '@/components';

import { useAddCategory } from '../hooks/useAddCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import { getCategoryById } from '../services/actions';
import { CategoryInputs, categorySchema } from '../validators/categorySchema';

interface Props {
  id?: string;
  onClose: () => void;
}

export const CategoryForm = ( { id, onClose }: Props ) => {
  const { addNewCategory } = useAddCategory();
  const { categoryUpdate } = useUpdateCategory();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm<CategoryInputs>( {
    mode: 'onSubmit',
    resolver: zodResolver( categorySchema ),
    defaultValues: { title: '' }
  } );

  useEffect( () => {
    if ( id ) {
      getCategoryById( id ).then( ( data ) => {
        setValue( 'title', data.title );
      } );
    } else {
      reset();
    }
  }, [ id, setValue, reset ] );

  const onSubmit = async ( data: CategoryInputs ) => {
    if ( id ) {
      await categoryUpdate( data, id );
    } else {
      await addNewCategory( data );
    }
    onClose();
  };

  return (
    <UI.Form id="category-form" onSubmit={ handleSubmit( onSubmit ) }>
      <Controller
        name="title"
        control={ control }
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            label="Título"
            labelPlacement="outside"
            placeholder="Ingresa un título"
            isInvalid={ !!errors.title }
            errorMessage={ errors.title?.message }
          />
        ) }
      />
    </UI.Form>
  );
};
