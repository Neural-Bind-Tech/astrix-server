import { z } from 'zod';

const eventBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.coerce.date(),
  time: z.string().optional(),
  location: z.string().optional(),
  isOnline: z.boolean().optional(),
  imageUrl: z.string().optional(),
  registrationLink: z.string().optional(),
  isPast: z.boolean().optional(),
  createdById: z.string().optional(),
});

const createEventSchema = z.object({
  body: eventBodySchema,
});

const updateEventSchema = z.object({
  body: eventBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateEventSchema = z.object({
  body: z.array(eventBodySchema),
});

const bulkUpdateEventSchema = z.object({
  body: z.array(
    eventBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'Event id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyEventSchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: eventBodySchema.partial(),
  }),
});

const listEventSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const eventIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Event id is required'),
  }),
});

const deleteManyEventSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    date: z.coerce.date().optional(),
    location: z.string().optional(),
  }),
});

export const EventValidation = {
  createEventSchema,
  updateEventSchema,
  bulkCreateEventSchema,
  bulkUpdateEventSchema,
  updateManyEventSchema,
  listEventSchema,
  eventIdParamsSchema,
  deleteManyEventSchema,
};
