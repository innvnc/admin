'use client';

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { addToast } from '@heroui/react';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useAddClass, useGetClass, useGetClasses, useUpdateClass } from '../hooks';
import { ClassInputs } from '../validators';


interface Props {
  id?: string;
  sectionId: string;
  onClose: () => void;
  isSubmitting: boolean;
  setIsSubmitting: ( value: boolean ) => void;
}

export const ClassForm = memo( ( { id, sectionId, onClose, isSubmitting, setIsSubmitting }: Props ) => {
  const { addClass } = useAddClass();
  const { updateCourseClass } = useUpdateClass();
  const { courseClass } = useGetClass( id || '' );
  const { courseClasses = [] } = useGetClasses( sectionId );

  const [ title, setTitle ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ slug, setSlug ] = useState( '' );
  const [ isSlugDuplicate, setIsSlugDuplicate ] = useState( false );
  const [ errors, setErrors ] = useState<{
    title?: string;
    description?: string;
    slug?: string;
  }>( {} );

  // Referencia para almacenar el timeout de debounce
  const timeoutRef = useRef<NodeJS.Timeout | null>( null );

  useEffect( () => {
    if ( id && courseClass ) {
      setTitle( courseClass.title || '' );
      setDescription( courseClass.description || '' );
      setSlug( courseClass.slug || '' );
    }
  }, [ courseClass, id ] );

  const checkSlugDuplicate = useCallback( ( slug: string ) => {
    if ( !slug ) return false;

    const normalizedSlug = slug.toLowerCase();
    return courseClasses
      .filter( cls => cls.id !== id )
      .some( cls => cls.slug.toLowerCase() === normalizedSlug );
  }, [ courseClasses, id ] );

  const generateSlug = useCallback( ( value: string ) => {
    return value
      .toLowerCase()
      .normalize( 'NFD' )
      .replace( /[\u0300-\u036f]/g, '' )
      .replace( /[^a-z0-9\s]/g, '' )
      .replace( /\s+/g, '-' );
  }, [] );

  // Función personalizada de debounce
  const debouncedUpdateSlug = useCallback( ( value: string ) => {
    // Limpiamos el timeout previo si existe
    if ( timeoutRef.current ) {
      clearTimeout( timeoutRef.current );
    }

    // Creamos un nuevo timeout
    timeoutRef.current = setTimeout( () => {
      if ( !id ) {
        const newSlug = generateSlug( value );
        setSlug( newSlug );
        const isDuplicate = checkSlugDuplicate( newSlug );
        setIsSlugDuplicate( isDuplicate );
      }
    }, 300 );
  }, [ id, generateSlug, checkSlugDuplicate ] );

  // Limpiamos el timeout si el componente se desmonta
  useEffect( () => {
    return () => {
      if ( timeoutRef.current ) {
        clearTimeout( timeoutRef.current );
      }
    };
  }, [] );

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();

    if ( isSubmitting ) return;

    const newErrors: {
      title?: string;
      description?: string;
      slug?: string;
    } = {};

    if ( !title ) newErrors.title = "El título es obligatorio";
    if ( !description ) newErrors.description = "La descripción es obligatoria";

    if ( Object.keys( newErrors ).length > 0 ) {
      setErrors( newErrors );
      return;
    }

    if ( isSlugDuplicate ) {
      addToast( {
        title: 'Error',
        description: `El slug "${ slug }" ya existe. Por favor, utiliza un slug diferente.`,
        color: 'danger',
      } );
      return;
    }

    setIsSubmitting( true );

    try {
      const data: ClassInputs = {
        title,
        description,
        courseSectionId: sectionId
      };

      if ( id ) {
        await updateCourseClass( id, data );
      } else {
        await addClass( data );
      }

      addToast( {
        title: 'Éxito',
        description: id
          ? `La clase "${ title }" se ha actualizado correctamente.`
          : `La clase "${ title }" se ha creado correctamente.`,
        color: 'success',
      } );

      onClose();
    } catch ( error ) {
      addToast( {
        title: 'Error',
        description: `Hubo un problema al guardar la clase.`,
        color: 'danger',
      } );
      setIsSubmitting( false );
    }
  };

  const handleTitleChange = ( value: string ) => {
    setTitle( value );
    setErrors( { ...errors, title: undefined } );
    debouncedUpdateSlug( value );
  };

  const handleDescriptionChange = ( value: string ) => {
    setDescription( value );
    setErrors( { ...errors, description: undefined } );
  };

  const handleSlugChange = ( value: string ) => {
    setSlug( value );
    setErrors( { ...errors, slug: undefined } );
    const isDuplicate = checkSlugDuplicate( value );
    setIsSlugDuplicate( isDuplicate );
  };

  return (
    <form id="class-form" onSubmit={ handleSubmit } className="w-full">
      <div className="space-y-8 w-full">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <UI.Input
            value={ title }
            errorMessage={ errors.title }
            isInvalid={ !!errors.title }
            placeholder="Ingresa un título"
            onValueChange={ handleTitleChange }
            classNames={ {
              base: "w-full",
              inputWrapper: "w-full"
            } }
            fullWidth
            isDisabled={ isSubmitting }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <UI.Textarea
            value={ description }
            errorMessage={ errors.description }
            isInvalid={ !!errors.description }
            placeholder="Ingresa una descripción"
            onValueChange={ handleDescriptionChange }
            classNames={ {
              base: "w-full",
              inputWrapper: "w-full"
            } }
            minRows={ 3 }
            fullWidth
            isDisabled={ isSubmitting }
          />
        </div>

        { !id && (
          <div>
            <label className="block text-sm font-medium mb-2">Slug (generado automáticamente)</label>
            <UI.Input
              value={ slug }
              errorMessage={ isSlugDuplicate
                ? "Este slug ya existe para otra clase en esta sección"
                : errors.slug }
              isInvalid={ isSlugDuplicate || !!errors.slug }
              placeholder="slug-de-la-clase"
              startContent={ <Icons.IoLinkOutline className="text-default-400" size={ 16 } /> }
              onValueChange={ handleSlugChange }
              classNames={ {
                base: "w-full",
                inputWrapper: "w-full"
              } }
              fullWidth
              color={ isSlugDuplicate ? "danger" : undefined }
              isDisabled={ isSubmitting }
              isReadOnly={ true }
            />
          </div>
        ) }
      </div>
    </form>
  );
} );

ClassForm.displayName = 'ClassForm';