import { z } from 'zod';

export const createGradeSchema = z.object({
  body: z.object({
    concept: z.string().min(1, "El concepto es obligatorio (Ej: Parcial 1)"),
    value: z.coerce.number().min(1).max(10),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha inválida (YYYY-MM-DD)",
    }),
  }),
  params: z.object({
    studentId: z.coerce.number().int().positive(),
  })
});

export const updateGradeSchema = z.object({
  body: z.object({
    concept: z.string().min(1).optional(),
    value: z.coerce.number().min(1).max(10).optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val))).optional(),
  }),
  params: z.object({
    id: z.coerce.number().int().positive(),
  })
});

export type CreateGradeInput = z.infer<typeof createGradeSchema>['body'];
export type UpdateGradeInput = z.infer<typeof updateGradeSchema>['body'];