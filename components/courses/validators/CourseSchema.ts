import { z } from "zod";

const titleValidation = z.string().min(1, {
  message: "El título es obligatorio.",
});

const slugValidation = z.string().min(1, {
  message: "El slug es obligatorio.",
});

const descriptionValidation = z.string().min(1, {
  message: "La descripción es obligatoria.",
});

const priceValidation = z.number({
  invalid_type_error: "El precio debe ser un número válido.",
});

const isPublicValidation = z.boolean({
  invalid_type_error: "El valor público debe ser verdadero o falso.",
});

const courseUnderConstructionValidation = z.boolean({
  invalid_type_error: "El valor de curso en construcción debe ser verdadero o falso.",
});

const categoryIdsValidation = z
  .array(
    z.string().uuid({
      message: "Cada categoría debe ser un UUID válido.",
    }),
  )
  .min(1, {
    message: "Debe haber al menos una categoría.",
  });

export const courseSchema = z.object({
  categoryIds:             categoryIdsValidation,
  description:             descriptionValidation,
  isPublic:                isPublicValidation,
  price:                   priceValidation,
  slug:                    slugValidation,
  title:                   titleValidation,
  courseUnderConstruction: courseUnderConstructionValidation,
});

export interface CourseInputs extends z.infer<typeof courseSchema> {}
