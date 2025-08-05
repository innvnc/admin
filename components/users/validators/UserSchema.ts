import { z } from "zod";

const nameValidation = z.string({
    required_error: "El nombre es obligatorio.",
    invalid_type_error: "El nombre debe ser texto.",
  }).min(1, {
  message: "El nombre no puede estar vacío.",
});

const lastNameValidation = z.string({
    required_error: "El apellido es obligatorio.",
    invalid_type_error: "El apellido debe ser texto.",
  }).min(1, {
  message: "El apellido no puede estar vacío.",
});

const rolesValidation = z
  .array(
    z.enum(["user", "admin"], {
      errorMap: () => ({ message: "El rol seleccionado no es válido." })
    }),
    {
      required_error: "Se debe especificar al menos un rol.",
      invalid_type_error: "Los roles deben ser un arreglo de strings.",
    }
  )
  .min(1, {
    message: "Debe haber al menos un rol.",
  });

const slugValidation = z.string({
    required_error: "El slug es obligatorio.",
  }).min(1, {
    message: "El slug es obligatorio.",
  })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "El slug solo puede contener letras minúsculas, números y guiones.",
  });

export const userSchema = z.object({
  name:     nameValidation,
  lastName: lastNameValidation,
  roles:    rolesValidation,
  slug:     slugValidation,
});

export interface UserInputs extends z.infer<typeof userSchema> {}