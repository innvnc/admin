import { z } from 'zod';

const titleValidation = z.string().min( 1, {
  message: 'El título es obligatorio.'
} );

const visibleValidation = z.boolean();

export const categorySchema = z.object( {
  title:   titleValidation,
  visible: visibleValidation
} );

export interface CategoryInputs extends z.infer<typeof categorySchema> { }
