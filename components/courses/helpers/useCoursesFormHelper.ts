'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useAddCourse, useGetCourse, useUpdateCourse } from '../hooks';
import { CourseInputs } from '@/components';

export const useCoursesFormHelper = ( id: string | undefined, form: UseFormReturn<CourseInputs> ) => {
  const { addNewCourse } = useAddCourse();
  const { courseUpdate } = useUpdateCourse();
  const { course, isLoading } = useGetCourse( id || '' );

  useEffect( () => {
    if ( id && course && !isLoading ) {
      form.reset( {
        title: course.title,
        slug: course.slug,
        description: course.description,
        price: course.price,
        isPublic: course.isPublic,
        categoryIds: course.categories.map( ( c ) => c.id ),
      } );
    }

    if ( !id ) {
      form.reset( {
        title: '',
        slug: '',
        description: '',
        price: 0,
        isPublic: false,
        categoryIds: []
      } );
    }
  }, [ id, course, isLoading, form ] );

  const handleSave = async ( data: CourseInputs, onClose: () => void ) => {
    await ( id ? courseUpdate( data, id ) : addNewCourse( data ) );
    onClose();
  };

  return {
    handleSave
  };
};
