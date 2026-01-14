import { z } from 'zod';

export const createSchoolSchema = z.object({
  body: z.object({
    name: z.string().min(1, "El nombre de la escuela es obligatorio"),
    academic_year: z.number().int().min(2000).max(2100), //valida que el anio sea coherente 
  }),
});

export const updateSchoolSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    academic_year: z.number().int().min(2000).max(2100).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "El ID debe ser un número"), // Validamos que el ID de la URL sea numérico
  }),
});