"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/react";

import { useCoursesFormHelper } from "../helpers";

import { CourseInputs, courseSchema, UI } from "@/components";
import { Icons } from "@/components/shared/ui";
import { useGetCategories } from "@/components/categories/hooks";

const dificultadOptions = [
  { value: "Básica", label: "Básica" },
  { value: "Intermedia", label: "Intermedia" },
  { value: "Avanzada", label: "Avanzada" },
];

interface Props {
  id?: string;
  onClose: () => void;
  setIsSubmitting?: ( loading: boolean ) => void;
}

export const CourseForm = ( { id, onClose, setIsSubmitting }: Props ) => {
  const form = useForm<CourseInputs>( {
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      price: 0,
      isPublic: false,
      categoryIds: [],
      courseUnderConstruction: true,
      estimatedDuration: "1hs",
      difficultyLevel: "Básica",
    },
    mode: "onSubmit",
    resolver: zodResolver( courseSchema ),
  } );

  const { handleSave } = useCoursesFormHelper( id, form );
  const { categories = [] } = useGetCategories();

  const availableCategoryIds = categories.map( ( category ) => category.id );

  const selectedCategoryIds = form
    .watch( "categoryIds" )
    .filter( ( id ) => availableCategoryIds.includes( id ) );

  const onSubmit = async ( data: CourseInputs ) => {
    setIsSubmitting?.( true );

    try {
      const validData = {
        ...data,
        categoryIds: data.categoryIds.filter( ( id ) =>
          availableCategoryIds.includes( id ),
        ),
      };

      await handleSave( validData, onClose );

      addToast( {
        title: "Éxito",
        description: id
          ? `El curso "${ data.title }" se ha actualizado correctamente.`
          : `El curso "${ data.title }" se ha creado correctamente.`,
        color: "success",
      } );
    } catch ( error ) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      console.error( `Error al guardar el curso "${ data.title }":`, errorMessage );

      addToast( {
        title: "Error",
        description: `No se pudo ${ id ? "actualizar" : "crear" } el curso. Verifique su conexión al servidor.`,
        color: "danger",
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
            errorMessage={ form.formState.errors.price?.message }
            isInvalid={ Boolean( form.formState.errors.price ) }
            label="Precio"
            labelPlacement="outside"
            placeholder="Ingresa un precio"
            type="number"
            value={ value?.toString() || "" }
            onValueChange={ ( val ) => onChange( Number( val ) ) }
          />
        ) }
      />

      <Controller
        control={ form.control }
        name="categoryIds"
        render={ ( { field: { onChange } } ) => (
          <UI.Select
            errorMessage={ form.formState.errors.categoryIds?.message }
            isInvalid={ Boolean( form.formState.errors.categoryIds ) }
            items={ categories }
            label="Categorías"
            labelPlacement="outside"
            placeholder="Selecciona una o más categorías"
            selectedKeys={ new Set( selectedCategoryIds ) }
            selectionMode="multiple"
            onSelectionChange={ ( selected ) =>
              onChange( Array.from( selected as Set<string> ) )
            }
          >
            { ( category ) => (
              <UI.SelectItem key={ category.id }>{ category.title }</UI.SelectItem>
            ) }
          </UI.Select>
        ) }
      />

      <Controller
        control={ form.control }
        name="estimatedDuration"
        render={ ( { field } ) => (
          <UI.Input
            { ...field }
            errorMessage={ form.formState.errors.estimatedDuration?.message }
            isInvalid={ Boolean( form.formState.errors.estimatedDuration ) }
            label="Duración estimada"
            labelPlacement="outside"
            placeholder="Ej: 1hs, 2hs, 45min"
          />
        ) }
      />

      <Controller
        control={ form.control }
        name="difficultyLevel"
        render={ ( { field } ) => (
          <UI.Select
            errorMessage={ form.formState.errors.difficultyLevel?.message }
            isInvalid={ Boolean( form.formState.errors.difficultyLevel ) }
            items={ dificultadOptions }
            label="Nivel de dificultad"
            labelPlacement="outside"
            placeholder="Selecciona el nivel"
            selectedKeys={ new Set( [ field.value ] ) }
            selectionMode="single"
            onSelectionChange={ ( selected ) =>
              field.onChange( Array.from( selected )[ 0 ] )
            }
          >
            { ( option ) => (
              <UI.SelectItem key={ option.value }>{ option.label }</UI.SelectItem>
            ) }
          </UI.Select>
        ) }
      />

      <div className="flex flex-col gap-2 mt-2">
        <Controller
          control={ form.control }
          name="isPublic"
          render={ ( { field: { value, onChange } } ) => (
            <UI.Switch
              color={ value ? "success" : "danger" }
              isSelected={ value }
              size="lg"
              thumbIcon={ ( { isSelected, className } ) =>
                isSelected ? (
                  <Icons.IoEyeOutline className={ className } />
                ) : (
                  <Icons.IoEyeOffOutline className={ className } />
                )
              }
              onValueChange={ ( checked ) => onChange( checked ) }
            >
              { value ? (
                <span className="flex items-center gap-1">
                  <Icons.IoEyeOutline className="text-success-500" />
                  Curso público
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Icons.IoEyeOffOutline className="text-danger-500" />
                  Curso privado
                </span>
              ) }
            </UI.Switch>
          ) }
        />

        <Controller
          control={ form.control }
          name="courseUnderConstruction"
          render={ ( { field: { value, onChange } } ) => (
            <UI.Switch
              color={ value ? "warning" : "success" }
              isSelected={ !value }
              size="lg"
              thumbIcon={ ( { isSelected, className } ) =>
                isSelected ? (
                  <Icons.IoCheckmarkCircleOutline className={ className } />
                ) : (
                  <Icons.IoConstructOutline className={ className } />
                )
              }
              onValueChange={ ( checked ) => onChange( !checked ) }
            >
              { value ? (
                <span className="flex items-center gap-1">
                  <Icons.IoConstructOutline className="text-warning-500" />
                  Curso en construcción
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Icons.IoCheckmarkCircleOutline className="text-success-500" />
                  Curso activo
                </span>
              ) }
            </UI.Switch>
          ) }
        />
      </div>
    </UI.Form>
  );
};
