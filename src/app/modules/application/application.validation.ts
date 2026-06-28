import { z } from 'zod';

const countryOfInterestSchema = z.union([
  z.enum([
    'USA',
    'China',
    'Malaysia',
    'South Korea',
    'UK',
    'Canada',
    'Australia',
    'Other',
  ]),
  z.enum([
    'USA',
    'CHINA',
    'MALAYSIA',
    'SOUTH_KOREA',
    'UK',
    'CANADA',
    'AUSTRALIA',
    'OTHER',
  ]),
]);

const budgetRangeSchema = z.union([
  z.enum([
    'Under $10,000',
    '$10,000 - $20,000',
    '$20,000 - $40,000',
    '$40,000+',
  ]),
  z.enum([
    'UNDER_10000',
    'BETWEEN_10000_20000',
    'BETWEEN_20000_40000',
    'ABOVE_40000',
  ]),
]);

const preferredIntakeSchema = z.union([
  z.enum(['Spring 2025', 'Fall 2025', 'Spring 2026', 'Fall 2026']),
  z.enum(['SPRING_2025', 'FALL_2025', 'SPRING_2026', 'FALL_2026']),
]);

const statusSchema = z.union([
  z.enum(['new', 'contacted', 'in_progress', 'completed']),
  z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED']),
]);

const applicationBodySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(6, 'Phone number is required'),
  countryOfInterest: countryOfInterestSchema,
  programPreference: z.string().optional(),
  academicBackground: z.string().optional(),
  budgetRange: budgetRangeSchema.optional(),
  preferredIntake: preferredIntakeSchema.optional(),
  message: z.string().optional(),
  documentsUrl: z.string().nullish(),
  status: statusSchema.optional(),
  createdById: z.string().nullish(),
});

const createApplicationSchema = z.object({
  body: applicationBodySchema,
});

const updateApplicationSchema = z.object({
  body: applicationBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateApplicationSchema = z.object({
  body: z.array(applicationBodySchema),
});

const bulkUpdateApplicationSchema = z.object({
  body: z.array(
    applicationBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'Application id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyApplicationSchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: applicationBodySchema.partial(),
  }),
});

const listApplicationSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const applicationIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Application id is required'),
  }),
});

const deleteManyApplicationSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
});

export const ApplicationValidation = {
  createApplicationSchema,
  updateApplicationSchema,
  bulkCreateApplicationSchema,
  bulkUpdateApplicationSchema,
  updateManyApplicationSchema,
  listApplicationSchema,
  applicationIdParamsSchema,
  deleteManyApplicationSchema,
};
