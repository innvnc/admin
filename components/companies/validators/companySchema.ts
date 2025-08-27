import { z } from "zod";

const addressValidation = z.string().min(1, {
  message: "La dirección es obligatoria.",
});

const descriptionValidation = z.string().min(1, {
  message: "La descripción es obligatoria.",
});

const emailValidation = z.string().email({
  message: "El correo electrónico no es válido.",
});

const nameValidation = z.string().min(1, {
  message: "El nombre es obligatorio.",
});

const phoneValidation = z.string().min(1, {
  message: "El teléfono es obligatorio.",
});

export const companySchema = z.object({
  address:     addressValidation,
  description: descriptionValidation,
  email:       emailValidation,
  name:        nameValidation,
  phone:       phoneValidation,
});

export interface CompanyInputs extends z.infer<typeof companySchema> {}
