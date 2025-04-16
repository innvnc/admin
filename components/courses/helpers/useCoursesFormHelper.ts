'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useAddCourse, useGetCourse, useUpdateCourse } from '../hooks';
import { CourseInputs } from '@/components';

export const useCoursesFormHelper = ( id: string | undefined, form: UseFormReturn<CourseInputs> ) => {
  const { addNewCourse } = useAddCourse();
  const { updateCourse } = useUpdateCourse();
  const { course, isLoading } = useGetCourse( id || '' );

  useEffect( () => {
    if ( course && !isLoading ) {
      form.reset( {
        title: course.title,
        slug: course.slug,
        description: course.description,
        price: course.price,
        isPublic: course.isPublic,
        categoryIds: course.categories?.map( ( c: { id: string; } ) => c.id ) ?? [],
      } );
    }

    if ( !id ) {
      form.reset( {
        title: '',
        slug: '',
        description: '',
        price: 0,
        isPublic: false,
        categoryIds: [],
      } );
    }
  }, [ course, isLoading, form, id ] );

  const handleSave = async ( data: CourseInputs, onClose: () => void ) => {
    if ( id ) {
      await updateCourse( id, data );
    } else {
      await addNewCourse( data );
    }
    onClose();
  };

  return {
    handleSave,
  };
};
