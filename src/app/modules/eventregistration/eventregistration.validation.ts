import { z } from 'zod';

const eventRegistrationBodySchema = z.object({
  eventId: z.string().min(1, 'Event id is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  createdById: z.string().nullish(),
});

const createEventRegistrationSchema = z.object({
  body: eventRegistrationBodySchema,
});

const updateEventRegistrationSchema = z.object({
  body: eventRegistrationBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateEventRegistrationSchema = z.object({
  body: z.array(eventRegistrationBodySchema),
});

const bulkUpdateEventRegistrationSchema = z.object({
  body: z.array(
    eventRegistrationBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'EventRegistration id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyEventRegistrationSchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: eventRegistrationBodySchema.partial(),
  }),
});

const listEventRegistrationSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const eventRegistrationIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'EventRegistration id is required'),
  }),
});

const deleteManyEventRegistrationSchema = z.object({
  body: z.object({
    eventId: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const EventRegistrationValidation = {
  createEventRegistrationSchema,
  updateEventRegistrationSchema,
  bulkCreateEventRegistrationSchema,
  bulkUpdateEventRegistrationSchema,
  updateManyEventRegistrationSchema,
  listEventRegistrationSchema,
  eventRegistrationIdParamsSchema,
  deleteManyEventRegistrationSchema,
};
