'use client';

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";


import { ClassContentInputs } from "../validators";
import { useAddClassContent, useUpdateClassContent, useGetClassContentById } from '../hooks';

export const useClassContentFormHelper = (
  id: string | undefined,
  form: UseFormReturn<ClassContentInputs>,
) => {
  const { addNewClassContent } = useAddClassContent();
  const { updateClassContentById } = useUpdateClassContent();
  const { classContent, isLoading } = useGetClassContentById( id || "" );

  useEffect( () => {
    if ( id && classContent && !isLoading ) {
      form.reset( {
        content: classContent.content,
        contentType: classContent.contentType as "slides" | "video" | "text",
        courseClassId: classContent.courseClass.id,
      } );
    }

    if ( !id ) {
      form.reset( {
        content: "",
        contentType: "video",
        courseClassId: form.getValues( "courseClassId" ),
      } );
    }
  }, [ classContent, isLoading, form, id ] );

  const handleSave = async ( data: ClassContentInputs, onClose: () => void ) => {
    if ( id ) {
      await updateClassContentById( id, data );
    } else {
      await addNewClassContent( data );
    }
    onClose();
  };

  return {
    handleSave,
  };
};