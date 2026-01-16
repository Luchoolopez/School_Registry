import { z } from 'zod';

export const createAbsenceSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha inválido (debe ser YYYY-MM-DD)",
    }),
    justified: z.boolean().optional().default(false), // Si no lo manda, asume falta injustificada
  }),
  params: z.object({
    studentId: z.coerce.number().int().positive(),
  })
});

export const updateAbsenceSchema = z.object({
  body: z.object({
    justified: z.boolean(), // Solo permitimos cambiar si es justificada o no
  }),
  params: z.object({
    id: z.coerce.number().int().positive(), // ID de la ausencia
  })
});

export type CreateAbsenceInput = z.infer<typeof createAbsenceSchema>['body'];
export type UpdateAbsenceInput = z.infer<typeof updateAbsenceSchema>['body'];