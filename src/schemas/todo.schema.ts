import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required'),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({
    title: z.string().trim().min(1).optional(),
    completed: z.boolean().optional(),
  }),
});

// Types
export type CreateTodoInput = z.infer<typeof createTodoSchema>['body'];
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
