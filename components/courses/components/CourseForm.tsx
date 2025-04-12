'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addToast } from '@heroui/react';

import { CourseInputs, courseSchema, UI } from '@/components';
import { Icons } from '@/components/shared/ui';
import { useGetCategories } from '@/components/categories/hooks';
import { useCoursesFormHelper } from '../helpers';

interface Props {
  id?: string;
  onClose: () => void;
  setIsSubmitting?: ( loading: boolean ) => void;
}

export const CourseForm = ( { id, onClose, setIsSubmitting }: Props ) => {
  const form = useForm<CourseInputs>( {
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: 0,
      isPublic: false,
      categoryIds: []
    },
    mode: 'onSubmit',
    resolver: zodResolver( courseSchema ),
  } );

  const { handleSave } = useCoursesFormHelper( id, form );
  const { categories = [] } = useGetCategories();

  const onSubmit = async ( data: CourseInputs ) => {
    setIsSubmitting?.( true );

    try {
      await handleSave( data, onClose );

      addToast( {
        title: 'Éxito',
        description: id
          ? `El curso "${ data.title }" se ha actualizado correctamente.`
          : `El curso "${ data.title }" se ha creado correctamente.`,
        color: 'success',
      } );
    } catch ( error ) {
      addToast( {
        title: 'Error',
        description: `Hubo un problema al guardar el curso "${ data.title }".`,
        color: 'danger',
      } );
    } finally {
      setIsSubmitting?.( false );
    }
  };

  return (
    <UI.Form id="course-form" onSubmit={ form.handleSubmit( onSubmit ) }>
      <Controller
        control={ form.control }
        name="title"
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            errorMessage={ form.formState.errors.title?.message }
            isInvalid={ Boolean( form.formState.errors.title ) }
            label="Título"
            labelPlacement="outside"
            placeholder="Ingresa un título"
          />
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
            placeholder="Ingresa un slug"
          />
        ) }
      />

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
          />
        ) }
      />

      <Controller
        control={ form.control }
        name="price"
        render={ ( { field: { value, onChange, ...rest } } ) => (
          <UI.Input
            { ...rest }
            value={ value?.toString() || '' }
            type="number"
            errorMessage={ form.formState.errors.price?.message }
            isInvalid={ Boolean( form.formState.errors.price ) }
            label="Precio"
            labelPlacement="outside"
            placeholder="Ingresa un precio"
            onValueChange={ ( val ) => onChange( Number( val ) ) }
          />
        ) }
      />

      <Controller
        control={ form.control }
        name="categoryIds"
        render={ ( { field: { value, onChange } } ) => (
          <UI.Select
            items={ categories }
            label="Categorías"
            labelPlacement="outside"
            placeholder="Selecciona una o más categorías"
            selectionMode="multiple"
            selectedKeys={ new Set( value ) }
            onSelectionChange={ ( selected ) =>
              onChange( Array.from( selected as Set<string> ) )
            }
            isInvalid={ Boolean( form.formState.errors.categoryIds ) }
            errorMessage={ form.formState.errors.categoryIds?.message }
          >
            { ( category ) => (
              <UI.SelectItem key={ category.id }>
                { category.title }
              </UI.SelectItem>
            ) }
          </UI.Select>
        ) }
      />

      { id && (
        <Controller
          control={ form.control }
          name="isPublic"
          render={ ( { field: { value, onChange } } ) => (
            <UI.Switch
              isSelected={ value }
              onValueChange={ ( checked ) => onChange( checked ) }
              color={ value ? 'success' : 'danger' }
              size="lg"
              thumbIcon={ ( { isSelected, className } ) =>
                isSelected ? (
                  <Icons.IoEyeOutline className={ className } />
                ) : (
                  <Icons.IoEyeOffOutline className={ className } />
                )
              }
            >
              { value ? 'Curso público' : 'Curso privado' }
            </UI.Switch>
          ) }
        />
      ) }
    </UI.Form>
  );
};
