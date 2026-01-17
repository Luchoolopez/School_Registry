import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, "El nombre de usuario es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
    dni: z.string().min(7, "El DNI debe ser válido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: z.enum(['admin', 'docente']).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).optional(),
    dni: z.string().min(7).optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['admin', 'docente']).optional(),
    active: z.boolean().optional(),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];