import { z } from 'zod';

const testimonialBodySchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  country: z.string().optional(),
  program: z.string().optional(),
  university: z.string().optional(),
  review: z.string().min(1, 'Review is required'),
  photoUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  createdById: z.string().optional(),
});

const createTestimonialSchema = z.object({
  body: testimonialBodySchema,
});

const updateTestimonialSchema = z.object({
  body: testimonialBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateTestimonialSchema = z.object({
  body: z.array(testimonialBodySchema),
});

const bulkUpdateTestimonialSchema = z.object({
  body: z.array(
    testimonialBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'Testimonial id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyTestimonialSchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: testimonialBodySchema.partial(),
  }),
});

const listTestimonialSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const testimonialIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Testimonial id is required'),
  }),
});

const deleteManyTestimonialSchema = z.object({
  body: z.object({
    studentName: z.string().optional(),
    country: z.string().optional(),
    university: z.string().optional(),
  }),
});

export const TestimonialValidation = {
  createTestimonialSchema,
  updateTestimonialSchema,
  bulkCreateTestimonialSchema,
  bulkUpdateTestimonialSchema,
  updateManyTestimonialSchema,
  listTestimonialSchema,
  testimonialIdParamsSchema,
  deleteManyTestimonialSchema,
};
