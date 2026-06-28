import { z } from 'zod';

const userRoleEnum = z.enum(['SUPER_ADMIN', 'ADMIN', 'USER']);
const userStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']);

const userBodySchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(1, 'Full name is required'),
  role: userRoleEnum.optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  phone: z.string().optional(),
  status: userStatusEnum.optional(),
  createdById: z.string().optional(),
});

const createUserSchema = z.object({
  body: userBodySchema,
});

const updateUserSchema = z.object({
  body: userBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const listUserSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const userIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User id is required'),
  }),
});

export const UserValidation = {
  createUserSchema,
  updateUserSchema,
  listUserSchema,
  userIdParamsSchema,
};
