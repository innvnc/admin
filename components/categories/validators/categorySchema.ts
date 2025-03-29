import { z } from 'zod';


const titleValidation = z.string().min(1, {
  message: "El título es obligatorio."
});

export const categorySchema = z.object({
  title: titleValidation,
});

export interface CategoryInputs extends z.infer<typeof categorySchema> { }
